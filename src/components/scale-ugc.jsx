import React, { useState } from 'react';
import AnimatedContent from './ui/AnimatedContent';
import { SmoothCorners } from '@lisse/react';

import headerIcon1 from '../assets/features/scale-header-icon-1.svg';
import decorSmall1 from '../assets/features/scale-decor-small-1.svg';
import decorLarge1 from '../assets/features/scale-decor-large-1.svg';

import headerIcon2 from '../assets/features/scale-header-icon-2.svg';
import decorSmall2 from '../assets/features/scale-decor-small-2.svg';
import decorLarge2 from '../assets/features/scale-decor-large-2.svg';

import headerIcon3 from '../assets/features/scale-header-icon-3.svg';
import decorSmall3 from '../assets/features/scale-decor-small-3.svg';
import decorLarge3 from '../assets/features/scale-decor-large-3.svg';

const MARKET_CARDS = [
  {
    title: 'Operate in your language, launch in theirs',
    description: "Brief, review, and manage everything in your own language. We'll handle the rest.",
    headerIcon: headerIcon1,
    decorSmall: decorSmall1,
    decorLarge: decorLarge1,
  },
  {
    title: 'Creators who understand your market',
    description: 'Authentic content from creators who understand the local culture and consumers.',
    headerIcon: headerIcon2,
    decorSmall: decorSmall2,
    decorLarge: decorLarge2,
  },
  {
    title: 'Cross-Border Expansion Made Simple',
    description: 'Payments, compliance, content rights, and creator coordination, handled in one platform.',
    headerIcon: headerIcon3,
    decorSmall: decorSmall3,
    decorLarge: decorLarge3,
  },
];

const ScaleMarketCard = ({ card }) => {
  return (
    <div className="scale-market-card-shell">
      {/* 基础状态背景 */}
      <div className="scale-card-bg-wrapper base-layer">
        <SmoothCorners 
          className="scale-card-bg-base" 
          corners={{ radius: 24, smoothing: 0.6 }} 
        />
      </div>
      
      {/* Hover 状态背景与阴影边框 */}
      <div className="scale-card-bg-wrapper hover-layer">
        <SmoothCorners 
          className="scale-card-bg-hover" 
          corners={{ radius: 24, smoothing: 0.6 }} 
          aria-hidden="true"
        />
      </div>
      {/* 实际内容层 */}
      <div className="scale-market-card-content">
        <div className="scale-card-header">
          <img src={card.headerIcon} className="scale-card-header-icon" alt="" />
          <h3 className="scale-card-title">{card.title}</h3>
        </div>
        <p className="scale-card-desc">{card.description}</p>
      </div>

      {/* 装饰图形 */}
      <img src={card.decorSmall} className="scale-decor-small" alt="" />
      <img src={card.decorLarge} className="scale-decor-large" alt="" />
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
