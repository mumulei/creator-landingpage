import React, { useEffect, useRef } from 'react';
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
  const containerRef = useRef(null);

  useEffect(() => {
    // 监听滚动实现卡片视差淡入效果
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('how-card-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const cards = containerRef.current.querySelectorAll('.how-step-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // 鼠标悬停 3D Tilt 微动效逻辑
  const handleMouseMove = (e, index) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // 鼠标在元素内的 x 坐标
    const y = e.clientY - rect.top;  // 鼠标在元素内的 y 坐标
    
    // 计算偏转角度 (限制在最大 3 度内)
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 3;
    const rotateX = -((y - yc) / yc) * 3;

    const imgContainer = card.querySelector('.how-img-glass');
    if (imgContainer) {
      imgContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const imgContainer = card.querySelector('.how-img-glass');
    if (imgContainer) {
      imgContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <section className="how-works-section" ref={containerRef} id="how-it-works">
      {/* 头部区域 */}
      <div className="how-header-container">
        <h2 className="how-title">How it works？</h2>
        <p className="how-subtitle">From brief to content, without the chaos.</p>
      </div>

      {/* 步骤列表 */}
      <div className="how-steps-list">
        {STEPS.map((item, index) => (
          <div 
            key={index} 
            className={`how-step-card ${item.bgClass}`}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
          >
            {/* 左侧文案区 */}
            <div className="how-text-content">
              <div className="how-step-badge">
                <span>{item.step}</span>
              </div>
              <h3 className="how-step-title">{item.title}</h3>
              <p className="how-step-desc">{item.description}</p>
              
              {/* 装饰性右箭头按钮 */}
              <div className="how-arrow-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* 右侧毛玻璃截图区 */}
            <div className="how-image-wrapper">
              <div className="how-img-glass">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="how-step-img" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
