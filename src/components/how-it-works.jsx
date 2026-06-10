import React, { useState, useEffect, useRef } from 'react';
import step1Img from '../assets/features/how-works-1.png';
import step2Img from '../assets/features/how-works-2.png';
import step3Img from '../assets/features/how-works-3.png';
import step4Img from '../assets/features/how-works-4.png';

// 步骤卡片数据配置
const STEPS = [
  {
    step: 'Step 1',
    title: 'Set Up Your Brand',
    description: 'Create your brand profile and manage all your requests. Everything in one place.',
    image: step1Img,
    bgClass: 'how-step-bg-1',
  },
  {
    step: 'Step 2',
    title: 'Launch a Request',
    description: 'Post what you need — country, language, content. Creators apply, or invite ones you like directly. Review, then approve your lineup.',
    image: step2Img,
    bgClass: 'how-step-bg-2',
  },
  {
    step: 'Step 3',
    title: 'Stay in the Loop',
    description: 'Message creators, share references, and track progress. All on the platform.',
    image: step3Img,
    bgClass: 'how-step-bg-3',
  },
  {
    step: 'Step 4',
    title: 'Approve & Download',
    description: "Happy with submitted content? Approve, download your assets, and publish whenever you're ready.",
    image: step4Img,
    bgClass: 'how-step-bg-4',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 监听视口大小，判断是否降级为移动端平铺布局
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 920);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 滚动监听计算 activeIndex 和 progress
  useEffect(() => {
    if (isMobile) return; // 移动端使用普通滚动，不启用 sticky 监听

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          // 计算相对于 section 进入/退出视口的绝对滚动进度
          // 当 section 顶部对齐视口顶部时开始，底部对齐视口底部时结束
          const scrollStart = 0; // rect.top === 0
          const scrollDistance = sectionHeight - windowHeight;

          // 计算当前滚动进度比例 (0 到 1)
          let progress = -rect.top / scrollDistance;
          progress = Math.max(0, Math.min(1, progress));
          
          setScrollProgress(progress);

          // 四等分区间切换
          const index = Math.min(3, Math.floor(progress * 4));
          setActiveIndex(index);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初始化计算一次
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // 鼠标悬停 3D Tilt 微动效逻辑 (仅在大屏粘性模式下作用于当前激活卡片)
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 3;
    const rotateX = -((y - yc) / yc) * 3;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    if (isMobile) return;
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // 移动端降级渲染普通垂直流
  if (isMobile) {
    return (
      <section className="how-works-section" id="how-it-works">
        <div className="how-header-container">
          <h2 className="how-title">How it works？</h2>
          <p className="how-subtitle">From brief to content, without the chaos.</p>
        </div>
        <div className="how-steps-list">
          {STEPS.map((item, index) => (
            <div key={index} className={`how-step-card ${item.bgClass} how-card-visible`}>
              <div className="how-text-content">
                <div className="how-step-badge">
                  <span>{item.step}</span>
                </div>
                <h3 className="how-step-title">{item.title}</h3>
                <p className="how-step-desc">{item.description}</p>
                <div className="how-arrow-button">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              <div className="how-image-wrapper">
                <div className="how-img-glass">
                  <img src={item.image} alt={item.title} className="how-step-img" loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 大屏端渲染 Sticky 滚动联动步骤切换
  return (
    <section className="how-works-sticky-section" ref={sectionRef} id="how-it-works">
      <div className="how-sticky-container">
        {/* 固定头部标题栏 */}
        <div className="how-sticky-header">
          <h2 className="how-title">How it works？</h2>
          <p className="how-subtitle">From brief to content, without the chaos.</p>
        </div>

        {/* 粘性左右联动内容区 */}
        <div className="how-sticky-content">
          {/* 左侧：步骤文案叠放区 */}
          <div className="how-text-stack">
            {STEPS.map((item, index) => {
              const status = index === activeIndex 
                ? 'active' 
                : index < activeIndex 
                  ? 'past' 
                  : 'future';
              
              return (
                <div key={index} className={`how-text-item how-text-item--${status}`}>
                  <div className="how-step-badge">
                    <span>{item.step}</span>
                  </div>
                  <h3 className="how-step-title">{item.title}</h3>
                  <p className="how-step-desc">{item.description}</p>
                  
                  {/* 指示当前进度的小线条 */}
                  <div className="how-progress-line-container">
                    <div 
                      className="how-progress-line-fill" 
                      style={{ 
                        width: index === activeIndex 
                          ? `${(scrollProgress * 4 - index) * 100}%` 
                          : index < activeIndex ? '100%' : '0%' 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 右侧：产品截图叠放区 */}
          <div className="how-image-stack">
            {STEPS.map((item, index) => {
              const status = index === activeIndex 
                ? 'active' 
                : index < activeIndex 
                  ? 'past' 
                  : 'future';
              
              return (
                <div 
                  key={index} 
                  className={`how-image-item how-image-item--${status} ${item.bgClass}`}
                  onMouseMove={index === activeIndex ? handleMouseMove : null}
                  onMouseLeave={index === activeIndex ? handleMouseLeave : null}
                >
                  <div className="how-img-glass">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="how-step-img" 
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
