import React from 'react';
import { SmoothCorners } from '@lisse/react';
import AnimatedContent from './ui/AnimatedContent';

import icon1 from '../assets/features/how-icon-1.svg';
import icon2 from '../assets/features/how-icon-2.svg';
import icon3 from '../assets/features/how-icon-3.svg';
import icon4_1 from '../assets/features/how-icon-4-1.svg';
import icon4_2 from '../assets/features/how-icon-4-2.svg';

const STEPS = [
  {
    title: 'Set Up Your Brand',
    description: 'Create your brand profile and manage all your requests. Everything in one place.',
    videoSrc: '/step_1_compressed.mp4',
    cardBg: '#fdf2f8',
    iconBg: '#f20093',
  },
  {
    title: 'Launch a Request',
    description: 'Post what you need — country, language, content. Creators apply, or invite ones you like directly. Review, then approve your lineup.',
    videoSrc: '/step_2_compressed.mp4',
    cardBg: '#ecf4fe',
    iconBg: '#4797f6',
  },
  {
    title: 'Stay in the Loop',
    description: 'Message creators, share references, and track progress. All on the platform.',
    videoSrc: '/step_3_compressed.mp4',
    cardBg: '#faf3fe',
    iconBg: '#a13ef1',
  },
  {
    title: 'Approve & Download',
    description: "Happy with submitted content? Approve, download your assets, and publish whenever you're ready.",
    videoSrc: '/step_4_compressed.mp4',
    cardBg: '#fefce6',
    iconBg: '#f0af30',
  },
];

const renderIcon = (index) => {
  if (index === 0) return <img src={icon1} className="how-icon-img" alt="" />;
  if (index === 1) return <img src={icon2} className="how-icon-img" alt="" />;
  if (index === 2) return <img src={icon3} className="how-icon-img" alt="" />;
  if (index === 3) {
    return (
      <div className="how-icon-multi">
        <img src={icon4_1} className="how-icon-img-part1" alt="" />
        <img src={icon4_2} className="how-icon-img-part2" alt="" />
      </div>
    );
  }
  return null;
};

export default function HowItWorks() {
  return (
    <section className="how-works-section" id="how-it-works">
      <AnimatedContent className="how-header-container">
        <h2 className="how-title">How it works ?</h2>
        <p className="how-subtitle">From brief to content, without the chaos.</p>
      </AnimatedContent>
      <div className="how-steps-list">
        {STEPS.map((item, index) => (
          <AnimatedContent key={index} delay={0.1 + index * 0.15}>
            <div className="how-step-card-shell how-card-visible">
              <SmoothCorners 
                className="how-step-card" 
                corners={{ radius: 24, smoothing: 0.6 }}
                style={{ backgroundColor: item.cardBg }}
              >
                <div className="how-text-content">
                  {/* 彩色圆角图标容器 */}
                  <SmoothCorners 
                    className="how-icon-container" 
                    corners={{ radius: 20, smoothing: 0.6 }}
                    style={{ backgroundColor: item.iconBg }}
                  >
                    {renderIcon(index)}
                  </SmoothCorners>
                  <h3 className="how-step-title">{item.title}</h3>
                  <p className="how-step-desc">{item.description}</p>
                </div>
                
                {/* 右侧大图带白边框（换成视频） */}
                <div className="how-image-wrapper">
                  <div className="how-img-border-box">
                    <video 
                      src={item.videoSrc} 
                      className="how-step-video" 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    />
                  </div>
                </div>
              </SmoothCorners>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
