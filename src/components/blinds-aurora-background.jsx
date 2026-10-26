import { useEffect, useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';
import UnicornAuroraBackground from './unicorn-aurora-background';

// Keep Unicorn available without mounting its renderer or loading its script.
export default function BlindsAuroraBackground({ variant = 'pink' }) {
  return variant === 'unicorn' ? <UnicornAuroraBackground /> : <PinkShaderBackground />;
}

function PinkShaderBackground() {
  const ref = useRef(null);
  const [active, setActive] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(ref.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <div ref={ref} className="creatorial-hero-bg" aria-hidden="true">
    <div className="creatorial-hero-bg__mesh">
      <MeshGradient
        width={1280}
        height={720}
        colors={['#ffe5fd', '#ff8ade', '#ffadef', '#ff9ee7']}
        distortion={0.7}
        swirl={0.6}
        grainMixer={0}
        grainOverlay={0}
        speed={active && !reduced ? 1.2 : 0}
        scale={0.88}
        rotation={360}
        offsetX={-0.16}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
    <div className="creatorial-hero-bg__gradient" />
  </div>;
}
