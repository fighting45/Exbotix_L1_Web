import { useState, useEffect, useMemo } from 'react';
import Reveal from '../components/common/Reveal';

const SECTIONS = [
  { id: 'overview', title: '1. Overview' },
  { id: 'hash', title: '2. Cryptographic Hash Function' },
  { id: 'block', title: '3. Block Hash Construction' },
  { id: 'mining', title: '4. Mining Probability' },
  { id: 'hashrate', title: '5. Network Hash Rate' },
  { id: 'discovery', title: '6. Block Discovery Rate' },
  { id: 'difficulty', title: '7. Difficulty Retarget' },
  { id: 'ethash', title: '8. Ethash Dataset Generation' },
  { id: 'fnv', title: '9. FNV Hash Function' },
  { id: 'ethash-mining', title: '10. Ethash Mining Function' },
  { id: 'merkle', title: '11. Merkle Patricia Trie' },
  { id: 'transaction', title: '12. Transaction Validation' },
  { id: 'gas', title: '13. Gas Cost Model' },
  { id: 'inflation', title: '14. Zero Inflation Model' },
  { id: 'incentive', title: '15. Miner Incentive' },
  { id: 'chain', title: '16. Chain Selection Rule' },
  { id: 'security', title: '17. Security vs Double Spending' },
  { id: 'byzantine', title: '18. Byzantine Fault Tolerance' },
  { id: 'entropy', title: '19. Entropy Analysis' },
  { id: 'objective', title: '20. Formal Security Objective' },
];

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarLeft, setSidebarLeft] = useState(0);

  // Update sidebar position on scroll and resize
  useEffect(() => {
    let ticking = false;

    const updateSidebarPosition = () => {
      const navElement = document.querySelector('.whitepaper-nav');
      if (navElement) {
        const rect = navElement.getBoundingClientRect();
        setSidebarLeft(rect.left);
      }
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateSidebarPosition);
        ticking = true;
      }
    };

    updateSidebarPosition();
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0;
        let maxEntry = null;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxEntry = entry;
          }
        });

        if (maxEntry && maxEntry.isIntersecting) {
          setActiveSection(maxEntry.target.id);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-20% 0px -35% 0px'
      }
    );

    // Observe all sections
    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset from top
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className="page-hero" style={{ paddingBottom: '40px' }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <Reveal><span className="eyebrow" style={{ justifyContent: 'center' }}>Technical Whitepaper</span></Reveal>
          <Reveal delay={1}><h1 style={{ marginTop: '14px' }}>Consensus Algorithm &<br/>Mathematical Foundation</h1></Reveal>
          <Reveal delay={2}>
            <p className="lead" style={{ margin: '18px auto 0', maxWidth: '55ch' }}>
              A comprehensive technical overview of the Exbotix Chain proof-of-work consensus protocol, cryptographic foundations, and security model.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="whitepaper-content">
        <div className="wrap">
          <div className="whitepaper-layout">
            {/* Sidebar Navigation */}
            <aside className="whitepaper-nav">
              <div className="nav-sticky" style={{ left: `${sidebarLeft}px` }}>
                <h6 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-mute)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Contents
                </h6>
                {SECTIONS.map(({ id, title }) => (
                  <button
                    key={id}
                    className={`nav-item ${activeSection === id ? 'active' : ''}`}
                    onClick={() => scrollToSection(id)}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Content */}
            <main className="whitepaper-main">
              {/* Section 1: Overview */}
              <section id="overview" className="wp-section">
                <h2>1. Overview</h2>
                <p>
                  Exbotix Chain (EXBT) utilizes the original Ethereum Ethash Proof-of-Work consensus protocol. Ethash is a memory-hard proof-of-work function designed to reduce ASIC advantages and increase computational decentralization.
                </p>
                <p>
                  The security of the blockchain is derived from computational work performed by miners and verified by network participants.
                </p>
              </section>

              {/* Section 2: Cryptographic Hash Function */}
              <section id="hash" className="wp-section">
                <h2>2. Cryptographic Hash Function</h2>
                <p>The network employs <strong>Keccak-256</strong>.</p>
                <p>The hash function is represented as:</p>
                <div className="formula">
                  Hash = Keccak256(M)
                </div>
                <p>where:</p>
                <ul>
                  <li><code>M</code> = Arbitrary message</li>
                </ul>
                <p><strong>Properties:</strong></p>
                <ul>
                  <li>Deterministic</li>
                  <li>Collision resistant</li>
                  <li>Preimage resistant</li>
                  <li>Avalanche effect</li>
                </ul>
                <p>For any two messages:</p>
                <div className="formula">
                  M₁ ≠ M₂
                </div>
                <p>the probability that:</p>
                <div className="formula">
                  Keccak256(M₁) = Keccak256(M₂)
                </div>
                <p>is approximately:</p>
                <div className="formula">
                  P(collision) ≈ 1 / 2¹²⁸
                </div>
                <p>according to birthday-bound analysis.</p>
              </section>

              {/* Section 3: Block Hash Construction */}
              <section id="block" className="wp-section">
                <h2>3. Block Hash Construction</h2>
                <p>For block <code>n</code>:</p>
                <div className="code-block">
                  Bₙ = {'{'}
                  <br />
                  &nbsp;&nbsp;Header,
                  <br />
                  &nbsp;&nbsp;Transactions,
                  <br />
                  &nbsp;&nbsp;StateRoot,
                  <br />
                  &nbsp;&nbsp;ReceiptsRoot,
                  <br />
                  &nbsp;&nbsp;Nonce
                  <br />
                  {'}'}
                </div>
                <p>The resulting block hash becomes:</p>
                <div className="formula">
                  Hₙ = Keccak256(Header || Nonce || MixHash)
                </div>
                <p>where <code>||</code> denotes concatenation.</p>
                <p>A valid block must satisfy:</p>
                <div className="formula">
                  Hₙ &lt; Targetₙ
                </div>
              </section>

              {/* Section 4: Mining Probability */}
              <section id="mining" className="wp-section">
                <h2>4. Mining Probability</h2>
                <p>The probability of discovering a valid block with one hash attempt is:</p>
                <div className="formula">
                  P<sub>success</sub> = Target / 2²⁵⁶
                </div>
                <p>Expected attempts:</p>
                <div className="formula">
                  E = 1 / P<sub>success</sub>
                </div>
                <p>Thus:</p>
                <div className="formula">
                  E = 2²⁵⁶ / Target
                </div>
                <p>Since:</p>
                <div className="formula">
                  Difficulty = 2²⁵⁶ / Target
                </div>
                <p>Expected mining work becomes:</p>
                <div className="formula">
                  E = Difficulty
                </div>
              </section>

              {/* Section 5: Network Hash Rate */}
              <section id="hashrate" className="wp-section">
                <h2>5. Network Hash Rate</h2>
                <p>Assume:</p>
                <ul>
                  <li><code>N</code> miners</li>
                  <li>Each miner contributes: <code>Hᵢ</code> hashes per second</li>
                </ul>
                <p>Total network power:</p>
                <div className="formula">
                  H<sub>network</sub> = Σ Hᵢ
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>for i = 1 to N</span>
                </div>
                <p><strong>Example:</strong></p>
                <div className="code-block">
                  Miner A = 50 MH/s
                  <br />
                  Miner B = 100 MH/s
                  <br />
                  Miner C = 200 MH/s
                  <br />
                  <br />
                  Then:
                  <br />
                  H<sub>network</sub> = 350 MH/s
                </div>
              </section>

              {/* Section 6: Block Discovery Rate */}
              <section id="discovery" className="wp-section">
                <h2>6. Block Discovery Rate</h2>
                <p>For target block interval:</p>
                <div className="formula">
                  T<sub>b</sub> = 10 seconds
                </div>
                <p>Expected blocks per day:</p>
                <div className="formula">
                  Blocks/day = 86,400 / T<sub>b</sub> = 8,640
                </div>
                <p>Expected blocks per year:</p>
                <div className="formula">
                  Blocks/year = 31,536,000 / 10 = 3,153,600
                </div>
              </section>

              {/* Section 7: Difficulty Retarget */}
              <section id="difficulty" className="wp-section">
                <h2>7. Difficulty Retarget Equation</h2>
                <p>Difficulty adapts after every block.</p>
                <p>Let:</p>
                <div className="formula">
                  Δt = CurrentBlockTime − PreviousBlockTime
                </div>
                <p>Ethereum-style adjustment:</p>
                <div className="formula">
                  Dₙ = Dₙ₋₁ + floor(Dₙ₋₁ / 2048)
                  <br />
                  × max(1 − Δt/10, −99)
                </div>
                <p><strong>Conditions:</strong></p>
                <ul>
                  <li>If <code>Δt &lt; 10</code> → difficulty increases</li>
                  <li>If <code>Δt &gt; 10</code> → difficulty decreases</li>
                </ul>
                <p>This forms a negative feedback control loop.</p>
              </section>

              {/* Section 8: Ethash Dataset Generation */}
              <section id="ethash" className="wp-section">
                <h2>8. Ethash Dataset Generation</h2>
                <p>Ethash relies on a large Directed Acyclic Graph (DAG).</p>
                <p><strong>Epoch:</strong></p>
                <div className="formula">
                  Epoch = floor(BlockNumber / 30000)
                </div>
                <p><strong>Cache generation:</strong></p>
                <div className="code-block">
                  Cache₀ = SeedHash
                  <br />
                  Cacheᵢ = Keccak512(Cacheᵢ₋₁)
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>for all i</span>
                </div>
                <p>The DAG is generated through repeated FNV mixing:</p>
                <div className="formula">
                  DAGᵢ = FNV(Cacheⱼ, Cache<sub>k</sub>)
                </div>
                <p>Memory hardness prevents efficient ASIC optimization.</p>
              </section>

              {/* Section 9: FNV Hash Function */}
              <section id="fnv" className="wp-section">
                <h2>9. FNV Hash Function</h2>
                <p>Ethash utilizes the Fowler-Noll-Vo algorithm.</p>
                <p><code>FNV(v1, v2)</code> is defined as:</p>
                <div className="formula">
                  FNV(v1, v2) = ((v1 × 0x01000193) XOR v2) mod 2³²
                </div>
                <p>The operation provides high-speed pseudo-random mixing.</p>
              </section>

              {/* Section 10: Ethash Mining Function */}
              <section id="ethash-mining" className="wp-section">
                <h2>10. Ethash Mining Function</h2>
                <p><strong>Input:</strong></p>
                <ul>
                  <li>HeaderHash</li>
                  <li>Nonce</li>
                  <li>DAG Dataset</li>
                </ul>
                <p><strong>Seed:</strong></p>
                <div className="formula">
                  s = Keccak512(HeaderHash || Nonce)
                </div>
                <p>For each dataset access:</p>
                <div className="formula">
                  mix = FNV(mix, DAG[index])
                </div>
                <p>Final compression:</p>
                <div className="formula">
                  MixHash = Compress(mix)
                </div>
                <p><strong>Output:</strong></p>
                <div className="formula">
                  Result = Keccak256(s || MixHash)
                </div>
                <p><strong>Validation condition:</strong></p>
                <div className="formula">
                  Result &lt; Target
                </div>
              </section>

              {/* Section 11: Merkle Patricia Trie */}
              <section id="merkle" className="wp-section">
                <h2>11. Merkle Patricia Trie</h2>
                <p>State storage utilizes Merkle Patricia Trees.</p>
                <p><strong>Root hash:</strong></p>
                <div className="formula">
                  Root = H(Node₀)
                </div>
                <p>Every account update modifies:</p>
                <div className="formula">
                  StateRoot
                </div>
                <p>A transaction modifies state:</p>
                <div className="formula">
                  State(n+1) = Apply(Tx, State(n))
                </div>
                <p>The resulting root hash is stored inside each block header.</p>
              </section>

              {/* Section 12: Transaction Validation */}
              <section id="transaction" className="wp-section">
                <h2>12. Transaction Validation</h2>
                <p>For transaction <code>Tx</code>:</p>
                <div className="code-block">
                  Tx = {'{'}
                  <br />
                  &nbsp;&nbsp;Nonce,
                  <br />
                  &nbsp;&nbsp;GasPrice,
                  <br />
                  &nbsp;&nbsp;GasLimit,
                  <br />
                  &nbsp;&nbsp;To,
                  <br />
                  &nbsp;&nbsp;Value,
                  <br />
                  &nbsp;&nbsp;Data,
                  <br />
                  &nbsp;&nbsp;Signature
                  <br />
                  {'}'}
                </div>
                <p><strong>Validation requires:</strong></p>
                <div className="formula">
                  VerifyECDSA(Signature)
                </div>
                <p>and:</p>
                <div className="formula">
                  SenderBalance ≥ Value + Fee
                </div>
                <p>Only valid transactions enter the mempool.</p>
              </section>

              {/* Section 13: Gas Cost Model */}
              <section id="gas" className="wp-section">
                <h2>13. Gas Cost Model</h2>
                <p>Transaction fee:</p>
                <div className="formula">
                  Fee = GasUsed × GasPrice
                </div>
                <p><strong>Example:</strong></p>
                <div className="code-block">
                  GasUsed = 21,000
                  <br />
                  GasPrice = 10 Gwei
                  <br />
                  <br />
                  Fee:
                  <br />
                  21,000 × 10 × 10⁻⁹
                  <br />
                  = 0.00021 EXBT
                </div>
              </section>

              {/* Section 14: Zero Inflation */}
              <section id="inflation" className="wp-section">
                <h2>14. Zero Inflation Monetary Model</h2>
                <p>Unlike Ethereum:</p>
                <div className="formula">
                  BlockReward = 0
                </div>
                <p>Annual inflation:</p>
                <div className="formula">
                  InflationRate = 0%
                </div>
                <p>Supply remains constant:</p>
                <div className="formula">
                  Supply(t) = Supply<sub>Genesis</sub>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>for all future times</span>
                </div>
                <p>Therefore:</p>
                <div className="formula">
                  dSupply/dt = 0
                </div>
                <p>No mining issuance exists.</p>
              </section>

              {/* Section 15: Miner Incentive */}
              <section id="incentive" className="wp-section">
                <h2>15. Miner Incentive Function</h2>
                <p>Miner compensation derives entirely from fees.</p>
                <div className="formula">
                  Revenue<sub>Miner</sub> = Σ Fees<sub>Block</sub>
                </div>
                <p>Block reward contribution:</p>
                <div className="formula">
                  Reward<sub>Block</sub> = 0
                </div>
                <p>Total miner revenue:</p>
                <div className="formula">
                  Revenue<sub>Total</sub> = Fees<sub>Collected</sub>
                </div>
              </section>

              {/* Section 16: Chain Selection Rule */}
              <section id="chain" className="wp-section">
                <h2>16. Chain Selection Rule</h2>
                <p>Let:</p>
                <ul>
                  <li><code>Cᵢ</code> = Blockchain branch i</li>
                </ul>
                <p><strong>Weight:</strong></p>
                <div className="formula">
                  Wᵢ = Σ Difficulty<sub>k</sub>
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>for all blocks k in chain i</span>
                </div>
                <p>The canonical chain is:</p>
                <div className="formula">
                  Chain<sub>Canonical</sub> = arg max(Wᵢ)
                </div>
                <p>This is commonly known as the <strong>Greatest Accumulated Work</strong> rule.</p>
              </section>

              {/* Section 17: Security Against Double Spending */}
              <section id="security" className="wp-section">
                <h2>17. Security Against Double Spending</h2>
                <p>Attacker hash fraction: <code>q</code></p>
                <p>Honest network:</p>
                <div className="formula">
                  p = 1 − q
                </div>
                <p>Probability of reversing <code>z</code> confirmations:</p>
                <div className="formula">
                  P = (q/p)ᶻ
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>when q &lt; p</span>
                </div>
                <p><strong>Example:</strong></p>
                <div className="code-block">
                  q = 0.30
                  <br />
                  z = 6
                  <br />
                  <br />
                  P ≈ 0.00137
                  <br />
                  or approximately 0.137%
                </div>
                <p>Security increases exponentially with confirmation depth.</p>
              </section>

              {/* Section 18: Byzantine Fault Tolerance */}
              <section id="byzantine" className="wp-section">
                <h2>18. Byzantine Fault Tolerance Approximation</h2>
                <p>The network remains secure provided:</p>
                <div className="formula">
                  q &lt; 0.5
                </div>
                <p>where <code>q</code> is attacker computational power.</p>
                <p>A majority attack requires:</p>
                <div className="formula">
                  H<sub>attacker</sub> &gt; 50% × H<sub>network</sub>
                </div>
                <p>which becomes economically expensive as network hashrate increases.</p>
              </section>

              {/* Section 19: Entropy Analysis */}
              <section id="entropy" className="wp-section">
                <h2>19. Entropy Analysis</h2>
                <p>Nonce space:</p>
                <div className="formula">
                  2⁶⁴
                </div>
                <p>Search space:</p>
                <div className="formula">
                  18,446,744,073,709,551,616
                  <br />
                  <span style={{ fontSize: '14px', color: 'var(--text-mute)' }}>possible nonce values per block</span>
                </div>
                <p>Combined with DAG randomness and Keccak security, brute-force prediction becomes computationally infeasible.</p>
              </section>

              {/* Section 20: Formal Security Objective */}
              <section id="objective" className="wp-section">
                <h2>20. Formal Security Objective</h2>
                <p>For attacker <code>A</code>:</p>
                <div className="formula">
                  Pr(A wins consensus)
                </div>
                <p>approaches:</p>
                <div className="formula">
                  0
                </div>
                <p>as:</p>
                <div className="formula">
                  Confirmations → ∞
                </div>
                <p>provided:</p>
                <div className="formula">
                  HashPower(A) &lt; HashPower(HonestNetwork)
                </div>
                <p>This property forms the foundation of Exbotix Chain security.</p>
              </section>
            </main>
          </div>
        </div>
      </section>

      <style>{`
        .whitepaper-content {
          padding: 50px 0 90px;
        }

        .whitepaper-content .wrap {
          max-width: 1400px;
        }

        .whitepaper-layout {
          display: flex;
          gap: 60px;
          align-items: flex-start;
          position: relative;
        }

        .whitepaper-nav {
          width: 260px;
          flex-shrink: 0;
          min-width: 260px;
          position: relative;
        }

        .nav-sticky {
          position: fixed;
          top: 100px;
          width: 260px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--line-2);
          border-radius: var(--r-lg);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
          z-index: 100;
        }

        .nav-sticky:hover {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .nav-sticky::-webkit-scrollbar {
          width: 4px;
        }

        .nav-sticky::-webkit-scrollbar-track {
          background: transparent;
        }

        .nav-sticky::-webkit-scrollbar-thumb {
          background: var(--line-2);
          border-radius: 2px;
        }

        .nav-sticky h6 {
          margin: 0 0 16px 12px;
        }

        .nav-item {
          position: relative;
          display: block;
          width: 100%;
          padding: 10px 12px;
          text-align: left;
          font-size: 13px;
          color: var(--text-mute);
          background: none;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.4;
          border-radius: 4px;
          margin-bottom: 2px;
        }

        .nav-item:hover {
          color: var(--text);
          border-left-color: var(--line-2);
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          color: var(--accent);
          border-left-color: var(--accent);
          background: rgba(157, 92, 255, 0.08);
          font-weight: 500;
          transform: translateX(4px);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
          animation: pulse 2s ease-in-out infinite;
        }

        .whitepaper-main {
          flex: 1;
          max-width: 800px;
          min-width: 0;
        }

        .wp-section {
          margin-bottom: 60px;
          scroll-margin-top: 100px;
        }

        .wp-section h2 {
          font-size: 28px;
          margin-bottom: 20px;
          color: var(--text);
        }

        .wp-section p {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-mute);
          margin-bottom: 16px;
        }

        .wp-section ul {
          margin: 16px 0;
          padding-left: 24px;
        }

        .wp-section li {
          font-size: 16px;
          line-height: 1.7;
          color: var(--text-mute);
          margin-bottom: 8px;
        }

        .wp-section code {
          font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          padding: 2px 6px;
          background: rgba(157, 92, 255, 0.1);
          border: 1px solid rgba(157, 92, 255, 0.2);
          border-radius: 4px;
          color: var(--accent);
        }

        .formula {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--line-2);
          border-left: 3px solid var(--accent);
          border-radius: var(--r-md);
          font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
          font-size: 15px;
          color: var(--text);
          margin: 16px 0;
          line-height: 1.8;
        }

        .code-block {
          padding: 18px 20px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--line-2);
          border-radius: var(--r-md);
          font-family: 'SF Mono', 'Monaco', 'Courier New', monospace;
          font-size: 14px;
          color: var(--text-mute);
          margin: 16px 0;
          line-height: 1.8;
        }

        @media (max-width: 1024px) {
          .whitepaper-layout {
            flex-direction: column;
            gap: 30px;
          }

          .whitepaper-nav {
            width: 100%;
            display: none;
          }

          .whitepaper-main {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .wp-section h2 {
            font-size: 22px;
          }

          .wp-section p,
          .wp-section li {
            font-size: 15px;
          }

          .formula,
          .code-block {
            font-size: 13px;
            padding: 14px 16px;
          }
        }
      `}</style>
    </>
  );
}
