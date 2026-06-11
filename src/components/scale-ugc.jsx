import React, { useState } from 'react';
import AnimatedContent from './ui/AnimatedContent';
import { SmoothCorners } from '@lisse/react';

import icon1 from '../assets/features/scale-icon-1.svg';
import icon2 from '../assets/features/scale-icon-2.svg';
import icon3 from '../assets/features/scale-icon-3.svg';

// 三栏卡片数据配置
const MARKET_CARDS = [
  {
    title: 'Operate in your language, launch in theirs',
    description: "Brief, review, and manage everything in your own language. We'll handle the rest.",
    icon: <img src={icon1} alt="" width="60" height="60" className="scale-card-icon" />,
  },
  {
    title: 'Creators who understand your market',
    description: 'Authentic content from creators who understand the local culture and consumers.',
    icon: <img src={icon3} alt="" width="60" height="60" className="scale-card-icon" />,
  },
  {
    title: 'Cross-Border Expansion Made Simple',
    description: 'Payments, compliance, content rights, and creator coordination, handled in one platform.',
    icon: <img src={icon2} alt="" width="60" height="60" className="scale-card-icon" />,
  },
];

const ScaleMarketCard = ({ card }) => {
  return (
    <div className="scale-market-card-shell">
      {/* 基础状态背景 */}
      <div className="scale-card-bg-wrapper base-layer">
        <SmoothCorners 
          className="scale-card-bg-base" 
          corners={{ radius: 16, smoothing: 0.6 }} 
        />
      </div>
      
      {/* Hover 状态背景与阴影边框 */}
      <div className="scale-card-bg-wrapper hover-layer">
        <SmoothCorners 
          className="scale-card-bg-hover" 
          corners={{ radius: 16, smoothing: 0.6 }} 
          aria-hidden="true"
        />
      </div>
      {/* 实际内容层 */}
      <div className="scale-market-card-content">
        <div className="scale-card-top">
          <h3 className="scale-card-title">{card.title}</h3>
          {card.icon}
        </div>
        <p className="scale-card-desc">{card.description}</p>
      </div>
    </div>
  );
};

export default function ScaleUgc() {
  return (
    <section className="scale-ugc-section" id="scale-ugc">
      <div className="scale-ugc-container">
        {/* 头部区域 */}
        <AnimatedContent className="scale-header-container">
          <h2 className="scale-title">Scale UGC across markets</h2>
        </AnimatedContent>

        {/* 三栏卡片网格 */}
        <div className="scale-cards-grid">
          {MARKET_CARDS.map((card, index) => (
            <AnimatedContent key={index} delay={0.1 + index * 0.15}>
              <ScaleMarketCard card={card} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
