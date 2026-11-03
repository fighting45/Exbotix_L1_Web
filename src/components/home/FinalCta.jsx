import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';

export default function FinalCta() {
  return (
    <section className="x-final">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>For the community, by the community</span>
          <h2>Build the future on ExBeast</h2>
          <p className="lead">
            Join the builders, stakers and dreamers shaping a chain where AI, finance and social finally live in one place.
          </p>
          <div className="x-cta">
            <a href="https://exbeast.com" target="_blank" rel="noopener" className="btn btn-primary">Launch App</a>
            <Link to="/community" className="btn btn-ghost">Join the community</Link>
          </div>
        </Reveal>
      </div>
      <div className="x-word" aria-hidden="true">Ex<b>Beast</b></div>
    </section>
  );
}
