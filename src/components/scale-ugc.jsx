import React from 'react';

// 三栏卡片数据配置
const MARKET_CARDS = [
  {
    title: 'Operate in your language, launch in theirs',
    description: "Brief, review, and manage everything in your own language. We'll handle the rest.",
    featured: true, // 第一个卡片是白底带细描边的特色卡片
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Creators who understand your market',
    description: 'Authentic content from creators who understand the local culture and consumers.',
    featured: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Cross-Border Expansion Made Simple',
    description: 'Payments, compliance, content rights, and creator coordination, handled in one platform.',
    featured: false,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function ScaleUgc() {
  return (
    <section className="scale-ugc-section" id="scale-ugc">
      {/* 头部区域 */}
      <div className="scale-header-container">
        <h2 className="scale-title">Scale UGC across markets</h2>
      </div>

      {/* 三栏卡片网格 */}
      <div className="scale-cards-grid">
        {MARKET_CARDS.map((card, index) => (
          <div
            key={index}
            className={`scale-market-card ${card.featured ? 'scale-card-featured' : 'scale-card-normal'}`}
          >
            {/* 卡片顶部：文案标题 + 右上角线性矢量Icon */}
            <div className="scale-card-top">
              <h3 className="scale-card-title">{card.title}</h3>
              <div className="scale-card-icon-wrapper">
                {card.icon}
              </div>
            </div>
            
            {/* 卡片下半部：详细说明文案 */}
            <p className="scale-card-desc">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
