import { T } from '../i18n/locale';
import './footer.css';
import logoTop from '../assets/footer/logo-top.svg';
import logoBottom from '../assets/footer/logo-bottom.svg';
import iconInstagram from '../assets/footer/instagram.svg';
import iconTiktok from '../assets/footer/tiktok.svg';
import iconLinkedin from '../assets/footer/linkedin.svg';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* 上半部分 */}
        <div className="footer-top">
          {/* 左侧 Logo + 介绍 */}
          <div className="footer-brand-info">
            <div className="footer-logo-wrapper">
              <span className="footer-logo" role="img" aria-label="Creatorial Logo"><img className="footer-logo-top" src={logoTop} alt="" /><img className="footer-logo-bottom" src={logoBottom} alt="" /></span>
            </div>
            <p className="footer-description"><T>{"Your trusted partner for cross-border creativity and culturally relevant UGC content."}</T></p>
          </div>

          {/* 右侧 三列导航 */}
          <div className="footer-links-grid">
            {/* 第一列 Contact */}
            <div className="footer-col">
              <h4 className="footer-col-title"><T>{"Contact Information"}</T></h4>
              <ul className="footer-col-links">
                <li><a href="mailto:support@creatorial.com">support@creatorial.com</a></li>
              </ul>
            </div>

            {/* 第二列 Company */}
            <div className="footer-col">
              <h4 className="footer-col-title"><T>{"Company"}</T></h4>
              <ul className="footer-col-links">
                <li><a href="#about-us"><T>{"About Us"}</T></a></li>
                <li><a href="#contact-us"><T>{"Contact Us"}</T></a></li>
              </ul>
            </div>

            {/* 第三列 Legal */}
            <div className="footer-col">
              <h4 className="footer-col-title"><T>{"Legal"}</T></h4>
              <ul className="footer-col-links">
                <li><a href="#terms"><T>{"Terms of use"}</T></a></li>
                <li><a href="#privacy"><T>{"Privacy"}</T></a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 分割线 */}

        {/* 下半部分 */}
        <div className="footer-bottom">
          {/* 左下角：社交媒体图标 */}
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <img src={iconInstagram} alt="Instagram" className="footer-social-icon" />
            </a>
            <span className="footer-social-divider" aria-hidden="true">/</span>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <img src={iconTiktok} alt="TikTok" className="footer-social-icon" />
            </a>
            <span className="footer-social-divider" aria-hidden="true">/</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <img src={iconLinkedin} alt="LinkedIn" className="footer-social-icon" />
            </a>
          </div>

          {/* 右下角版权 */}
          <p className="footer-copyright"><T>{"© 2026 Creatorial. All rights reserved."}</T></p>
        </div>
      </div>
    </footer>
  );
}
