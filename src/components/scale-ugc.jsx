import React from 'react';
import AnimatedContent from './ui/AnimatedContent';

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
              <div className="scale-market-card">
                {/* 卡片顶部：文案标题 + 右上角线性矢量Icon */}
                <div className="scale-card-top">
                  <h3 className="scale-card-title">{card.title}</h3>
                  {card.icon}
                </div>
                
                {/* 卡片下半部：详细说明文案 */}
                <p className="scale-card-desc">{card.description}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
