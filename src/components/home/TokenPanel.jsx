import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { EXCHANGE_URLS } from '../../utils/constants';

export default function TokenPanel() {
  return (
    <section className="x-sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="x-token">
          <div className="x-token-art">
            <span className="tick" style={{ top: '22px', left: '24px' }}>03 / TOKEN</span>
            <span className="tick" style={{ bottom: '22px', right: '24px' }}>EVM · 18 DECIMALS</span>
            <img src="/assets/img/exbt-coin.png" alt="EXBT coin" />
          </div>
          <div className="x-token-body">
            <div>
              <div className="x-sym">EXBT</div>
              <p className="lead" style={{ marginTop: '22px', fontSize: '17px' }}>
                Gas, staking &amp; governance in one asset. EXBT powers every transaction, secures the network through staking, and gives the community a direct say in where ExBeast goes next.
              </p>
            </div>
            <div className="x-specs">
              <div>
                <div className="mono-k">Max supply</div>
                <div className="v">92,000,000</div>
              </div>
              <div>
                <div className="mono-k">Staking reward</div>
                <div className="v" style={{ color: 'var(--accent)' }}>8% APY</div>
              </div>
              <div>
                <div className="mono-k">Utility</div>
                <div className="v">Gas · Staking · Governance</div>
              </div>
              <div>
                <div className="mono-k">Trade</div>
                <div className="v">EXBT/USDT · LBank</div>
              </div>
            </div>
            <div className="x-cta">
              <a href={EXCHANGE_URLS.lbank} target="_blank" rel="noopener" className="btn btn-primary">Buy on LBank</a>
              <Link to="/tokenomics" className="btn btn-ghost">Tokenomics</Link>
              <Link to="/staking" className="btn btn-ghost">Stake EXBT</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
