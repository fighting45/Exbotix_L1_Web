/* ============================================================
   EXBEAST — landing robotic scroll-assembly
   A mech assembles part-by-part as you scroll the .assembly section.
   ============================================================ */
(function () {
  "use strict";

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // Each part: id, scroll window [start,end], and offset it flies in from.
  const PARTS = [
    { id: "r-core",      s: 0.00, e: 0.18, x: 0,    y: 0,   r: -180, sc: 0.2 },
    { id: "r-torso",     s: 0.06, e: 0.30, x: 0,    y: 120, r: 0,    sc: 0.8 },
    { id: "r-shoulderL", s: 0.18, e: 0.42, x: -160, y: 0,   r: -40,  sc: 1 },
    { id: "r-shoulderR", s: 0.18, e: 0.42, x: 160,  y: 0,   r: 40,   sc: 1 },
    { id: "r-armL",      s: 0.30, e: 0.54, x: -220, y: 80,  r: -25,  sc: 1 },
    { id: "r-armR",      s: 0.30, e: 0.54, x: 220,  y: 80,  r: 25,   sc: 1 },
    { id: "r-neck",      s: 0.40, e: 0.58, x: 0,    y: 40,  r: 0,    sc: 1 },
    { id: "r-head",      s: 0.46, e: 0.70, x: 0,    y: -180,r: 0,    sc: 1 },
    { id: "r-antenna",   s: 0.64, e: 0.82, x: 0,    y: -60, r: 0,    sc: 0.4 },
    { id: "r-base",      s: 0.10, e: 0.32, x: 0,    y: 160, r: 0,    sc: 1 },
  ];

  // Callouts keyed to progress thresholds
  const CALLOUTS = [0.22, 0.42, 0.62, 0.82];

  function init() {
    const section = document.querySelector(".assembly");
    if (!section) return;
    const bar = section.querySelector(".assembly-progress-line i");
    const callouts = [...section.querySelectorAll(".callout")];
    const eyes = section.querySelectorAll(".r-eye");
    const parts = PARTS.map((p) => ({ ...p, el: document.getElementById(p.id) })).filter((p) => p.el);

    let progress = 0;
    function compute() {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress = clamp(-rect.top / total, 0, 1);
    }

    function render() {
      for (const p of parts) {
        const local = easeOut(clamp((progress - p.s) / (p.e - p.s), 0, 1));
        const x = lerp(p.x, 0, local);
        const y = lerp(p.y, 0, local);
        const r = lerp(p.r, 0, local);
        const sc = lerp(p.sc, 1, local);
        p.el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(1)} 260 300) scale(${sc.toFixed(3)})`);
        p.el.style.opacity = clamp(local * 1.6, 0, 1);
      }
      if (bar) bar.style.width = (progress * 100).toFixed(1) + "%";

      // eyes glow once head is mostly in
      const lit = progress > 0.68;
      eyes.forEach((e) => { e.style.opacity = lit ? 1 : 0.12; });

      callouts.forEach((c, i) => c.classList.toggle("show", progress >= CALLOUTS[i]));
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { compute(); render(); ticking = false; });
    }
    compute(); render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { compute(); render(); }, { passive: true });
  }

  /* count-up stats when strip enters view */
  function initStats() {
    const strip = document.querySelector("[data-stats]");
    if (!strip || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting) {
          strip.querySelectorAll("[data-count]").forEach((el) => {
            window.countUp(el, parseFloat(el.dataset.count), {
              dec: parseInt(el.dataset.dec || "0"), suf: el.dataset.suf || "", pre: el.dataset.pre || "",
            });
          });
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(strip);
  }

  /* rotating headline category (video-style skew/slide swap) */
  function initRotor() {
    const rotor = document.querySelector(".rotor");
    if (!rotor) return;
    const item = rotor.querySelector(".rotor-item");
    const words = ["AI Agents", "DeFi", "SocialFi", "RWA", "Web3 Games"];
    let i = 0;
    function cycle() {
      item.classList.remove("in");
      item.classList.add("out");
      setTimeout(function () {
        i = (i + 1) % words.length;
        item.textContent = words[i];
        item.classList.remove("out");
        item.classList.add("in");
      }, 360);
    }
    setInterval(cycle, 2300);
  }

  document.addEventListener("DOMContentLoaded", function () { init(); initStats(); initRotor(); });
})();
