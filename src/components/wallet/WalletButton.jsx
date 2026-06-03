import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { shortAddress } from '../../utils/helpers';
import WalletModal from './WalletModal';

export default function WalletButton() {
  const { connected, address, connect, disconnect, detectWallets } = useWallet();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      const wallets = detectWallets();
      if (wallets.length === 0 || wallets.length > 1) {
        setShowModal(true);
      } else {
        // Direct connect if only one wallet detected
        connect(wallets[0].type);
      }
    }
  };

  return (
    <>
      <button
        className={`btn btn-primary btn-sm wallet-btn ${connected ? 'connected' : ''}`}
        onClick={handleClick}
        data-wallet
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="13" rx="3"/>
          <path d="M16 12h2"/>
          <path d="M3 9h13a2 2 0 0 1 2 2"/>
        </svg>
        <span>{connected ? shortAddress(address) : 'Connect Wallet'}</span>
      </button>

      {showModal && <WalletModal onClose={() => setShowModal(false)} />}
    </>
  );
}
