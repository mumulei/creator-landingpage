import React from 'react';
import { SmoothCorners } from '@lisse/react';
import AnimatedContent from './ui/AnimatedContent';

export default function ReadyToScale() {
  return (
    <section className="ready-scale-section" id="ready-to-scale">
      <div className="ready-scale-container">
        <AnimatedContent scale={0.95} distance={50} delay={0.1}>
          <div className="ready-scale-content">
            {/* 大标题 */}
            <h2 className="ready-scale-title">Ready to scale your UGC?</h2>
            
            {/* 副标题 */}
            <p className="ready-scale-subtitle">
              Connect with creators that get your brand.<br />
              Take your business to the next level.
            </p>

            {/* 两个48px高圆角药丸形按钮并排 */}
            <div className="ready-scale-buttons">
              <a href="#get-started" className="ready-btn ready-btn-primary group">
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

              <a href="#book-demo" className="ready-btn ready-btn-secondary group">
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
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

