import React, { useState, useEffect } from 'react';
import creator1 from '../assets/features/ugc-creator-1.png';
import creator2 from '../assets/features/ugc-creator-2.png';
import creator3 from '../assets/features/ugc-creator-3.png';
import creator4 from '../assets/features/ugc-creator-4.png';
import creator5 from '../assets/features/ugc-creator-5.png';

// 创作者卡片及标签数据
const CARDS = [
  {
    id: 0,
    label: 'Art',
    image: creator1,
    creatorName: '@alex_creative',
    views: '128.4K',
  },
  {
    id: 1,
    label: 'Explore',
    image: creator2,
    creatorName: '@explorer_sam',
    views: '95.2K',
  },
  {
    id: 2,
    label: 'Solo Acting',
    image: creator3,
    creatorName: '@mia_acting',
    views: '350.1K',
  },
  {
    id: 3,
    label: 'Sports',
    image: creator4,
    creatorName: '@tyler_athletics',
    views: '210.8K',
  },
  {
    id: 4,
    label: 'Nature',
    image: creator5,
    creatorName: '@lucy_outdoors',
    views: '88.3K',
  },
];

export default function CustomizeUgc() {
  const [activeIndex, setActiveIndex] = useState(2); // 默认聚焦 Solo Acting (索引为 2)
  const [mutedStates, setMutedStates] = useState({ 0: true, 1: true, 2: true, 3: true, 4: true });

  // 自动轮播逻辑 (5秒切换一次，鼠标悬停时暂停)
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMuteToggle = (e, id) => {
    e.stopPropagation(); // 阻止卡片点击切换事件
    setMutedStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 根据当前 activeIndex 计算每个卡片的相对位置 class
  const getCardClass = (index) => {
    const diff = (index - activeIndex + CARDS.length) % CARDS.length;
    if (diff === 0) return 'ugc-card-active';
    if (diff === 1) return 'ugc-card-right-1';
    if (diff === 2) return 'ugc-card-right-2';
    if (diff === 3) return 'ugc-card-left-2';
    if (diff === 4) return 'ugc-card-left-1';
    return '';
  };

  return (
    <section className="customize-ugc-section" id="customize-ugc">
      {/* 头部标题区 */}
      <div className="ugc-header-container">
        <h2 className="ugc-title">Customize a Diverse Range of UGC</h2>
        <p className="ugc-subtitle">
          Customize UGC to meet the needs of various briefs and brands.
        </p>
      </div>

      {/* 轮播容器区 */}
      <div 
        className="ugc-carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="ugc-cards-wrapper">
          {CARDS.map((card, index) => {
            const cardClass = getCardClass(index);
            const isActive = index === activeIndex;
            const isMuted = mutedStates[card.id];

            return (
              <div
                key={card.id}
                className={`ugc-carousel-card ${cardClass}`}
                onClick={() => setActiveIndex(index)}
              >
                {/* 创作者图片背景 */}
                <div className="ugc-card-img-holder">
                  <img src={card.image} alt={card.label} className="ugc-card-image" />
                  
                  {/* 半透明暗底遮罩 */}
                  <div className="ugc-card-overlay"></div>

                  {/* 悬浮装饰：创作者名字和播放量 */}
                  <div className="ugc-card-meta">
                    <span className="ugc-meta-name">{card.creatorName}</span>
                    <span className="ugc-meta-views">{card.views} views</span>
                  </div>

                  {/* 聚焦卡片显示的高级播放装饰 */}
                  {isActive && (
                    <>
                      <div className="ugc-play-button-center">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                      </div>

                      {/* 右上角静音开关 */}
                      <button 
                        className="ugc-mute-toggle"
                        onClick={(e) => handleMuteToggle(e, card.id)}
                        aria-label="Toggle mute"
                      >
                        {isMuted ? (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        )}
                      </button>

                      {/* 底部精细播放进度条 */}
                      <div className="ugc-card-progressbar">
                        <div className="ugc-progressbar-fill"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部关联文本标签导航 */}
        <div className="ugc-tabs-navigation">
          {CARDS.map((card, index) => (
            <button
              key={card.id}
              className={`ugc-tab-btn ${index === activeIndex ? 'ugc-tab-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {card.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
