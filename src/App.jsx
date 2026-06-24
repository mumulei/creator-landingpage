import { useState, useEffect, useCallback } from "react";
import BlindsAuroraBackground from "./components/blinds-aurora-background.jsx";
import polishedDashboard from "./assets/Brands.png";
import brandLogo from "./assets/local-logos/brand-logo.svg";
import LogoCloud from "./components/logo-cloud.jsx";
import KeyFeatures from "./components/key-features.jsx";
import HowItWorks from "./components/how-it-works.jsx";
import ScaleUgc from "./components/scale-ugc.jsx";
import CreatorShowcase from "./components/creator-showcase.jsx";
import ReadyToScale from "./components/ready-to-scale.jsx";
import Footer from './components/footer.jsx';
import AnimatedContent from "./components/ui/AnimatedContent.jsx";
import GradientBlurTop from "./components/GradientBlurTop.jsx";
import { SmoothCorners } from '@lisse/react';




const navItems = ["Home", "Creator Library", "Pricing", "About Us", "App For Creator"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  /* 导航栏滚动检测：滚动超过 32px 后添加 scrolled 状态，同时检测是否悬浮在深色元素上 */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      const topbar = document.getElementById("topbar");
      if (!topbar) return;

      const topbarRect = topbar.getBoundingClientRect();
      const topbarTop = topbarRect.top;
      const topbarBottom = topbarRect.bottom;
      const topbarLeft = topbarRect.left;
      const topbarRight = topbarRect.right;
      const headerCenterY = (topbarTop + topbarBottom) / 2;

      // 寻找真正被明确标记为 dark 主题的深色元素（如页脚和 ReadyToScale 包裹区）
      const darkElements = document.querySelectorAll('[data-theme="dark"]');

      let currentDark = false;

      darkElements.forEach((el) => {
        const rect = el.getBoundingClientRect();

        // 垂直相交检测：元素的 vertical 范围覆盖了 topbar 的垂直中线
        const verticalOverlap = rect.top <= headerCenterY && rect.bottom >= headerCenterY;
        
        // 水平相交检测：元素的 horizontal 范围与 topbar 发生重叠
        const horizontalOverlap = rect.left < topbarRight && rect.right > topbarLeft;

        if (verticalOverlap && horizontalOverlap) {
          // 如果该元素显式声明了 light 主题，则排他，否则只要重合就判定为 dark
          if (el.getAttribute('data-theme') === 'light') {
            currentDark = false;
          } else {
            currentDark = true;
          }
        }
      });

      setIsDarkTheme(currentDark);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* 移动菜单展开时禁止背景滚动 */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <main className="creatorial-page">
      <GradientBlurTop />
      <BlindsAuroraBackground />

      <header
        className={`topbar${scrolled ? " topbar--scrolled" : ""}${isDarkTheme ? " topbar--dark" : ""}`}
        id="topbar"
      >
        <a className="brand" href="/" aria-label="Creatorial home">
          <img
            src={brandLogo}
            alt=""
            className="brand-mark brand-mark--single"
            aria-hidden="true"
          />
        </a>

        {/* 汉堡菜单按钮（移动端可见） */}
        <button
          className={`hamburger${menuOpen ? " is-open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          id="hamburger-btn"
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>

        <nav
          className={`topnav${menuOpen ? " topnav--open" : ""}`}
          aria-label="Primary"
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={index === 0 ? "is-active" : ""}
              onClick={closeMenu}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <a className="ghost-link" href="#language">
            English
            <span className="ghost-link__chevron" aria-hidden="true">
              ▾
            </span>
          </a>
          <SmoothCorners asChild corners={{ radius: 18, smoothing: 0.6 }}>
            <a className="solid-link solid-link--magenta group" href="#get-started" id="nav-cta">
              <span className="btn-arrow-left">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
              <span className="btn-text">Get Started</span>
              <span className="btn-arrow-right">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </a>
          </SmoothCorners>
        </div>

        {/* 移动菜单遮罩层 */}
        {menuOpen && (
          <div
            className="mobile-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>
            <span className="anim-fade-up" style={{ animationDelay: "0.1s", fontWeight: 700 }}>
              Turn UGC Into Your
            </span>
            <span className="anim-fade-up" style={{ animationDelay: "0.2s", fontWeight: 700 }}>
              Best-Performing Ads
            </span>
          </h1>



          <p className="hero-body anim-fade-up" style={{ animationDelay: "0.4s" }}>
            High-performing UGC that drives real growth.
            <br />
            Pay as you go or subscribe, with vetted creators and full usage
            rights from the start.
          </p>

          <div className="hero-cta-row anim-fade-up" style={{ animationDelay: "0.55s" }}>
            <SmoothCorners asChild corners={{ radius: 24, smoothing: 0.6 }}>
              <a className="hero-cta hero-cta--dark group" href="#get-started" id="hero-cta-start">
                <span className="btn-arrow-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
                <span className="btn-text">Get Started</span>
                <span className="btn-arrow-right">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </a>
            </SmoothCorners>
            <SmoothCorners asChild corners={{ radius: 24, smoothing: 0.6 }}>
              <a className="hero-cta hero-cta--light group" href="#book-demo" id="hero-cta-demo">
                <span className="btn-arrow-left">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
                <span className="btn-text">Book A Demo</span>
                <span className="btn-arrow-right">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </a>
            </SmoothCorners>
          </div>

          <div className="hero-mockup-shell anim-fade-up" style={{ animationDelay: "0.7s" }}>
            <SmoothCorners className="hero-mockup-shell__frame" corners={{ radius: 16, smoothing: 0.6 }}>
              {/* macOS Window Controls */}
              <div className="hero-mockup-window-controls">
                <span className="hero-mockup-control-dot hero-mockup-control-dot--red" />
                <span className="hero-mockup-control-dot hero-mockup-control-dot--yellow" />
                <span className="hero-mockup-control-dot hero-mockup-control-dot--green" />
              </div>
              <div className="hero-mockup-window-capsule" aria-hidden="true" />
              <SmoothCorners className="hero-mockup-image-wrapper" corners={{ radius: 16, smoothing: 0.6 }}>
                <img
                  src={polishedDashboard}
                  alt="Creatorial brands dashboard mockup"
                  className="hero-mockup-image"
                  fetchPriority="high"
                  loading="eager"
                  width="1320"
                  height="820"
                />
              </SmoothCorners>
            </SmoothCorners>
          </div>
        </div>
      </section>

      <LogoCloud />
      <KeyFeatures />
      <ScaleUgc />
      <HowItWorks />
      <CreatorShowcase />
      <div className="ready-footer-wrap" data-theme="dark">
        <ReadyToScale />
        <Footer />
      </div>
    </main>
  );
}

export default App;
