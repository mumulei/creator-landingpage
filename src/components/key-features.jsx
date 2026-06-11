import React from 'react';

/* 引入动态三维地球组件 */
import { GlobeInteractive } from './ui/cobe-globe';
import AnimatedContent from './ui/AnimatedContent';
import { SmoothCorners } from '@lisse/react';

/* 从 Figma 导出的真实资源 */
import avatar1 from '../assets/features/avatar-1.png';
import avatar2 from '../assets/features/avatar-2.png';
import avatar3 from '../assets/features/avatar-3.png';
import pricingIcon1 from '../assets/features/pricing-icon-1.svg';
import pricingIcon2 from '../assets/features/pricing-icon-2.svg';
import pricingIcon3 from '../assets/features/pricing-icon-3.svg';
import iconYoutube from '../assets/features/icon-youtube.svg';
import iconFacebook from '../assets/features/icon-facebook.svg';
import iconInstagram from '../assets/features/icon-instagram.svg';
import iconTiktok from '../assets/features/icon-tiktok.svg';

const LocIcon = () => (
  <svg className="avatar-loc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.1665 6.76211C2.1665 3.4961 4.76985 0.833252 7.99984 0.833252C11.2298 0.833252 13.8332 3.4961 13.8332 6.76211C13.8332 8.33885 13.3838 10.0319 12.5895 11.4945C11.7961 12.9553 10.6369 14.2247 9.18684 14.9025C8.43355 15.2546 7.56613 15.2546 6.81283 14.9025C5.36275 14.2247 4.20358 12.9553 3.41021 11.4945C2.61586 10.0319 2.1665 8.33885 2.1665 6.76211ZM7.99984 1.83325C5.33879 1.83325 3.1665 4.03157 3.1665 6.76211C3.1665 8.16016 3.56826 9.69019 4.28897 11.0172C5.01066 12.3461 6.03052 13.433 7.23627 13.9966C7.72121 14.2233 8.27847 14.2233 8.76341 13.9966C9.96916 13.433 10.989 12.3461 11.7107 11.0172C12.4314 9.69019 12.8332 8.16016 12.8332 6.76211C12.8332 4.03157 10.6609 1.83325 7.99984 1.83325ZM7.99984 5.16659C7.17141 5.16659 6.49984 5.83816 6.49984 6.66659C6.49984 7.49501 7.17141 8.16659 7.99984 8.16659C8.82826 8.16659 9.49984 7.49501 9.49984 6.66659C9.49984 5.83816 8.82826 5.16659 7.99984 5.16659ZM5.49984 6.66659C5.49984 5.28587 6.61913 4.16659 7.99984 4.16659C9.38055 4.16659 10.4998 5.28587 10.4998 6.66659C10.4998 8.0473 9.38055 9.16659 7.99984 9.16659C6.61913 9.16659 5.49984 8.0473 5.49984 6.66659Z" fill="#7B7B7B"/>
  </svg>
);

export default function KeyFeatures() {
  return (
    <section className="key-features-section">
      <div className="key-features-container">
        <AnimatedContent distance={60} duration={1.0}>
          <header className="key-features-header">
            <h2>Key Features</h2>
            <p className="key-features-subtitle">
              Everything brands need to launch creator campaigns across markets.
            </p>
          </header>
        </AnimatedContent>

        <div className="key-features-grid">
          {/* Card 1: Built for cross-border growth */}
          <AnimatedContent className="feature-card-wrapper" delay={0.1} distance={80} duration={1.0}>
            <div className="feature-card-shell cross-border">
              {/* 基础背景层 */}
              <div className="feature-card-bg-wrapper base-layer">
                <SmoothCorners className="feature-card-bg-base" corners={{ radius: 16, smoothing: 0.6 }} />
              </div>
              {/* Hover 悬浮背景层 */}
              <div className="feature-card-bg-wrapper hover-layer">
                <SmoothCorners className="feature-card-bg-hover" corners={{ radius: 16, smoothing: 0.6 }} aria-hidden="true" />
              </div>
              {/* 内容层 */}
              <div className="feature-card-content-layer">
                <div className="feature-card__content">
                  <h3>Built for <strong>cross-border</strong> growth</h3>
                  <p>Brief, review, and manage campaigns in your own language while working seamlessly with overseas creators.</p>
                </div>
                <div className="feature-card__illustration feature-card__illustration--globe">
                  {/* 三维动态旋转地球背景 */}
                  <div className="globe-container">
                    <GlobeInteractive className="cobe-globe-canvas" />
                  </div>

                  {/* 3 个 Avatar 标签 — 与设计稿完全一致 */}
                  <div className="avatar-tag avatar-tag--1">
                    <img src={avatar1} alt="" className="avatar-img" width="44" height="44" />
                    <div className="avatar-info">
                      <span className="avatar-name">Arya</span>
                      <span className="avatar-loc"><LocIcon /> Texas, USA</span>
                    </div>
                  </div>

                  <div className="avatar-tag avatar-tag--2">
                    <img src={avatar2} alt="" className="avatar-img" width="44" height="44" />
                    <div className="avatar-info">
                      <span className="avatar-name">Alex</span>
                      <span className="avatar-loc"><LocIcon /> Peoria, AZ</span>
                    </div>
                  </div>

                  <div className="avatar-tag avatar-tag--3">
                    <img src={avatar3} alt="" className="avatar-img" width="44" height="44" />
                    <div className="avatar-info">
                      <span className="avatar-name">Drake</span>
                      <span className="avatar-loc"><LocIcon /> Paris, France</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* Card 2: Flexible pricing */}
          <AnimatedContent className="feature-card-wrapper" delay={0.25} distance={80} duration={1.0}>
            <div className="feature-card-shell pricing">
              {/* 基础背景层 */}
              <div className="feature-card-bg-wrapper base-layer">
                <SmoothCorners className="feature-card-bg-base" corners={{ radius: 16, smoothing: 0.6 }} />
              </div>
              {/* Hover 悬浮背景层 */}
              <div className="feature-card-bg-wrapper hover-layer">
                <SmoothCorners className="feature-card-bg-hover" corners={{ radius: 16, smoothing: 0.6 }} aria-hidden="true" />
              </div>
              {/* 内容层 */}
              <div className="feature-card-content-layer">
                <div className="feature-card__content">
                  <h3><strong>Flexible</strong> pricing</h3>
                  <p>Start with a single video or scale with a subscription. No minimum spend, long-term contracts, or bundled packages.</p>
                </div>
                <div className="feature-card__illustration feature-card__illustration--pricing">
                  <div className="pricing-bars">
                    <div className="pricing-bar pricing-bar--1">
                      <div className="pricing-bar__icon">
                        <span className="pricing-bar__icon-mask" style={{ '--mask-url': `url("${pricingIcon1}")` }}></span>
                      </div>
                    </div>
                    <div className="pricing-bar pricing-bar--2">
                      <div className="pricing-bar__icon">
                        <span className="pricing-bar__icon-mask" style={{ '--mask-url': `url("${pricingIcon2}")` }}></span>
                      </div>
                    </div>
                    <div className="pricing-bar pricing-bar--3">
                      <div className="pricing-bar__icon">
                        <span className="pricing-bar__icon-mask" style={{ '--mask-url': `url("${pricingIcon3}")` }}></span>
                      </div>
                    </div>
                  </div>
                  <div className="pricing-progress">
                    <span className="pricing-label">Start small</span>
                    <div className="pricing-track">
                      <div className="pricing-fill"></div>
                    </div>
                    <span className="pricing-label">Scale anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>

          {/* Card 3: Launch Campaigns Faster */}
          <AnimatedContent className="feature-card-wrapper" delay={0.4} distance={80} duration={1.0}>
            <div className="feature-card-shell speed">
              {/* 基础背景层 */}
              <div className="feature-card-bg-wrapper base-layer">
                <SmoothCorners className="feature-card-bg-base" corners={{ radius: 16, smoothing: 0.6 }} />
              </div>
              {/* Hover 悬浮背景层 */}
              <div className="feature-card-bg-wrapper hover-layer">
                <SmoothCorners className="feature-card-bg-hover" corners={{ radius: 16, smoothing: 0.6 }} aria-hidden="true" />
              </div>
              {/* 内容层 */}
              <div className="feature-card-content-layer">
                <div className="feature-card__content">
                  <h3>Launch Campaigns <strong>Faster</strong></h3>
                  <p>Reduce production bottlenecks and get launch-ready UGC delivered in as little as 10 days.</p>
                </div>
                <div className="feature-card__illustration feature-card__illustration--social">
                  {/* YouTube 卡片 — 最小，最顶部 */}
                  <div className="social-platform social-platform--yt">
                    <div className="social-platform__header">
                      <div className="social-platform__icon-wrap">
                        <img src={iconYoutube} alt="" className="social-platform__logo" />
                      </div>
                      <div className="social-platform__name-group">
                        <span className="social-platform__name">YouTube</span>
                        <span className="social-platform__sub">Global Video Sharing & Creator Hub</span>
                      </div>
                    </div>
                    <div className="social-platform__placeholder-bar" style={{ width: 170 }}></div>
                    <div className="social-platform__stats">
                      <div className="stat-pill stat-pill--active">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                        <span>36 active</span>
                      </div>
                      <div className="stat-pill">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 14"/></svg>
                        <span>12 pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Facebook 卡片 */}
                  <div className="social-platform social-platform--fb">
                    <div className="social-platform__header">
                      <div className="social-platform__icon-wrap">
                        <img src={iconFacebook} alt="" className="social-platform__logo" />
                      </div>
                      <div className="social-platform__name-group">
                        <span className="social-platform__name">Facebook</span>
                        <span className="social-platform__sub">Community & Social Networking</span>
                      </div>
                    </div>
                    <div className="social-platform__placeholder-bar" style={{ width: 220 }}></div>
                    <div className="social-platform__stats">
                      <div className="stat-pill stat-pill--active">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                        <span>54 active</span>
                      </div>
                      <div className="stat-pill">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 14"/></svg>
                        <span>8 pending</span>
                      </div>
                    </div>
                  </div>

                  {/* Instagram 卡片 */}
                  <div className="social-platform social-platform--ig">
                    <div className="social-platform__header">
                      <div className="social-platform__icon-wrap">
                        <img src={iconInstagram} alt="" className="social-platform__logo" />
                      </div>
                      <div className="social-platform__name-group">
                        <span className="social-platform__name">Instagram</span>
                        <span className="social-platform__sub">Visual Storytelling & Reels</span>
                      </div>
                    </div>
                    <div className="social-platform__placeholder-bar" style={{ width: 190 }}></div>
                    <div className="social-platform__stats">
                      <div className="stat-pill stat-pill--active">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                        <span>89 active</span>
                      </div>
                      <div className="stat-pill">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 14"/></svg>
                        <span>24 pending</span>
                      </div>
                    </div>
                  </div>

                  {/* TikTok 卡片 — 最大，最底部 */}
                  <div className="social-platform social-platform--tk">
                    <div className="social-platform__header">
                      <div className="social-platform__icon-wrap">
                        <img src={iconTiktok} alt="" className="social-platform__logo" />
                      </div>
                      <div className="social-platform__name-group">
                        <span className="social-platform__name">TikTok</span>
                        <span className="social-platform__sub">Short-Form Mobile Video Leader</span>
                      </div>
                    </div>
                    <div className="social-platform__placeholder-bar" style={{ width: 260 }}></div>
                    <div className="social-platform__stats">
                      <div className="stat-pill stat-pill--active">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                        <span>142 active</span>
                      </div>
                      <div className="stat-pill">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6V12L16 14"/></svg>
                        <span>45 pending</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </AnimatedContent>

        </div>
      </div>
    </section>
  );
}
