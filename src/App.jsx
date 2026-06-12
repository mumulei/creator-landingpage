import { useState, useEffect, useCallback } from "react";
import BlindsAuroraBackground from "./components/blinds-aurora-background.jsx";
import polishedDashboard from "./assets/Brands.png";
import brandLogo from "./assets/local-logos/brand-logo.svg";
import LogoCloud from "./components/logo-cloud.jsx";
import KeyFeatures from "./components/key-features.jsx";
import HowItWorks from "./components/how-it-works.jsx";
import CustomizeUgc from "./components/customize-ugc.jsx";
import ScaleUgc from "./components/scale-ugc.jsx";
import CreatorShowcase from "./components/creator-showcase.jsx";
import ReadyToScale from "./components/ready-to-scale.jsx";
import AnimatedContent from "./components/ui/AnimatedContent.jsx";
import GradualBlur from "./components/GradualBlur.jsx";
import { SmoothCorners } from '@lisse/react';

// Avatar and Creator imports for Hero stats badge
import avatar1 from "./assets/features/avatar-1.png";
import avatar2 from "./assets/features/avatar-2.png";
import avatar3 from "./assets/features/avatar-3.png";
import creator1 from "./assets/features/ugc-creator-1.png";
import creator2 from "./assets/features/ugc-creator-2.png";


const navItems = ["Home", "About Us", "Creator Library", "Pricing"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  /* 导航栏滚动检测：滚动超过 32px 后添加 scrolled 状态，同时检测深色区块 */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);

      // Check all elements that explicitly define a theme
      const themedElements = document.querySelectorAll('[data-theme]');
      let currentDark = false;
      const headerCenterY = 44; // middle of the 88px topbar
      
      themedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Check if the center of the header falls within this element's vertical bounds
        if (rect.top <= headerCenterY && rect.bottom >= headerCenterY) {
          if (el.getAttribute('data-theme') === 'dark') {
            currentDark = true;
          } else if (el.getAttribute('data-theme') === 'light') {
            currentDark = false;
          }
        }
      });
      setIsDarkTheme(currentDark);
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 移动菜单展开时禁止背景滚动 */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <main className="paico-page">
      <BlindsAuroraBackground />

      <header
        className={`topbar${scrolled ? " topbar--scrolled" : ""}${isDarkTheme ? " topbar--dark" : ""}`}
        id="topbar"
      >
        <GradualBlur
          target="parent"
          position="top"
          height="5.5rem"
          strength={2}
          divCount={7}
          curve="bezier"
          zIndex={-1}
        />
        <a className="brand" href="/" aria-label="Paico AI home">
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
          <a className="solid-link solid-link--magenta" href="#get-started" id="nav-cta">
            Get Started
          </a>
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
            <span className="anim-fade-up" style={{ animationDelay: "0.1s" }}>
              Turn UGC Into Your
            </span>
            <span className="anim-fade-up" style={{ animationDelay: "0.2s" }}>
              Best-Performing Ads
            </span>
          </h1>

          {/* Statistics Badge Row */}
          <div className="hero-stats-row anim-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="hero-stats-avatars">
              <img src={avatar1} alt="" className="hero-stats-avatar" />
              <img src={avatar2} alt="" className="hero-stats-avatar" />
              <img src={avatar3} alt="" className="hero-stats-avatar" />
              <img src={creator1} alt="" className="hero-stats-avatar" />
              <img src={creator2} alt="" className="hero-stats-avatar" />
            </div>
            <span className="hero-stats-text">10K+ Creators Onboard</span>
            <div className="hero-stats-divider" aria-hidden="true" />
            <span className="hero-stats-text">1K+ Videos Delivered</span>
          </div>

          <p className="hero-body anim-fade-up" style={{ animationDelay: "0.4s" }}>
            High-performing UGC that drives real growth.
            <br />
            Pay as you go or subscribe, with vetted creators and full usage
            rights from the start.
          </p>

          <div className="hero-cta-row anim-fade-up" style={{ animationDelay: "0.55s" }}>
            <a className="hero-cta hero-cta--dark" href="#get-started" id="hero-cta-start">
              Get Started
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_39517_10179)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.0883 9.41086C13.2445 9.56713 13.3323 9.77906 13.3323 10C13.3323 10.221 13.2445 10.4329 13.0883 10.5892L8.37415 15.3034C8.29727 15.383 8.20532 15.4464 8.10365 15.4901C8.00198 15.5338 7.89263 15.5568 7.78198 15.5577C7.67133 15.5587 7.5616 15.5376 7.45919 15.4957C7.35677 15.4538 7.26373 15.3919 7.18548 15.3137C7.10724 15.2354 7.04536 15.1424 7.00346 15.04C6.96156 14.9376 6.94048 14.8278 6.94144 14.7172C6.9424 14.6065 6.96539 14.4972 7.00906 14.3955C7.05274 14.2939 7.11622 14.2019 7.19581 14.125L11.3208 10L7.19581 5.87503C7.04401 5.71786 6.96002 5.50736 6.96192 5.28886C6.96382 5.07036 7.05146 4.86135 7.20596 4.70685C7.36047 4.55234 7.56948 4.4647 7.78798 4.4628C8.00648 4.4609 8.21698 4.5449 8.37415 4.6967L13.0883 9.41086Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_39517_10179">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a className="hero-cta hero-cta--light" href="#book-demo" id="hero-cta-demo">
              Book A Demo
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_39517_10180)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.0883 9.41086C13.2445 9.56713 13.3323 9.77906 13.3323 10C13.3323 10.221 13.2445 10.4329 13.0883 10.5892L8.37415 15.3034C8.29727 15.383 8.20532 15.4464 8.10365 15.4901C8.00198 15.5338 7.89263 15.5568 7.78198 15.5577C7.67133 15.5587 7.5616 15.5376 7.45919 15.4957C7.35677 15.4538 7.26373 15.3919 7.18548 15.3137C7.10724 15.2354 7.04536 15.1424 7.00346 15.04C6.96156 14.9376 6.94048 14.8278 6.94144 14.7172C6.9424 14.6065 6.96539 14.4972 7.00906 14.3955C7.05274 14.2939 7.11622 14.2019 7.19581 14.125L11.3208 10L7.19581 5.87503C7.04401 5.71786 6.96002 5.50736 6.96192 5.28886C6.96382 5.07036 7.05146 4.86135 7.20596 4.70685C7.36047 4.55234 7.56948 4.4647 7.78798 4.4628C8.00648 4.4609 8.21698 4.5449 8.37415 4.6967L13.0883 9.41086Z" fill="currentColor"/>
                </g>
                <defs>
                  <clipPath id="clip0_39517_10180">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
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
      <HowItWorks />
      <CustomizeUgc />
      <ScaleUgc />
      <CreatorShowcase />
      <ReadyToScale />
      
      {/* 
        Scroll boundary buffer / Features section placeholder
        用于彻底远离首屏的 WebGL GPU 边界冲突区，采用无描边、无分割线的极简设计，与白色背景融为一体
      */}
      <AnimatedContent className="reveal-container scroll-buffer-section">
        <h2 className="scroll-buffer-title anim-fade-up" style={{ animationDelay: "0.1s" }}>More Features Coming Soon</h2>
        <p className="scroll-buffer-text anim-fade-up" style={{ animationDelay: "0.25s" }}>We are continuously expanding the creator library and campaign tools.</p>
      </AnimatedContent>
    </main>
  );
}

export default App;
