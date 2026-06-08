import { Link } from 'react-router-dom';
import { EXPLORER_MAIN } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand" style={{ fontSize: '22px' }}>
              <img className="brand-mark" src="/assets/img/exbotix-full.png" alt="Exbotix" />
            </Link>
            <p className="text-dim" style={{ marginTop: '16px', maxWidth: '34ch', fontSize: '14.5px' }}>
              A diverse Layer 1 ecosystem converging AI, CEX, DeFi and SocialFi.
              For the community, by the community.
            </p>
            <div className="socials" style={{ marginTop: '22px' }}>
              <Link to="/community" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h3l-7 8 8 12h-6l-5-7-5 7H2l8-9L2 2h7l4 6 5-6Z"/>
                </svg>
              </Link>
              <Link to="/community" aria-label="Discord">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 5a18 18 0 0 0-4-1l-.3.6A14 14 0 0 1 19 6c-2-1-4-1.5-7-1.5S7 5 5 6a14 14 0 0 1 3.3-1.4L8 4a18 18 0 0 0-4 1C2 8 1 12 1 16a13 13 0 0 0 5 2l1-2-2-1 .5-.4a9 9 0 0 0 11 0L17 15l-2 1 1 2a13 13 0 0 0 5-2c0-4-1-8-1-11ZM9 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
                </svg>
              </Link>
              <Link to="/community" aria-label="Telegram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 3 2 11l5 2 2 6 3-4 5 4 5-16ZM9 13l8-5-6 6-2 4-.5-3.5Z"/>
                </svg>
              </Link>
              <Link to="/docs" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-3 19.5c.5 0 .7-.2.7-.5v-2c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-1-.6 0-.6 0-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9 0-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.2 2.7 1a9 9 0 0 1 5 0c1.9-1.2 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h5>Network</h5>
            <div className="footer-links">
              <Link to="/tokenomics">Tokenomics</Link>
              <Link to="/staking">Staking</Link>
              <Link to="/bridge">Bridge</Link>
              <a href={EXPLORER_MAIN} target="_blank" rel="noopener">Block Explorer</a>
            </div>
          </div>

          <div>
            <h5>Build</h5>
            <div className="footer-links">
              <Link to="/docs">Documentation</Link>
              <Link to="/docs">RPC &amp; Faucet</Link>
              <Link to="/ecosystem">Ecosystem</Link>
              <Link to="/community">Grants</Link>
            </div>
          </div>

          <div>
            <h5>Community</h5>
            <div className="footer-links">
              <Link to="/mission">Mission &amp; Vision</Link>
              <Link to="/mission">Roadmap</Link>
              <Link to="/team">Team</Link>
              <Link to="/community">Blog</Link>
              <Link to="/community">Governance</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Exbotix. Testnet live — figures illustrative.</span>
          <span className="mono">Mainnet · ID 11311 &nbsp;·&nbsp; Testnet · ID 11211</span>
        </div>
      </div>
    </footer>
  );
}
