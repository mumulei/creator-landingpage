import { useEffect, useRef } from 'react';
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function cipher(seed) {
  let value=seed, text='';
  for(let i=0;i<12000;i++){
    value=(Math.imul(value,1664525)+1013904223)>>>0;
    text+=alphabet[value%alphabet.length];
  }
  return text;
}
const initialCipher=cipher(42);

export default function EvervaultHero({children}) {
  const x=useMotionValue(-500), y=useMotionValue(-500), target=useMotionValue(0);
  const opacity=useSpring(target,{stiffness:90,damping:24});
  const reduced=useReducedMotion();
  const chars=useRef(null),last=useRef(0),seed=useRef(42);
  const section=useRef(null),introChars=useRef(null),introRunning=useRef(false);
  const introX=useMotionValue(0),introY=useMotionValue(0),introRadius=useMotionValue(0),introOpacity=useMotionValue(0);
  const introMask=useMotionTemplate`radial-gradient(${introRadius}px circle at ${introX}px ${introY}px, #000 0%, rgba(0,0,0,.65) 45%, transparent 100%)`;
  const mask=useMotionTemplate`radial-gradient(240px circle at ${x}px ${y}px, #000 0%, rgba(0,0,0,.88) 18%, rgba(0,0,0,.56) 38%, rgba(0,0,0,.24) 58%, rgba(0,0,0,.07) 78%, transparent 100%)`;
  useEffect(()=>{
    if(reduced||!section.current)return;
    const bounds=section.current.getBoundingClientRect();
    const mobile=window.matchMedia('(max-width: 640px)').matches;
    const visual=section.current.querySelector('.tf-hero-art-entry')?.getBoundingClientRect();
    const introLayer=section.current.querySelector('.tf-cipher-intro');
    if(mobile&&visual){
      introX.set(visual.left-bounds.left+visual.width/2);
      introY.set(visual.bottom-bounds.top);
    }else{
      introX.set(bounds.width/2);introY.set(bounds.height/2);
    }
    introLayer.style.clipPath='none';
    introRunning.current=true;let frame=-1;
    const duration=2.15,reach=mobile&&visual?Math.hypot(bounds.width*.6,visual.bottom-bounds.top)*1.15:Math.min(650,Math.max(bounds.width*.48,bounds.height*.65));
    const expansion=animate(introRadius,[0,reach*.18,reach*.72,reach],{duration,times:[0,.18,.68,1],ease:[.22,.61,.36,1]});
    const reveal=animate(introOpacity,[0,.95,.7,0],{duration,times:[0,.16,.57,1],ease:'easeInOut',onComplete:()=>{introRunning.current=false;}});
    const scramble=animate(0,1,{duration,ease:'linear',onUpdate:value=>{
      const next=Math.floor(value*16);if(next!==frame){frame=next;if(introChars.current)introChars.current.textContent=cipher(90+next);}
    }});
    return()=>{expansion.stop();reveal.stop();scramble.stop();introRunning.current=false;introOpacity.set(0);introRadius.set(0);};
  },[reduced,introX,introY,introRadius,introOpacity]);
  const move=event=>{
    if(event.pointerType==='touch'||introRunning.current)return;
    if(event.target.closest('.tf-hero-copy')){
      target.set(0);
      return;
    }
    const bounds=event.currentTarget.getBoundingClientRect();
    x.set(event.clientX-bounds.left);y.set(event.clientY-bounds.top);target.set(1);
    if(!reduced&&event.timeStamp-last.current>110){
      if(chars.current)chars.current.textContent=cipher(++seed.current);
      last.current=event.timeStamp;
    }
  };
  return <section ref={section} className="tf-hero tf-hero--evervault" onPointerMove={move} onPointerLeave={()=>target.set(0)}>
    <div className="tf-cipher-background tf-cipher-intro" aria-hidden="true">
      <motion.div className="tf-cipher-reveal" style={{opacity:introOpacity,maskImage:introMask,WebkitMaskImage:introMask}}>
        <div className="tf-cipher-tint" />
        <p className="tf-cipher-text" ref={introChars}>{initialCipher}</p>
      </motion.div>
    </div>
    <div className="tf-cipher-background" aria-hidden="true">
      <motion.div className="tf-cipher-reveal" style={{opacity,maskImage:mask,WebkitMaskImage:mask}}>
        <div className="tf-cipher-tint" />
        <p className="tf-cipher-text" ref={chars}>{initialCipher}</p>
      </motion.div>
    </div>
    {children}
  </section>;
}
