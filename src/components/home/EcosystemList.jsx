import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';

const ITEMS = [
  { n: '01', name: 'AI Agents',   desc: 'On-chain inference markets, agent wallets and autonomous compute settling natively in EXBT.', tag: 'Intelligence layer' },
  { n: '02', name: 'CEX Rails',   desc: 'Exchange-grade liquidity and order infrastructure bridged directly into the chain.',           tag: 'Liquidity layer' },
  { n: '03', name: 'DeFi',        desc: 'AMMs, lending and perps with EVM equivalence — fork your favorite protocol day one.',          tag: 'Finance layer' },
  { n: '04', name: 'SocialFi',    desc: 'Creator economies, social graphs and reputation owned by users, not platforms.',               tag: 'Social layer' },
  { n: '05', name: 'Web3 Games',  desc: 'Low-friction in-game economies and true asset ownership for studios of any size.',             tag: 'Play layer' },
  { n: '06', name: 'RWA',         desc: 'Tokenize and settle real-world assets with transparent, auditable provenance.',                tag: 'Asset layer' },
];

const Arrow = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

export default function EcosystemList() {
  return (
    <section className="x-sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="x-head">
          <div>
            <span className="x-idx">02 / ECOSYSTEM</span>
            <h2>Every frontier,<br />converged</h2>
          </div>
          <p>AI agents, CEX rails, DeFi and SocialFi share one settlement layer and one gas token — EXBT.</p>
        </Reveal>
        <Reveal className="x-eco">
          {ITEMS.map(item => (
            <Link to="/ecosystem" key={item.n}>
              <span className="n">{item.n}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="t">{item.tag}</span>
              <Arrow />
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
