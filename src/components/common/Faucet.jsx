import { useState } from 'react';
import { sendTestnetTokens, canRequestTokens, recordTokenRequest, getTimeUntilNextRequest } from '../../utils/faucet';

export default function Faucet() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(10);
  const [status, setStatus] = useState('idle'); // idle, pending, confirming, success, error
  const [message, setMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  const amounts = [5, 10, 15, 20];

  const handleStatusChange = (newStatus, newMessage) => {
    setStatus(newStatus);
    setMessage(newMessage);
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    // Validate address
    if (!address.trim()) {
      setStatus('error');
      setMessage('Please enter a valid address');
      return;
    }

    // Check rate limiting
    if (!canRequestTokens(address)) {
      const minutesRemaining = getTimeUntilNextRequest(address);
      const hoursRemaining = Math.floor(minutesRemaining / 60);
      setStatus('error');
      setMessage(`Please wait ${hoursRemaining}h ${minutesRemaining % 60}m before requesting again`);
      return;
    }

    // Reset state
    setStatus('pending');
    setMessage('Initiating request...');
    setTxHash('');

    // Send tokens
    const result = await sendTestnetTokens(address, amount, handleStatusChange);

    if (result.success) {
      setTxHash(result.txHash);
      recordTokenRequest(address);
      // Reset form after 5 seconds
      setTimeout(() => {
        setAddress('');
        setStatus('idle');
        setMessage('');
        setTxHash('');
      }, 5000);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
      case 'confirming':
        return 'var(--warn)';
      case 'success':
        return 'var(--ok)';
      case 'error':
        return '#ff5757';
      default:
        return 'var(--text-mute)';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
      case 'confirming':
        return '⟳';
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      default:
        return '';
    }
  };

  return (
    <div className="faucet-card">
      <div className="faucet-header">
        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Testnet Faucet</h3>
          <p className="text-dim" style={{ fontSize: '14px' }}>
            Get free testnet EXBT for development
          </p>
        </div>
        <span className="net-badge test">Testnet · 11211</span>
      </div>

      <form onSubmit={handleRequest} className="faucet-form">
        <div className="field-group">
          <label className="field-label">Select Amount</label>
          <div className="amount-selector">
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`amount-btn ${amount === amt ? 'active' : ''}`}
                onClick={() => setAmount(amt)}
                disabled={status === 'pending' || status === 'confirming'}
              >
                {amt} EXBT
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label className="field-label">Your Address</label>
          <input
            type="text"
            className="field"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={status === 'pending' || status === 'confirming'}
          />
        </div>

        {(status !== 'idle' && message) && (
          <div className="faucet-status" style={{ borderColor: getStatusColor() }}>
            <span className="status-icon" style={{ color: getStatusColor() }}>
              {getStatusIcon()}
            </span>
            <div className="status-content">
              <div className="status-message">{message}</div>
              {txHash && (
                <a
                  href={`https://testnet_explorer.exbotix.net/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="status-link"
                >
                  View on Explorer →
                </a>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'pending' || status === 'confirming'}
          style={{ width: '100%' }}
        >
          {status === 'pending' || status === 'confirming' ? 'Processing...' : 'Request Tokens'}
        </button>
      </form>

      <style>{`
        .faucet-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--line-2);
          border-radius: var(--r-lg);
          padding: 24px;
        }

        .faucet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }

        .faucet-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text);
        }

        .amount-selector {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .amount-btn {
          padding: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--line-2);
          border-radius: var(--r-md);
          color: var(--text-mute);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .amount-btn:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
        }

        .amount-btn.active {
          background: rgba(157, 92, 255, 0.12);
          border-color: var(--accent);
          color: var(--accent);
        }

        .amount-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .faucet-status {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid;
          border-radius: var(--r-md);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-icon {
          font-size: 20px;
          line-height: 1;
        }

        .status-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .status-message {
          font-size: 14px;
          color: var(--text);
        }

        .status-link {
          font-size: 13px;
          color: var(--accent);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .status-link:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .amount-selector {
            grid-template-columns: repeat(2, 1fr);
          }

          .faucet-header {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
