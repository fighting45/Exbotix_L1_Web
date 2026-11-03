import { useState } from 'react';
import Reveal from '../common/Reveal';
import { NETWORKS } from '../../utils/constants';
import { useWallet } from '../../context/WalletContext';

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
    <path d="M5 12l5 5 9-10"/>
  </svg>
);

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    (navigator.clipboard
      ? navigator.clipboard.writeText(value)
      : Promise.reject()
    ).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="x-r">
      <span className="k">{label}</span>
      <span className="v">{value}</span>
      <button className={`x-copy${copied ? ' ok' : ''}`} onClick={handleCopy} aria-label={`Copy ${label}`}>
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

function NetworkPanel({ netKey }) {
  const { addNetwork } = useWallet();
  const net = NETWORKS[netKey];
  const isMain = netKey === 'mainnet';

  return (
    <div className={`x-net ${isMain ? 'main' : 'test'}`}>
      <div className="x-net-top">
        <h3>{isMain ? 'Mainnet' : 'Testnet'}</h3>
        <span className={`chip${isMain ? ' net-main' : ''}`}>
          <span className={`dot${isMain ? ' live' : ' test live'}`}></span>
          Live
        </span>
      </div>
      <div className="x-rows">
        <CopyRow label="Network"  value={net.chainName} />
        <CopyRow label="RPC URL"  value={net.rpcUrls[0]} />
        <CopyRow label="Chain ID" value={String(net.chainIdDecimal)} />
        <CopyRow label="Symbol"   value={net.nativeCurrency.symbol} />
        <CopyRow label="Explorer" value={net.blockExplorerUrls[0]} />
      </div>
      <button
        className={`btn ${isMain ? 'btn-primary' : 'btn-amber'}`}
        onClick={() => addNetwork(netKey)}
      >
        {isMain ? 'Add Mainnet to wallet' : 'Add Testnet to wallet'}
      </button>
    </div>
  );
}

export default function ConnectNetworks() {
  return (
    <section className="x-sec">
      <div className="wrap">
        <Reveal className="x-head">
          <div>
            <span className="x-idx">01 / CONNECT</span>
            <h2>Plug into<br />the network</h2>
          </div>
          <p>Add ExBeast to MetaMask in one click, or copy the parameters into any EVM wallet or tool.</p>
        </Reveal>
        <Reveal className="x-nets">
          <NetworkPanel netKey="mainnet" />
          <NetworkPanel netKey="testnet" />
        </Reveal>
      </div>
    </section>
  );
}
