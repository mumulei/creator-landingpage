import React, { useState, useEffect } from 'react';
import AnimatedContent from './ui/AnimatedContent';
import creator1 from '../assets/features/ugc-creator-1.png';
import creator2 from '../assets/features/ugc-creator-2.png';
import creator3 from '../assets/features/ugc-creator-3.png';
import creator4 from '../assets/features/ugc-creator-4.png';
import creator5 from '../assets/features/ugc-creator-5.png';

// 创作者视频展示数据
const SHOWCASE_CARDS = [
  {
    id: 10,
    label: 'Vlog',
    image: creator4,
    platform: 'TikTok Ad',
    creator: '@jenny_vlogs',
    ctr: '3.4% CTR',
  },
  {
    id: 11,
    label: 'Unboxing',
    image: creator5,
    platform: 'Instagram Reel',
    creator: '@unboxing_pro',
    ctr: '4.1% CTR',
  },
  {
    id: 12,
    label: 'Review',
    image: creator1,
    platform: 'YouTube Short',
    creator: '@tech_reviewer',
    ctr: '5.2% CTR',
  },
  {
    id: 13,
    label: 'Gaming',
    image: creator2,
    platform: 'TikTok Ad',
    creator: '@gamer_chase',
    ctr: '2.9% CTR',
  },
  {
    id: 14,
    label: 'Tutorial',
    image: creator3,
    platform: 'Instagram Reel',
    creator: '@makeups_julia',
    ctr: '4.8% CTR',
  },
];

export default function CreatorShowcase() {
  const [activeIndex, setActiveIndex] = useState(2); // 默认聚焦中间的 Review (索引为 2)
  const [mutedStates, setMutedStates] = useState({ 10: true, 11: true, 12: true, 13: true, 14: true });

  // 自动轮播 (5.5 秒切换一次)
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_CARDS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleMuteToggle = (e, id) => {
    e.stopPropagation();
    setMutedStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 计算相对位置 Class
  const getCardClass = (index) => {
    const diff = (index - activeIndex + SHOWCASE_CARDS.length) % SHOWCASE_CARDS.length;
    if (diff === 0) return 'showcase-card-active';
    if (diff === 1) return 'showcase-card-right-1';
    if (diff === 2) return 'showcase-card-right-2';
    if (diff === 3) return 'showcase-card-left-2';
    if (diff === 4) return 'showcase-card-left-1';
    return '';
  };

  return (
    <section className="creator-showcase-section" id="creator-showcase">
      {/* 头部标题区 */}
      {/* 头部标题区 */}
      <AnimatedContent className="showcase-header-container">
        <h2 className="showcase-title">Creator Video Showcase</h2>
        <p className="showcase-subtitle">
          Discover creator styles to combine for video variety.
        </p>
      </AnimatedContent>

      {/* 轮播容器区 */}
      <AnimatedContent 
        delay={0.2} 
        distance={50}
        className="showcase-carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="showcase-cards-wrapper">
          {SHOWCASE_CARDS.map((card, index) => {
            const cardClass = getCardClass(index);
            const isActive = index === activeIndex;
            const isMuted = mutedStates[card.id];

            return (
              <div
                key={card.id}
                className={`showcase-carousel-card ${cardClass}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="showcase-card-img-holder">
                  <img src={card.image} alt={card.label} className="showcase-card-image" />
                  
                  {/* 半透明遮罩 */}
                  <div className="showcase-card-overlay"></div>

                  {/* 悬浮装饰：创作者和转化率数据 */}
                  <div className="showcase-card-meta">
                    <span className="showcase-meta-creator">{card.creator}</span>
                    <span className="showcase-meta-ctr">{card.ctr}</span>
                  </div>

                  {/* 平台渠道标签 */}
                  <div className="showcase-platform-tag">
                    <span>{card.platform}</span>
                  </div>

                  {/* 聚焦卡片特有播放组件 */}
                  {isActive && (
                    <>
                      <div className="showcase-play-button-center">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                      </div>

                      {/* 静音开关 */}
                      <button 
                        className="showcase-mute-toggle"
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

                      {/* 底部播放进度条 */}
                      <div className="showcase-card-progressbar">
                        <div className="showcase-progressbar-fill"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部关联文本标签导航 */}
        <div className="showcase-tabs-navigation">
          {SHOWCASE_CARDS.map((card, index) => (
            <button
              key={card.id}
              className={`showcase-tab-btn ${index === activeIndex ? 'showcase-tab-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {card.label}
            </button>
          ))}
        </div>
      </AnimatedContent>
    </section>
  );
}
