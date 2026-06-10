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
  const [stepProgress, setStepProgress] = useState(0); // 当前步骤内的微观进度 (0到1)
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

  // 滚动监听计算 activeIndex 和 stepProgress
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const sectionHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          // 粘性滚动的总可用行程高度
          const scrollDistance = sectionHeight - windowHeight;
          if (scrollDistance <= 0) return;

          // 计算当前滚动进度比例 (0 到 1)
          let progress = -rect.top / scrollDistance;
          progress = Math.max(0, Math.min(1, progress));

          // 核心重构：为了消除卡片底部留出多余空白的空旷感，我们让 4 张卡片的切换活跃期集中在滚动进度的前 88% 内
          // 最后的 12% 距离作为第四步展示完毕后的缓冲，并顺畅随页面向上滚走
          const activeRange = 0.88;
          const progressInActive = Math.min(activeRange, progress) / activeRange; // 归一化到 0 到 1

          // 划分四个卡片对应的区间
          // 0.0 - 0.25 -> Index 0
          // 0.25 - 0.5 -> Index 1
          // 0.5 - 0.75 -> Index 2
          // 0.75 - 1.0 -> Index 3
          const index = Math.min(3, Math.floor(progressInActive * 4));
          setActiveIndex(index);

          // 计算当前激活步骤内部的微观百分比进度，用以平滑填充对应步骤底下的进度条线
          const rangeSize = 0.25;
          const rangeStart = index * rangeSize;
          const microProgress = (progressInActive - rangeStart) / rangeSize;
          setStepProgress(Math.max(0, Math.min(1, microProgress)));
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // 鼠标悬停 3D Tilt 微动效逻辑
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

  return (
    <section className="how-works-sticky-section" ref={sectionRef} id="how-it-works">
      <div className="how-sticky-container">
        {/* 固定头部标题栏 - 滚动中始终锁定在视口顶部 */}
        <div className="how-sticky-header">
          <h2 className="how-title">How it works？</h2>
          <p className="how-subtitle">From brief to content, without the chaos.</p>
        </div>

        {/* 粘性内容区域 - 除去标题高度后居中锁定 */}
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
                  
                  {/* 精细步骤底线进度条 */}
                  <div className="how-progress-line-container">
                    <div 
                      className="how-progress-line-fill" 
                      style={{ 
                        width: index === activeIndex 
                          ? `${stepProgress * 100}%` 
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
