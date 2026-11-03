import { EXCHANGE_URLS } from '../../utils/constants';

const ITEMS = [
  { text: 'EXBT/USDT live on LBank', href: EXCHANGE_URLS.lbank },
  { text: 'EVM equivalent' },
  { text: 'Proof of Work' },
  { text: 'Chain ID 11311' },
  { text: 'EXBT gas token' },
  { text: 'Solidity ready' },
  { text: '8% staking APY' },
];

function Items() {
  return ITEMS.map((item, i) => (
    <span key={i}>
      {item.href
        ? <a href={item.href} target="_blank" rel="noopener">{item.text}</a>
        : item.text}
    </span>
  ));
}

export default function Marquee() {
  return (
    <div className="x-marquee" aria-label="Highlights">
      <div className="track">
        <Items />
        <Items />
      </div>
    </div>
  );
}
