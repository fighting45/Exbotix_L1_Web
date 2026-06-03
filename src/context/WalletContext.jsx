import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { NETWORKS } from '../utils/constants';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [walletType, setWalletType] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const wasConnected = localStorage.getItem("exbt_wallet_connected");
    const lastWalletType = localStorage.getItem("exbt_wallet_type");

    if (wasConnected === "true" && lastWalletType && window.ethereum) {
      connect(lastWalletType, true);
    }

    // Setup event listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("disconnect", handleDisconnect);
    }

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("disconnect", handleDisconnect);
      }
    };
  }, []);

  const handleAccountsChanged = useCallback((accounts) => {
    if (!accounts || accounts.length === 0) {
      disconnect();
    } else if (accounts[0] !== address) {
      setAddress(accounts[0]);
      localStorage.setItem("exbt_addr", accounts[0]);
      showToast("Account changed", accounts[0].slice(0, 6) + "…" + accounts[0].slice(-4));
      window.dispatchEvent(new Event("wallet:change"));
    }
  }, [address]);

  const handleChainChanged = useCallback(() => {
    window.location.reload();
  }, []);

  const handleDisconnect = useCallback((error) => {
    console.log("Wallet disconnected:", error);
    disconnect();
  }, []);

  const detectWallets = useCallback(() => {
    const wallets = [];

    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum.isMetaMask) {
        wallets.push({ type: "metamask", name: "MetaMask", icon: "🦊" });
      }
      if (window.ethereum.isCoinbaseWallet) {
        wallets.push({ type: "coinbase", name: "Coinbase Wallet", icon: "🔵" });
      }
      if (!window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet) {
        wallets.push({ type: "ethereum", name: "Browser Wallet", icon: "🔌" });
      }
    }

    return wallets;
  }, []);

  const connect = useCallback(async (walletType = "metamask", silent = false) => {
    try {
      if (!window.ethereum) {
        if (!silent) {
          showToast("No wallet detected", "Please install MetaMask");
        }
        return null;
      }

      if (!window.ethers) {
        showToast("Loading wallet", "Please wait...");
        return null;
      }

      const newProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await newProvider.send("eth_requestAccounts", []);

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const newSigner = await newProvider.getSigner();
      const newAddress = accounts[0];

      const network = await newProvider.getNetwork();
      const newChainId = "0x" + network.chainId.toString(16);

      setProvider(newProvider);
      setSigner(newSigner);
      setAddress(newAddress);
      setChainId(newChainId);
      setWalletType(walletType);

      localStorage.setItem("exbt_wallet_connected", "true");
      localStorage.setItem("exbt_wallet_type", walletType);
      localStorage.setItem("exbt_addr", newAddress);

      if (!localStorage.getItem("exbt_bal")) {
        localStorage.setItem("exbt_bal", "1240.50");
      }

      if (!silent) {
        await switchToExbotixMainnet(newChainId, newProvider);
        showToast("Wallet connected", "Welcome to Exbotix — " + newAddress.slice(0, 6) + "…" + newAddress.slice(-4));
      }

      window.dispatchEvent(new Event("wallet:change"));

      return newAddress;
    } catch (error) {
      handleError("Connection failed", error);
      return null;
    }
  }, []);

  const disconnect = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setChainId(null);
    setWalletType(null);

    localStorage.removeItem("exbt_wallet_connected");
    localStorage.removeItem("exbt_wallet_type");
    localStorage.removeItem("exbt_addr");

    showToast("Wallet disconnected", "");
    window.dispatchEvent(new Event("wallet:change"));
  }, []);

  const switchToExbotixMainnet = useCallback(async (currentChainId, currentProvider) => {
    const mainnet = NETWORKS.mainnet;
    const activeChainId = currentChainId || chainId;
    const activeProvider = currentProvider || provider;

    if (activeChainId === mainnet.chainId) {
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: mainnet.chainId }],
      });

      showToast("Switched to Exbotix Mainnet", "You're now on Chain ID 11311");
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: mainnet.chainId,
              chainName: mainnet.chainName,
              nativeCurrency: mainnet.nativeCurrency,
              rpcUrls: mainnet.rpcUrls,
              blockExplorerUrls: mainnet.blockExplorerUrls,
            }],
          });

          showToast("Exbotix Mainnet added", "Network added to your wallet successfully");
        } catch (addError) {
          if (addError.code !== 4001) {
            showToast("Network not added", "You can add it manually from the docs page");
          }
        }
      } else if (switchError.code !== 4001) {
        showToast("Network switch failed", "");
      }
    }
  }, [chainId, provider]);

  const addNetwork = useCallback(async (networkKey) => {
    const network = NETWORKS[networkKey];
    if (!network) return;

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: network.chainId,
          chainName: network.chainName,
          nativeCurrency: network.nativeCurrency,
          rpcUrls: network.rpcUrls,
          blockExplorerUrls: network.blockExplorerUrls,
        }],
      });

      showToast("Network added", network.chainName + " is ready in your wallet");
    } catch (error) {
      if (error.code !== 4001) {
        showToast("Request failed", "");
      }
    }
  }, []);

  const handleError = useCallback((title, error) => {
    console.error(title, error);

    const errorMessages = {
      4001: "Request cancelled",
      "-32002": "Request already pending - check your wallet",
      "-32603": "Internal error - try again",
    };

    const message = errorMessages[error.code] || error.message || "An error occurred";
    showToast(title, message);
  }, []);

  const value = {
    provider,
    signer,
    address,
    chainId,
    walletType,
    connected: !!address,
    connect,
    disconnect,
    switchToExbotixMainnet,
    addNetwork,
    detectWallets,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};

// Toast helper function
function showToast(title, message) {
  const event = new CustomEvent('show-toast', { detail: { title, message } });
  window.dispatchEvent(event);
}
