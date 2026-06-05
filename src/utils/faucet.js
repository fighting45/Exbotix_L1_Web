import { ethers } from 'ethers';

const TESTNET_RPC = 'https://testnet_rpc.exbotix.net';
const FAUCET_PRIVATE_KEY = import.meta.env.VITE_FAUCET_PRIVATE_KEY;

/**
 * Send testnet EXBT tokens to a recipient address
 * @param {string} recipientAddress - The address to send tokens to
 * @param {number} amount - Amount of tokens to send (5, 10, 15, or 20)
 * @param {function} onStatusChange - Callback for status updates
 * @returns {Promise<{success: boolean, txHash?: string, error?: string}>}
 */
export async function sendTestnetTokens(recipientAddress, amount, onStatusChange) {
  try {
    // Validate recipient address
    if (!ethers.isAddress(recipientAddress)) {
      throw new Error('Invalid Ethereum address');
    }

    // Check if private key is configured
    if (!FAUCET_PRIVATE_KEY || FAUCET_PRIVATE_KEY === 'your_testnet_private_key_here') {
      throw new Error('Faucet private key not configured. Please add VITE_FAUCET_PRIVATE_KEY to your .env file.');
    }

    onStatusChange('pending', 'Connecting to testnet...');

    // Connect to testnet
    const provider = new ethers.JsonRpcProvider(TESTNET_RPC);
    const wallet = new ethers.Wallet(FAUCET_PRIVATE_KEY, provider);

    onStatusChange('pending', 'Preparing transaction...');

    // Convert amount to wei (18 decimals)
    const amountWei = ethers.parseEther(amount.toString());

    // Get current gas price
    const feeData = await provider.getFeeData();

    // Create transaction
    const tx = {
      to: recipientAddress,
      value: amountWei,
      gasLimit: 21000,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
    };

    onStatusChange('pending', 'Sending transaction...');

    // Send transaction
    const txResponse = await wallet.sendTransaction(tx);

    onStatusChange('confirming', `Transaction sent! Hash: ${txResponse.hash.substring(0, 10)}...`);

    // Wait for confirmation
    const receipt = await txResponse.wait();

    if (receipt.status === 1) {
      onStatusChange('success', `Successfully sent ${amount} EXBT!`);
      return {
        success: true,
        txHash: txResponse.hash
      };
    } else {
      throw new Error('Transaction failed');
    }

  } catch (error) {
    console.error('Faucet error:', error);
    onStatusChange('error', error.message || 'Failed to send tokens');
    return {
      success: false,
      error: error.message || 'Failed to send tokens'
    };
  }
}

/**
 * Check if an address has recently requested tokens (rate limiting)
 * @param {string} address - The address to check
 * @returns {boolean} - True if address can request tokens
 */
export function canRequestTokens(address) {
  const lastRequest = localStorage.getItem(`faucet_${address}`);
  if (!lastRequest) return true;

  const timeSinceLastRequest = Date.now() - parseInt(lastRequest);
  const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours

  return timeSinceLastRequest > cooldownPeriod;
}

/**
 * Record a token request for rate limiting
 * @param {string} address - The address that requested tokens
 */
export function recordTokenRequest(address) {
  localStorage.setItem(`faucet_${address}`, Date.now().toString());
}

/**
 * Get time remaining until next request is allowed
 * @param {string} address - The address to check
 * @returns {number} - Minutes remaining, or 0 if can request now
 */
export function getTimeUntilNextRequest(address) {
  const lastRequest = localStorage.getItem(`faucet_${address}`);
  if (!lastRequest) return 0;

  const timeSinceLastRequest = Date.now() - parseInt(lastRequest);
  const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours

  if (timeSinceLastRequest > cooldownPeriod) return 0;

  const timeRemaining = cooldownPeriod - timeSinceLastRequest;
  return Math.ceil(timeRemaining / (60 * 1000)); // Return minutes
}
