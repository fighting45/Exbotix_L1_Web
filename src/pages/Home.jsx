import { useEffect } from 'react';
import { EXCHANGE_URLS } from '../utils/constants';
import { useWallet } from '../context/WalletContext';
import '../assets/styles/home-v2.css';

import HeroCoin        from '../components/home/HeroCoin';
import RotatingWord    from '../components/home/RotatingWord';
import StatusStrip     from '../components/home/StatusStrip';
import Marquee         from '../components/home/Marquee';
import ConnectNetworks from '../components/home/ConnectNetworks';
import EcosystemList   from '../components/home/EcosystemList';
import TokenPanel      from '../components/home/TokenPanel';
import BuildSection    from '../components/home/BuildSection';
import Roadmap         from '../components/home/Roadmap';
import FinalCta        from '../components/home/FinalCta';

export default function Home() {
  const { addNetwork } = useWallet();

  useEffect(() => {
    document.body.classList.add('hv2');
    return () => document.body.classList.remove('hv2');
  }, []);

  return (
    <>
      <div className="bg-field" aria-hidden="true"></div>

      <header className="x-hero">
        <HeroCoin />
        <div className="wrap hero-content">
          <div className="x-kicker">
            <span className="chip net-main"><span className="dot live"></span>Mainnet · 11311</span>
            <span className="chip" style={{ color: 'var(--net-test)', borderColor: 'var(--net-test-line)', background: 'var(--net-test-soft)' }}>
              <span className="dot test live"></span>Testnet · 11211
            </span>
            <a href={EXCHANGE_URLS.lbank} target="_blank" rel="noopener" className="chip">
              EXBT/USDT on LBank
            </a>
          </div>
          <h1 className="x-h1">
            <span className="l">One chain</span>
            <span className="l">for <RotatingWord /></span>
          </h1>
          <div className="x-hero-row">
            <p className="lead">
              ExBeast is a modern, efficient Layer 1 that converges AI, exchange infrastructure,
              decentralized finance and social into one programmable ecosystem. Built for the
              community, by the community.
            </p>
            <div className="x-cta">
              <a href={EXCHANGE_URLS.exbeast} target="_blank" rel="noopener" className="btn btn-primary">
                Buy on ExBeast&nbsp;
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M8 7h9v9"/>
                </svg>
              </a>
              <button type="button" className="btn btn-lime-outline" onClick={() => addNetwork('mainnet')}>
                Add to wallet
              </button>
            </div>
          </div>
        </div>
        <div className="wrap hero-status">
          <StatusStrip />
        </div>
      </header>

      <Marquee />
      <ConnectNetworks />
      <EcosystemList />
      <TokenPanel />
      <BuildSection />
      <Roadmap />
      <FinalCta />
    </>
  );
}
