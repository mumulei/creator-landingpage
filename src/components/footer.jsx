import React from 'react';
import './footer.css';
import brandLogo from '../assets/local-logos/brand-logo.svg';
import iconFacebook from '../assets/features/icon-facebook.svg';
import iconInstagram from '../assets/features/icon-instagram.svg';
import iconTiktok from '../assets/features/icon-tiktok.svg';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* 上半部分 */}
        <div className="footer-top">
          {/* 左侧 Logo + 介绍 */}
          <div className="footer-brand-info">
            <div className="footer-logo-wrapper">
              <img src={brandLogo} alt="Creatorial Logo" className="footer-logo" />
            </div>
            <p className="footer-description">
              Your trusted partner for cross-border creativity and culturally relevant UGC content.
            </p>
          </div>

          {/* 右侧 三列导航 */}
          <div className="footer-links-grid">
            {/* 第一列 Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title">Contact Information</h4>
              <ul className="footer-col-links">
                <li><a href="mailto:support@creatorial.com">support@creatorial.com</a></li>
              </ul>
            </div>

            {/* 第二列 Company */}
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-col-links">
                <li><a href="#about-us">About Us</a></li>
                <li><a href="#contact-us">Contact Us</a></li>
              </ul>
            </div>

            {/* 第三列 Legal */}
            <div className="footer-col">
              <h4 className="footer-col-title">Legal</h4>
              <ul className="footer-col-links">
                <li><a href="#terms">Terms of use</a></li>
                <li><a href="#privacy">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="footer-divider" />

        {/* 下半部分 */}
        <div className="footer-bottom">
          {/* 左下角：社交媒体图标 */}
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <img src={iconFacebook} alt="Facebook" className="footer-social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <img src={iconInstagram} alt="Instagram" className="footer-social-icon" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <img src={iconTiktok} alt="TikTok" className="footer-social-icon" />
            </a>
          </div>

          {/* 右下角版权 */}
          <p className="footer-copyright">©️2026 Creatorial. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
