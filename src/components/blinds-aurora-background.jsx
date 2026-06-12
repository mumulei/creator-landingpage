import { useEffect, useRef, useState } from "react";
import GradualBlur from "./GradualBlur";

const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";
const HERO_PROJECT_ID = "D3Vd49nwPvID5Nz0VKLr";
const HERO_BACKGROUND_IMAGE =
  "https://paico.cn/assets/image/section1_bg_first.png";

let sdkLoadPromise = null;

function loadUnicornSdk() {
  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  if (
    window.UnicornStudio &&
    typeof window.UnicornStudio.addScene === "function"
  ) {
    sdkLoadPromise = Promise.resolve(window.UnicornStudio);
    return sdkLoadPromise;
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = UNICORN_SDK_URL;
    script.async = true;
    script.onload = () => {
      if (window.UnicornStudio) {
        resolve(window.UnicornStudio);
      } else {
        sdkLoadPromise = null;
        reject(new Error("Unicorn Studio SDK loaded without global object."));
      }
    };
    script.onerror = () => {
      sdkLoadPromise = null;
      reject(new Error("Failed to load Unicorn Studio SDK."));
    };
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

function BlindsAuroraBackground() {
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const mountScene = async () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      try {
        const UnicornStudio = await loadUnicornSdk();

        if (cancelled) {
          return;
        }

        sceneRef.current?.destroy?.();

        const scene = await UnicornStudio.addScene({
          element: container,
          projectId: HERO_PROJECT_ID,
          scale: 1,
          dpi: 1.5,
          fps: 60,
          lazyLoad: false,
          production: true,
          interactivity: {
            mouse: {
              disabled: false,
              disableMobile: false,
            },
          },
        });

        if (cancelled) {
          scene?.destroy?.();
          return;
        }

        sceneRef.current = scene;
        setIsReady(true);
      } catch (error) {
        console.error(error);
      }
    };

    mountScene();

    return () => {
      cancelled = true;
      sceneRef.current?.destroy?.();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div className="paico-hero-bg" aria-hidden="true">
      <div
        className="paico-hero-bg__base"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_IMAGE})` }}
      />
      <div
        ref={containerRef}
        className={`paico-hero-bg__scene ${isReady ? "is-ready" : ""}`}
      />
      <GradualBlur
        target="parent"
        position="top"
        height="132px"
        strength={1}
        divCount={6}
        curve="bezier"
        zIndex={10}
      />
      <div className="paico-hero-bg__glow" />
    </div>
  );
}

export default BlindsAuroraBackground;
