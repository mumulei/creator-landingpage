import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import AnimatedContent from './ui/AnimatedContent';
import bg1Img from '../assets/features/how-bg-1.png';
import bg2Img from '../assets/features/how-bg-2.png';
import bg3Img from '../assets/features/how-bg-3.png';
import bg4Img from '../assets/features/how-bg-4.png';
import product1Img from '../assets/features/how-product-1.png';
import product2Img from '../assets/features/how-product-2.png';
import product3Img from '../assets/features/how-product-3.png';
import product4Img from '../assets/features/how-product-4.png';

const STEPS = [
  {
    step: 'Step 1',
    title: 'Set Up Your Brand',
    description: 'Create your brand profile and manage all your requests. Everything in one place.',
    bgImage: bg1Img,
    productImage: product1Img,
  },
  {
    step: 'Step 2',
    title: 'Launch a Request',
    description: 'Post what you need — country, language, content. Creators apply, or invite ones you like directly. Review, then approve your lineup.',
    bgImage: bg2Img,
    productImage: product2Img,
  },
  {
    step: 'Step 3',
    title: 'Stay in the Loop',
    description: 'Message creators, share references, and track progress. All on the platform.',
    bgImage: bg3Img,
    productImage: product3Img,
  },
  {
    step: 'Step 4',
    title: 'Approve & Download',
    description: "Happy with submitted content? Approve, download your assets, and publish whenever you're ready.",
    bgImage: bg4Img,
    productImage: product4Img,
  },
];

const DesktopCard = ({ item, index, progress, total }) => {
  // Each card slides up one by one.
  // Card 0 is always there (y = 0).
  // Card 1 slides up between 0 and 0.33.
  // Card 2 slides up between 0.33 and 0.66.
  // Card 3 slides up between 0.66 and 1.
  
  const startSlide = (index - 1) / (total - 1);
  const endSlide = index / (total - 1);
  
  // y position: starts at 100vh (below screen), goes to 0 (centered in container)
  const y = useTransform(
    progress,
    [startSlide < 0 ? 0 : startSlide, endSlide],
    index === 0 ? ['0vh', '0vh'] : ['100vh', '0vh']
  );
  
  // Scale down the card when the NEXT card slides up over it.
  // Next card starts sliding at endSlide, finishes at nextSlideEnd.
  const nextSlideEnd = (index + 1) / (total - 1);
  const targetScale = 1 - (total - 1 - index) * 0.04;
  
  const scale = useTransform(
    progress,
    [endSlide, nextSlideEnd > 1 ? 1 : nextSlideEnd],
    [1, index === total - 1 ? 1 : 1 - 0.04] 
  );

  return (
    <motion.div 
      className="how-step-card-desktop"
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        x: '-50%',
        y,
        scale,
        transformOrigin: 'top center',
        zIndex: index
      }}
    >
      <img src={item.bgImage} className="how-step-bg-img" alt="" />
      
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
        <div className="how-img-glass" />
        <img 
          src={item.productImage} 
          alt={item.title} 
          className="how-step-img" 
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024 || window.innerHeight < 650);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  if (isMobile) {
    return (
      <section className="how-works-section" id="how-it-works">
        {/* Mobile content remains unchanged */}
        <AnimatedContent className="how-header-container">
          <h2 className="how-title">How it works？</h2>
          <p className="how-subtitle">From brief to content, without the chaos.</p>
        </AnimatedContent>
        <div className="how-steps-list">
          {STEPS.map((item, index) => (
            <AnimatedContent key={index} delay={0.1 + index * 0.15}>
              <div className="how-step-card how-card-visible">
                <img src={item.bgImage} className="how-step-bg-img" alt="" />
                <div className="how-text-content">
                  <div className="how-step-badge">
                    <span>{item.step}</span>
                  </div>
                  <h3 className="how-step-title">{item.title}</h3>
                  <p className="how-step-desc">{item.description}</p>
                </div>
                <div className="how-image-wrapper">
                  <div className="how-img-glass" />
                  <img src={item.productImage} alt={item.title} className="how-step-img" loading="lazy" />
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="how-works-sticky-section" ref={sectionRef} id="how-it-works" style={{ height: '400vh' }}>
      <div className="how-unified-sticky-container">
        <AnimatedContent className="how-sticky-header">
          <h2 className="how-title">How it works？</h2>
          <p className="how-subtitle">From brief to content, without the chaos.</p>
        </AnimatedContent>

        <AnimatedContent distance={100} delay={0.2} className="how-cards-absolute-container">
          {STEPS.map((item, index) => (
            <DesktopCard 
              key={index}
              item={item}
              index={index}
              progress={scrollYProgress}
              total={STEPS.length}
            />
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
