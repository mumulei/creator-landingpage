import React from 'react';

/* 从 Figma 导出的真实资源 */
import worldMapDots from '../assets/features/world-map-dots.svg';
import image19Vectorized from '../assets/features/image19-vectorized.svg';
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

export default function KeyFeatures() {
  return (
    <section className="key-features-section">
      <div className="key-features-container">
        <header className="key-features-header">
          <h2>Key Features</h2>
        </header>

        <div className="key-features-grid">
          {/* Card 1: Built for cross-border growth */}
          <div className="feature-card feature-card--cross-border">
            <div className="feature-card__content">
              <h3>Built for <strong>cross-border</strong> growth</h3>
              <p>Brief, review, and manage campaigns in your own language while working seamlessly with overseas creators.</p>
            </div>
            <div className="feature-card__illustration feature-card__illustration--map">
              {/* 世界地图点阵背景 */}
              <div className="map-layer">
                <img src={worldMapDots} alt="" className="map-dots-svg" aria-hidden="true" />
              </div>
              {/* 白色渐变遮罩（上白-中透明-下白） */}
              <div className="map-gradient-overlay"></div>
              {/* image 19 vectorized 叠加层 */}
              <img src={image19Vectorized} alt="" className="map-vectorized-overlay" aria-hidden="true" />

              {/* 3 个 Avatar 标签 — 与设计稿完全一致 */}
              <div className="avatar-tag avatar-tag--1">
                <img src={avatar1} alt="" className="avatar-img" width="44" height="44" />
                <div className="avatar-info">
                  <span className="avatar-name">艾莉亚</span>
                  <span className="avatar-loc">From the United States</span>
                </div>
              </div>

              <div className="avatar-tag avatar-tag--2">
                <img src={avatar2} alt="" className="avatar-img" width="44" height="44" />
                <div className="avatar-info">
                  <span className="avatar-name">艾莉亚</span>
                  <span className="avatar-loc">From the United States</span>
                </div>
              </div>

              <div className="avatar-tag avatar-tag--3">
                <img src={avatar3} alt="" className="avatar-img" width="44" height="44" />
                <div className="avatar-info">
                  <span className="avatar-name">艾莉亚</span>
                  <span className="avatar-loc">From the United States</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Flexible pricing */}
          <div className="feature-card feature-card--pricing">
            <div className="feature-card__content">
              <h3><strong>Flexible</strong> pricing</h3>
              <p>Start with a single video or scale with a subscription. No minimum spend, long-term contracts, or bundled packages.</p>
            </div>
            <div className="feature-card__illustration feature-card__illustration--pricing">
              <div className="pricing-bars">
                <div className="pricing-bar pricing-bar--1">
                  <div className="pricing-bar__icon">
                    <img src={pricingIcon1} alt="" width="32" height="32" />
                  </div>
                </div>
                <div className="pricing-bar pricing-bar--2">
                  <div className="pricing-bar__icon">
                    <img src={pricingIcon2} alt="" width="32" height="32" />
                  </div>
                </div>
                <div className="pricing-bar pricing-bar--3">
                  <div className="pricing-bar__icon">
                    <img src={pricingIcon3} alt="" width="32" height="32" />
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

          {/* Card 3: Launch Campaigns Faster */}
          <div className="feature-card feature-card--speed">
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
                  <div className="stat-pill stat-pill--total">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span>100 total</span>
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
                    <span className="social-platform__sub">Social Network & Community Marketing</span>
                  </div>
                </div>
                <div className="social-platform__placeholder-bar" style={{ width: 188 }}></div>
                <div className="social-platform__stats">
                  <div className="stat-pill stat-pill--active">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                    <span>36 active</span>
                  </div>
                  <div className="stat-pill stat-pill--total">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span>100 total</span>
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
                    <span className="social-platform__sub">Visual Content & Influencer Hub</span>
                  </div>
                </div>
                <div className="social-platform__placeholder-bar" style={{ width: 204 }}></div>
                <div className="social-platform__stats">
                  <div className="stat-pill stat-pill--active">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                    <span>36 active</span>
                  </div>
                  <div className="stat-pill stat-pill--total">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span>100 total</span>
                  </div>
                </div>
              </div>

              {/* TikTok 卡片 — 最大，最底部 */}
              <div className="social-platform social-platform--tt">
                <div className="social-platform__header">
                  <div className="social-platform__icon-wrap">
                    <img src={iconTiktok} alt="" className="social-platform__logo" />
                  </div>
                  <div className="social-platform__name-group">
                    <span className="social-platform__name">Tiktok</span>
                    <span className="social-platform__sub">Digital Entertainment Marketing Business</span>
                  </div>
                </div>
                <div className="social-platform__placeholder-bar" style={{ width: 220 }}></div>
                <div className="social-platform__stats">
                  <div className="stat-pill stat-pill--active">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14H12L11 22L21 10H12L13 2Z"/></svg>
                    <span>36 Active</span>
                  </div>
                  <div className="stat-pill stat-pill--total">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                    <span>100 Total</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
