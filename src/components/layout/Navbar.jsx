import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_GROUPS, EXPLORER_MAIN } from '../../utils/constants';
import WalletButton from '../wallet/WalletButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="brand" aria-label="Exbotix home">
        <img className="brand-mark" src="/assets/img/exbotix-full.png" alt="Exbotix" />
      </Link>

      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="nav-item">
            <button className="nav-trigger" type="button">
              {group.title}
              <svg className="caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div className="nav-menu">
              {group.items.map((item, i) => (
                item.external ? (
                  <a key={i} href={item.href} target="_blank" rel="noopener">
                    {item.label}
                  </a>
                ) : (
                  <NavLink key={i} to={item.href}>
                    {item.label}
                  </NavLink>
                )
              ))}
            </div>
          </div>
        ))}
        <NavLink className="nav-link tok" to="/tokenomics">
          <img src="https://exbotix-prod.s3.ap-south-1.amazonaws.com/EXBT/EXBT+coin+Final.png" alt="EXBT" style={{ height: '24px', width: '24px', verticalAlign: 'middle', marginRight: '3px' }} />
          EXBT
        </NavLink>
      </div>

      <div className="nav-cta">
        <a
          className="nav-icon"
          href={EXPLORER_MAIN}
          target="_blank"
          rel="noopener"
          aria-label="Block Explorer"
          title="Mainnet Block Explorer"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7"/>
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>
          </svg>
        </a>
        <WalletButton />
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}
