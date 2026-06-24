import React, { useState, useEffect } from 'react';
import { SmoothCorners } from '@lisse/react';
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

// 将数据源复制 3 份以形成无缝平铺滑轨，防止轮播时的节点大反弹横穿
const VIRTUAL_CARDS = [
  ...SHOWCASE_CARDS.map(c => ({ ...c, virtualId: c.id + '_L' })),
  ...SHOWCASE_CARDS.map(c => ({ ...c, virtualId: c.id + '_M' })),
  ...SHOWCASE_CARDS.map(c => ({ ...c, virtualId: c.id + '_R' })),
];

export default function CreatorShowcase() {
  const [activeIndex, setActiveIndex] = useState(7); // 默认聚焦中间组的 Review (索引为 7)
  const [isResetting, setIsResetting] = useState(false);
  const [mutedStates, setMutedStates] = useState({ 10: true, 11: true, 12: true, 13: true, 14: true });
  const [isHovered, setIsHovered] = useState(false);

  // 触控划动识别
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 50) {
      setActiveIndex((prev) => prev - 1);
    } else if (deltaX < -50) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  // 监听 activeIndex 越界，在动画结束后静默重置（无动画重置）
  useEffect(() => {
    if (activeIndex >= 10) {
      const timer = setTimeout(() => {
        setIsResetting(true);
        setActiveIndex(activeIndex - 5);
        
        setTimeout(() => {
          setIsResetting(false);
        }, 50);
      }, 760); // 760ms 匹配 transition 动画时长
      return () => clearTimeout(timer);
    } else if (activeIndex < 5) {
      const timer = setTimeout(() => {
        setIsResetting(true);
        setActiveIndex(activeIndex + 5);
        
        setTimeout(() => {
          setIsResetting(false);
        }, 50);
      }, 760);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  // 自动轮播 (5.5 秒切换一次)
  useEffect(() => {
    if (isHovered || isResetting) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, isResetting]);

  const handleMuteToggle = (e, id) => {
    e.stopPropagation();
    setMutedStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="creator-showcase-section" id="creator-showcase">
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="showcase-cards-wrapper">
          {VIRTUAL_CARDS.map((card, index) => {
            const diff = index - activeIndex;
            
            // 精确计算滑轨卡片的水平位移（支持通过 CSS 变量等比缩小）
            let translateXVar = '0px';
            if (diff === 1) {
              translateXVar = 'var(--showcase-offset-1)';
            } else if (diff === -1) {
              translateXVar = 'calc(-1 * var(--showcase-offset-1))';
            } else if (diff === 2) {
              translateXVar = 'var(--showcase-offset-2)';
            } else if (diff === -2) {
              translateXVar = 'calc(-1 * var(--showcase-offset-2))';
            } else if (diff > 2) {
              translateXVar = `calc(var(--showcase-offset-2) + ${diff - 2} * var(--showcase-offset-outer))`;
            } else if (diff < -2) {
              translateXVar = `calc(-1 * var(--showcase-offset-2) - ${Math.abs(diff + 2)} * var(--showcase-offset-outer))`;
            }

            let scale = 0.72;
            let opacity = 0;
            let zIndex = 0;

            if (diff === 0) {
              scale = 1;
              opacity = 1;
              zIndex = 10;
            } else if (diff === 1 || diff === -1) {
              scale = 0.85;
              opacity = 0.85;
              zIndex = 5;
            } else if (diff === 2 || diff === -2) {
              scale = 0.72;
              opacity = 0.72;
              zIndex = 2;
            }

            const style = {
              transform: `translate3d(calc(-50% + ${translateXVar}), -50%, 0) scale(${scale})`,
              opacity: opacity,
              zIndex: zIndex,
              pointerEvents: (diff >= -2 && diff <= 2) ? 'auto' : 'none',
            };

            const isActive = diff === 0;
            const isMuted = mutedStates[card.id];

            return (
              <div
                key={card.virtualId}
                className={`showcase-carousel-card ${isActive ? 'showcase-card-active' : ''} ${isResetting ? 'no-transition' : ''}`}
                style={style}
                onClick={() => {
                  if (diff >= -2 && diff <= 2 && diff !== 0) {
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="showcase-card-img-holder">
                  <img src={card.image} alt={card.label} className="showcase-card-image" />
                  
                  {/* 只有非活动卡片有半透明/磨砂灰度遮罩 */}
                  {!isActive && <div className="showcase-card-overlay"></div>}

                  {/* 聚焦卡片特有播放组件：静音开关与底部进度条 */}
                  {isActive && (
                    <>
                      {/* 静音开关 */}
                      <button 
                        className="showcase-mute-toggle"
                        onClick={(e) => handleMuteToggle(e, card.id)}
                        aria-label="Toggle mute"
                      >
                        {isMuted ? (
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
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

        {/* 底部小圆点进度条指示器 */}
        <div className="showcase-dots-container">
          {SHOWCASE_CARDS.map((card, idx) => {
            const activeCard = SHOWCASE_CARDS[activeIndex % 5];
            const isActive = activeCard.id === card.id;
            
            return (
              <div 
                key={card.id} 
                className={`showcase-dot-item ${isActive ? 'showcase-dot-active' : ''}`}
                onClick={() => {
                  setActiveIndex(5 + idx);
                }}
              >
                {isActive && (
                  <div 
                    key={`${card.id}-${isHovered}`} 
                    className="showcase-dot-progress"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* 底部 Explore creators 按钮 */}
        <div className="showcase-cta-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <SmoothCorners asChild corners={{ radius: 24, smoothing: 0.6 }}>
            <a href="#explore-creators" className="ready-btn ready-btn-primary group">
              <span className="btn-arrow-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
              <span className="btn-text">Explore creators</span>
              <span className="btn-arrow-right">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </a>
          </SmoothCorners>
        </div>
      </AnimatedContent>
    </section>
  );
}
