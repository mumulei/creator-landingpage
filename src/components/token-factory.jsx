import { T } from '../i18n/locale';
import { useLocale } from '../i18n/use-locale';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { createStepSequence } from './token-art/step-sequence';
import { UsersRound, FileStack, Cpu, Network, Braces } from 'lucide-react';
import './token-factory.css';
import EvervaultHero from './token-art/evervault-hero.jsx';
import HairlineArt from './token-art/hairline-art.jsx';
import HeroArt from './token-art/hero-art.jsx';
import AnimatedContent from './ui/AnimatedContent';

function TokenReveal({children,className='',immediate=false,...animation}) {
  const reduced=useReducedMotion();
  return reduced||immediate?<div className={className}>{children}</div>:<AnimatedContent className={className} {...animation}>{children}</AnimatedContent>;
}

function ActionLink({ href, children, light = false, onClick }) {
  const arrow = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
  return <a className={`hero-cta hero-cta--${light ? 'light' : 'dark'} group`} href={href} onClick={onClick}><span className="btn-arrow-left">{arrow}</span><span className="btn-text">{children}</span><span className="btn-arrow-right">{arrow}</span></a>;
}

const stages = [
  { name: 'Creators', Icon: UsersRound, description: 'Original video, images and voice, shaped by creators around the world.' },
  { name: 'Content', Icon: FileStack, description: 'Human creativity becomes the content at the heart of the AI workflow.' },
  { name: 'GPU', Icon: Cpu, description: 'GPU infrastructure powers the workloads behind training and inference.' },
  { name: 'AI Models', Icon: Network, description: 'Multimodal models turn creative inputs into intelligence for generation and agents.' },
  { name: 'Tokens', Icon: Braces, description: 'Intelligence becomes tokens that power creative tools and AI applications.' },
];
const layers = [
  { name: 'Creative', kind: 'creator-globe', description: 'Global creators. Video, images and voice with a human perspective.' },
  { name: 'Intelligence', kind: 'agent-dot', description: 'Multimodal models, fine-tuning and agents for creative work.' },
  { name: 'Compute', kind: 'brain-compute', description: 'GPU clusters and global infrastructure to power AI at scale.' },
  { name: 'Token Factory', kind: 'ai-network', description: 'Tokens, inference and APIs that connect intelligence to applications.' },
];

function CreatorFlow() {
  const { t } = useLocale();
  const section=useRef(null);
  const [step,setStep]=useState(0);
  const [holding,setHolding]=useState(false);
  const [highlight,setHighlight]=useState({y:0,height:112});
  const timeline=useRef(null),sequence=useRef(null),settled=useRef(0),latestTarget=useRef(0),releaseTimer=useRef(null);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:section,offset:['start 74px','end end']});
  useEffect(()=>{
    sequence.current=createStepSequence({onStep:setStep,onSettled:value=>{
      settled.current=value;
      if(value===4)releaseTimer.current=setTimeout(()=>{if(latestTarget.current===4)setHolding(false);},350);
    }});
    sequence.current.target(latestTarget.current);
    const skip=()=>{
      clearTimeout(releaseTimer.current);
      sequence.current.jump(4);settled.current=4;latestTarget.current=4;setHolding(false);
    };
    const hashChange=()=>{if(['#ai-models','#ai-stack'].includes(window.location.hash))skip();};
    hashChange();
    window.addEventListener('tf:navigate-models',skip);
    window.addEventListener('hashchange',hashChange);
    const check=()=>{
      const rect=section.current.getBoundingClientRect();
      if(rect.top>74||latestTarget.current<4){setHolding(false);return;}
      if(rect.bottom<=window.innerHeight&&settled.current!==4&&!reduced&&window.innerHeight>650)setHolding(true);
    };
    window.addEventListener('scroll',check,{passive:true});
    return()=>{sequence.current.destroy();clearTimeout(releaseTimer.current);window.removeEventListener('scroll',check);window.removeEventListener('tf:navigate-models',skip);window.removeEventListener('hashchange',hashChange);};
  },[reduced]);
  useMotionValueEvent(scrollYProgress,'change',value=>{
    const target=Math.min(4,Math.max(0,Math.floor(value*5)));
    if(target!==latestTarget.current){
      clearTimeout(releaseTimer.current);
      if(target!==settled.current)settled.current=-1;
    }
    latestTarget.current=target;
    if(reduced){setStep(target);settled.current=target;setHolding(false);}
    else sequence.current?.target(target);
    if(target<4)setHolding(false);
    else if(!reduced&&settled.current!==4&&window.innerHeight>650&&section.current.getBoundingClientRect().bottom<=window.innerHeight)setHolding(true);
  });
  useEffect(()=>{
    const measure=()=>{
      const row=timeline.current?.querySelectorAll('.tf-stage')[step];
      if(row)setHighlight({y:row.offsetTop,height:row.offsetHeight});
    };
    measure();
    const observer=new ResizeObserver(measure);
    observer.observe(timeline.current);
    return()=>observer.disconnect();
  },[step]);
  return <section ref={section} className="tf-flow" id="creator-flow" aria-labelledby="creator-flow-title">
    <div className={`tf-flow-panel${holding?' is-holding':''}`}>
    <TokenReveal distance={60} duration={1}>
    <header className="tf-flow-heading">
      <h2 id="creator-flow-title"><T>{"From Creators to Tokens"}</T><span>.</span></h2>
      <p><T>{"A connected path from human creativity to AI applications."}</T></p>
    </header>
    </TokenReveal>
    <div ref={timeline} className="tf-timeline">
      <motion.div className="tf-stage-highlight" aria-hidden="true" animate={{y:highlight.y,height:highlight.height}} transition={{duration:reduced?0:.26,ease:[.22,.61,.36,1]}} />
      <ol className="tf-pipeline" aria-label={t('From creators to tokens')}>
        {stages.map(({name,Icon:StageIcon,description},index)=><li key={name}
          className={`tf-stage${index===step?' is-active':''}${index<step?' is-reached':''}`}
          aria-current={index===step?'step':undefined} tabIndex={0}>
          <div className="tf-stage-reveal">
          <div className="tf-stage-mark" aria-hidden="true"><span className="tf-stage-symbol"><StageIcon size={22} strokeWidth={1.35} /></span><span className="tf-stage-number">{String(index+1).padStart(2,'0')}</span></div>
          <span className="tf-stage-node" aria-hidden="true"><span /></span>
          <div className="tf-stage-copy"><h3><T>{name}</T></h3><p><T>{description}</T></p></div>
          </div>
        </li>)}
      </ol>
    </div>
    </div>
  </section>;
}

export default function TokenFactory() {
  const { locale, t } = useLocale();
  const [modelNavigation,setModelNavigation]=useState(()=>['#ai-models','#ai-stack'].includes(window.location.hash));
  const navigateModels=event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    setModelNavigation(true);
    window.dispatchEvent(new Event('tf:navigate-models'));
  };

  return <div className="tf-page">
    <EvervaultHero>
      <div className="tf-hero-inner">
      <div className="tf-hero-copy">
      <h1 className="anim-fade-up" style={{animationDelay:'.1s'}}><T>{'From Creativity to Intelligence'}</T><span className="tf-title-dot">.</span></h1>
      <p className="tf-hero-subtitle anim-fade-up" style={{animationDelay:'.3s'}}><T>{'AI Compute & Creative Infrastructure for the Next Generation of AI.'}</T></p>
      <p className="tf-intro anim-fade-up" style={{animationDelay:'.4s'}}><T>{"Creatorial connects global creative talent, GPU infrastructure and AI models to power content generation and AI applications at scale."}</T></p>
      <div className="tf-actions anim-fade-up" style={{animationDelay:'.55s'}}>
        <ActionLink href="#ai-models" onClick={navigateModels}><T>{"Explore AI Models"}</T></ActionLink>
        <ActionLink light href="mailto:support@creatorial.com?subject=Token%20Factory%20enquiry"><T>{"Talk to Us"}</T></ActionLink>
      </div>
      </div>
      <div className="tf-hero-art-entry anim-fade-up" style={{animationDelay:'.7s'}}><HeroArt /></div>
      </div>
    </EvervaultHero>
    <CreatorFlow />

    <section className="tf-stack tf-section" id="ai-stack">
      <span id="ai-models" className="tf-model-anchor" aria-hidden="true" />
      <TokenReveal immediate={modelNavigation} distance={60} duration={1}><div className="tf-section-heading"><h2><T>{"The Creatorial AI Stack"}</T><span>.</span></h2><p><T>{"From human creativity to intelligence at scale."}</T></p></div></TokenReveal>
      <div className="tf-layers">{layers.map((layer, index) => <TokenReveal immediate={modelNavigation} className="tf-layer-reveal" delay={.1+index*.15} distance={80} duration={1} key={layer.name}><article className="tf-layer">
        <h3><T>{layer.name}</T></h3><p className="tf-layer-description"><T>{layer.description}</T></p>
        <HairlineArt kind={layer.kind} label={locale === 'zh' ? `${t(layer.name)}交互插画，可使用方向键探索。` : `${layer.name} layer interactive isometric illustration. Use the arrow keys to explore.`} />
      </article></TokenReveal>)}</div>
    </section>

  </div>;
}
