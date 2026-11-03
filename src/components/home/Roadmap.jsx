import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';

const STEPS = [
  { label: 'Now',  quarter: 'Q2 2026', now: true,  title: 'Testnet & core infrastructure', body: 'Public testnet live on Chain ID 11211, block explorer, faucet and the first developer toolkit.' },
  { label: 'Next', quarter: 'Q3 2026', now: false, title: 'Bridge & staking go live',       body: 'Cross-chain bridge for EXBT and assets, plus native staking at 8% APY with non-custodial rewards.' },
  { label: 'Soon', quarter: 'Q4 2026', now: false, title: 'Ecosystem ignition',              body: 'Grants program, first wave of AI, DeFi and SocialFi dApps, and mainnet candidate.' },
];

export default function Roadmap() {
  return (
    <section className="x-sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="x-head">
          <div>
            <span className="x-idx">05 / ROADMAP</span>
            <h2>The road ahead</h2>
          </div>
          <Link to="/mission" className="btn btn-ghost" style={{ justifySelf: 'end' }}>
            Full roadmap &amp; mission
          </Link>
        </Reveal>
        <Reveal className="x-road">
          {STEPS.map(step => (
            <div key={step.label} className={`x-step${step.now ? ' now' : ''}`}>
              <div className="q"><span>{step.label}</span><span>{step.quarter}</span></div>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
