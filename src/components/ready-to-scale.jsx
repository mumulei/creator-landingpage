import React from 'react';

export default function ReadyToScale() {
  return (
    <section className="ready-scale-section" id="ready-to-scale">
      <div className="ready-scale-container">
        <div className="ready-scale-content">
          {/* 大标题 */}
          <h2 className="ready-scale-title">Ready to scale your UGC?</h2>
          
          {/* 副标题 */}
          <p className="ready-scale-subtitle">
            Connect with creators that get your brand. Take your business to the next level.
          </p>

          {/* 两个48px高圆角药丸形按钮并排 */}
          <div className="ready-scale-buttons">
            <a href="#get-started" className="ready-btn ready-btn-primary">
              <span>Get Started</span>
              <span className="ready-btn-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>

            <a href="#book-demo" className="ready-btn ready-btn-secondary">
              <span>Book a Demo</span>
              <span className="ready-btn-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
