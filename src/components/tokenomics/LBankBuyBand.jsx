import { EXCHANGE_URLS } from '../../utils/constants';
import Reveal from '../common/Reveal';

const BAND_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '40px',
  flexWrap: 'wrap',
  padding: '34px 38px',
  borderRadius: '32px',
  border: '1px solid rgba(244,194,75,.30)',
  background:
    'radial-gradient(120% 160% at 100% 0%, rgba(244,194,75,.10), transparent 60%), linear-gradient(110deg, rgba(157,92,255,.08), rgba(20,13,38,.4))',
};

const CARD_STYLE = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '22px 24px',
  borderRadius: '24px',
  border: '1px solid rgba(244,194,75,.34)',
  background: 'linear-gradient(100deg, rgba(244,194,75,.12), rgba(157,92,255,.08))',
  boxShadow: '0 18px 50px -26px rgba(244,194,75,.55)',
  flex: '0 1 420px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform .3s, box-shadow .3s, border-color .3s',
  cursor: 'pointer',
};

const BADGE_STYLE = {
  width: '58px',
  height: '58px',
  borderRadius: '15px',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  background: 'linear-gradient(150deg, #F4C24B, #C8932B)',
  boxShadow: '0 0 0 1px rgba(244,194,75,.5), inset 0 1px 0 rgba(255,255,255,.4)',
};

export default function LBankBuyBand() {
  return (
    <section className="wrap" style={{ marginTop: '32px', marginBottom: '0' }}>
      <Reveal>
        <div style={BAND_STYLE} aria-label="Where to buy EXBT">
          {/* Left: intro text */}
          <div style={{ flex: '1 1 320px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '.32em',
                textTransform: 'uppercase',
                color: '#D6B4FF',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Where to buy EXBT
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(26px, 3vw, 40px)',
                color: '#F2ECFF',
                lineHeight: 1.08,
                margin: '0 0 14px',
                letterSpacing: '-0.03em',
              }}
            >
              EXBT is live and tradeable
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15.5px',
                color: '#B7A9D8',
                maxWidth: '40ch',
                lineHeight: 1.6,
              }}
            >
              Get EXBT on LBank with the EXBT/USDT spot pair — deep liquidity, instant settlement, available worldwide.
            </p>
          </div>

          {/* Right: exchange card (whole card is the link) */}
          <a
            href={EXCHANGE_URLS.lbank}
            target="_blank"
            rel="noopener"
            aria-label="Trade EXBT/USDT on LBank Exchange"
            className="lbank-card"
            style={CARD_STYLE}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(244,194,75,.6)';
              e.currentTarget.style.boxShadow = '0 26px 60px -24px rgba(244,194,75,.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = 'rgba(244,194,75,.34)';
              e.currentTarget.style.boxShadow = '0 18px 50px -26px rgba(244,194,75,.55)';
            }}
          >
            {/* Badge icon */}
            <div style={BADGE_STYLE}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1a1206" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 3v18h18"/>
                <path d="M7 14l4-4 3 3 5-6"/>
              </svg>
            </div>

            {/* Body text */}
            <div style={{ flex: 1, lineHeight: 1.1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '.24em',
                  textTransform: 'uppercase',
                  color: '#F4C24B',
                  marginBottom: '4px',
                }}
              >
                Now listing on
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#F2ECFF',
                  marginBottom: '4px',
                }}
              >
                LBank Exchange
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px' }}>
                <span style={{ color: '#B7A9D8' }}>EXBT</span>
                <span style={{ color: '#D6B4FF' }}>/USDT</span>
              </div>
            </div>

            {/* Trade now label */}
            <div
              className="lbank-trade-label"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: '14px',
                color: '#F4C24B',
                whiteSpace: 'nowrap',
              }}
            >
              Trade now
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </div>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
