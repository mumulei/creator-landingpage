import { useEffect, useRef } from 'react';
import { mountHairline } from './hairline-figure.js';

let kernelPromise;
function kernel() {
  if(window.HL)return Promise.resolve(window.HL);
  if(!kernelPromise)kernelPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script');script.src='/vendor/hairline-kernel.js';
    script.onload=()=>resolve(window.HL);script.onerror=()=>{kernelPromise=null;reject(new Error('Hairline could not load'));};
    document.head.append(script);
  });
  return kernelPromise;
}
export default function HairlineArt({kind,label}) {
  const ref=useRef(null);
  useEffect(()=>{
    let dispose,live=true;
    kernel().then(HL=>{
      if(!live)return;
      HL.inject(document);
      const stage=ref.current;
      const mounted=mountHairline(HL,stage,stage.querySelector('svg'),stage.querySelector('[data-hairline-live]'),kind);
      let autoplay;
      const start=()=>{if(mounted.tour&&!HL.reducedMotion()){autoplay?.stop();autoplay=HL.tour(stage,mounted.tour);}};
      const stop=()=>{autoplay?.stop();autoplay=null;};
      const enter=()=>{stop();mounted.setHover?.(true);};
      const leave=()=>{mounted.setHover?.(false);start();};
      stage.addEventListener('pointerenter',enter);
      stage.addEventListener('pointerleave',leave);
      stage.addEventListener('focusin',stop);
      stage.addEventListener('focusout',start);
      start();
      dispose=()=>{stop();stage.removeEventListener('pointerenter',enter);stage.removeEventListener('pointerleave',leave);stage.removeEventListener('focusin',stop);stage.removeEventListener('focusout',start);mounted.destroy();};
    }).catch(()=>{if(ref.current)ref.current.dataset.unavailable='true';});
    return()=>{live=false;dispose?.();};
  },[kind]);
  return <div ref={ref} data-hairline="" data-hairline-theme="light" className="tf-hairline" tabIndex={0} role="img" aria-label={label}>
    <svg viewBox="0 0 400 320" aria-hidden="true"/><span data-hairline-live="" aria-hidden="true"/>
  </div>;
}
