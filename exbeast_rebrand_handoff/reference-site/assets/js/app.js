/* ============================================================
   EXBEAST — shared behavior
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mock wallet (persists across pages) ---------- */
  const Wallet = {
    get addr() { return localStorage.getItem("exbt_addr"); },
    get connected() { return !!this.addr; },
    rand() {
      const h = "0123456789aBcDeF";
      let a = "0x";
      for (let i = 0; i < 40; i++) a += h[Math.floor(Math.random() * 16)];
      return a;
    },
    connect() {
      const a = this.rand();
      localStorage.setItem("exbt_addr", a);
      if (!localStorage.getItem("exbt_bal")) localStorage.setItem("exbt_bal", "1240.50");
      this.render();
      toast("Wallet connected", "Welcome to ExBeast — " + short(a));
      window.dispatchEvent(new Event("wallet:change"));
      return a;
    },
    disconnect() {
      localStorage.removeItem("exbt_addr");
      this.render();
      toast("Wallet disconnected", "");
      window.dispatchEvent(new Event("wallet:change"));
    },
    render() {
      document.querySelectorAll("[data-wallet]").forEach((btn) => {
        if (this.connected) {
          btn.classList.add("connected");
          btn.innerHTML = walletIcon() + "<span>" + short(this.addr) + "</span>";
        } else {
          btn.classList.remove("connected");
          btn.innerHTML = walletIcon() + "<span>Connect Wallet</span>";
        }
      });
    },
  };
  window.ExWallet = Wallet;

  function short(a) { return a.slice(0, 6) + "…" + a.slice(-4); }
  function walletIcon() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12h2"/><path d="M3 9h13a2 2 0 0 1 2 2"/></svg>';
  }

  /* ---------- Toast ---------- */
  window.toast = function (title, msg) {
    let wrap = document.getElementById("toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.id = "toast-wrap"; document.body.appendChild(wrap); }
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = '<span class="dot live"></span><div><div style="font-family:var(--font-display);font-weight:600">' +
      title + '</div>' + (msg ? '<div class="text-dim" style="font-size:12.5px">' + msg + '</div>' : '') + '</div>';
    wrap.appendChild(t);
    setTimeout(() => { t.style.transition = "opacity .4s, transform .4s"; t.style.opacity = "0"; t.style.transform = "translateX(30px)"; setTimeout(() => t.remove(), 400); }, 3400);
  };

  /* ---------- Navbar ---------- */
  function initNav() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = nav.querySelector(".nav-toggle");
    const links = nav.querySelector(".nav-links");
    if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("open"));

    nav.querySelectorAll("[data-wallet]").forEach((btn) =>
      btn.addEventListener("click", () => (Wallet.connected ? Wallet.disconnect() : Wallet.connect()))
    );
    Wallet.render();

    // mark active group/link based on current page
    const path = location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll(".nav-item").forEach((item) => {
      const links = item.querySelectorAll(".nav-menu a");
      let match = false;
      links.forEach((a) => { if (a.getAttribute("href") === path) { a.classList.add("active"); match = true; } });
      if (match) item.querySelector(".nav-trigger").classList.add("active");
      // mobile: tap trigger toggles the group open
      const trig = item.querySelector(".nav-trigger");
      trig.addEventListener("click", (e) => {
        if (window.innerWidth <= 940) { e.preventDefault(); item.classList.toggle("open"); }
      });
    });
    nav.querySelectorAll(".nav-link").forEach((a) => {
      if (a.getAttribute("href") === path) a.classList.add("active");
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Animated network background ---------- */
  function initNet() {
    const c = document.getElementById("net");
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, dpr, nodes = [], raf;
    const COUNT = window.innerWidth < 760 ? 26 : 54;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
    }
    function make() {
      nodes = [];
      for (let i = 0; i < COUNT; i++) nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .12 * dpr, vy: (Math.random() - .5) * .12 * dpr,
        r: (Math.random() * 1.6 + .6) * dpr,
      });
    }
    function step() {
      ctx.clearRect(0, 0, w, h);
      const LINK = 150 * dpr;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = "rgba(191,255,0," + (0.16 * (1 - d / LINK)).toFixed(3) + ")";
            ctx.lineWidth = dpr * 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(200,240,120,0.6)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(step);
    }
    resize(); make(); step();
    addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); make(); step(); }, { passive: true });
  }

  /* ---------- Count-up numbers ---------- */
  window.countUp = function (el, to, opts) {
    opts = opts || {};
    const dur = opts.dur || 1600, dec = opts.dec || 0, suf = opts.suf || "", pre = opts.pre || "";
    const start = performance.now();
    function tick(t) {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (to * e).toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  document.addEventListener("DOMContentLoaded", function () {
    initNav(); initReveal(); initNet();
  });
})();
