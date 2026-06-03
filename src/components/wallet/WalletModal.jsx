import { useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';

export default function WalletModal({ onClose }) {
  const { connect } = useWallet();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleConnect = async (walletType) => {
    await connect(walletType);
    onClose();
  };

  return (
    <div className="wallet-modal show">
      <div className="wallet-modal-overlay" onClick={onClose}></div>
      <div className="wallet-modal-content">
        <button className="wallet-modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <h3 className="wallet-modal-title">Connect a Wallet</h3>
        <p className="wallet-modal-desc">Choose how you want to connect to Exbotix</p>

        <div className="wallet-options">
          <button className="wallet-option" onClick={() => handleConnect('metamask')}>
            <span className="wallet-icon">🦊</span>
            <div className="wallet-info">
              <div className="wallet-name">MetaMask</div>
              <div className="wallet-status">Popular</div>
            </div>
          </button>

          <button className="wallet-option" onClick={() => handleConnect('coinbase')}>
            <span className="wallet-icon">🔵</span>
            <div className="wallet-info">
              <div className="wallet-name">Coinbase Wallet</div>
              <div className="wallet-status">Recommended</div>
            </div>
          </button>

          <button className="wallet-option" disabled>
            <span className="wallet-icon">🔗</span>
            <div className="wallet-info">
              <div className="wallet-name">WalletConnect</div>
              <div className="wallet-status">Coming soon</div>
            </div>
          </button>
        </div>

        <div className="wallet-modal-footer">
          <p className="text-dim">
            New to Ethereum wallets?{' '}
            <a href="https://metamask.io" target="_blank" rel="noopener" className="accent">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
