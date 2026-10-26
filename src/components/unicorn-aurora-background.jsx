import { useEffect, useRef, useState } from "react";

const UNICORN_SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";
const PAICO_PROJECT_ID = "D3Vd49nwPvID5Nz0VKLr";
let unicornStudioPromise = null;

function loadUnicornStudio() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.UnicornStudio?.init) return Promise.resolve(window.UnicornStudio);
  if (unicornStudioPromise) return unicornStudioPromise;

  unicornStudioPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-unicorn-studio="true"]');
    const script = existingScript || document.createElement("script");

    script.addEventListener("load", () => resolve(window.UnicornStudio), {
      once: true,
    });
    script.addEventListener("error", reject, { once: true });

    if (!existingScript) {
      script.src = UNICORN_SCRIPT_SRC;
      script.async = true;
      script.dataset.unicornStudio = "true";
      document.head.appendChild(script);
    }
  });

  return unicornStudioPromise;
}

function scheduleAfterFirstPaint(callback, isIOS) {
  let idleId = null;
  let timerId = null;

  const scheduleIdleWork = () => {
    timerId = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(callback, { timeout: isIOS ? 1800 : 1000 });
        return;
      }

      callback();
    }, isIOS ? 900 : 300);
  };

  if (document.readyState === "complete") {
    scheduleIdleWork();
  } else {
    window.addEventListener("load", scheduleIdleWork, { once: true });
  }

  return () => {
    window.removeEventListener("load", scheduleIdleWork);
    if (idleId !== null) window.cancelIdleCallback(idleId);
    if (timerId !== null) window.clearTimeout(timerId);
  };
}

function detectIOSWebKit() {
  if (typeof window === "undefined") return false;

  const ua = window.navigator.userAgent;
  const platform = window.navigator.platform || "";
  const touchPoints = window.navigator.maxTouchPoints || 0;
  const isIOSDevice =
    /iPhone|iPad|iPod/i.test(ua) ||
    (platform === "MacIntel" && touchPoints > 1);
  const isWebKit = /WebKit/i.test(ua) && !/CriOS|FxiOS|EdgiOS/i.test(ua);

  return isIOSDevice && isWebKit;
}

function getUnicornSettings() {
  if (typeof window === "undefined") {
    return {
      isIOS: false,
      scale: "0.75",
      dpi: "1",
      fps: "30",
    };
  }

  const width = window.innerWidth;
  const isMobile = width <= 640;
  const isTablet = width <= 1150;
  const isIOS = detectIOSWebKit();

  if (isIOS && isMobile) {
    return {
      isIOS: true,
      scale: "0.34",
      dpi: "0.8",
      fps: "18",
    };
  }

  if (isIOS && isTablet) {
    return {
      isIOS: true,
      scale: "0.48",
      dpi: "0.9",
      fps: "24",
    };
  }

  if (isIOS) {
    return {
      isIOS: true,
      scale: "0.62",
      dpi: "1",
      fps: "24",
    };
  }

  if (isMobile) {
    return {
      isIOS: false,
      scale: "0.45",
      dpi: "1",
      fps: "24",
    };
  }

  if (isTablet) {
    return {
      isIOS: false,
      scale: "0.6",
      dpi: "1",
      fps: "30",
    };
  }

  return {
    isIOS: false,
    scale: "0.75",
    dpi: "1",
    fps: "30",
  };
}

function UnicornAuroraBackground() {
  const embedRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [settings] = useState(() => getUnicornSettings());

  useEffect(() => {
    const embedNode = embedRef.current;
    if (!embedNode) return;

    let isMounted = true;
    let observer = null;
    let cancelScheduledInit = null;

    const startInit = () => {
      loadUnicornStudio()
        .then((studio) => {
          if (!isMounted || !studio?.init) return;
          studio.init();

          observer = new MutationObserver(() => {
            if (embedNode.querySelector("canvas")) {
              observer?.disconnect();
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  if (isMounted) setIsReady(true);
                });
              });
            }
          });

          observer.observe(embedNode, { childList: true, subtree: true });

          if (embedNode.querySelector("canvas")) {
            setIsReady(true);
          }
        })
        .catch(() => {
          if (isMounted) setIsReady(false);
        });
    };

    cancelScheduledInit = scheduleAfterFirstPaint(startInit, settings.isIOS);

    return () => {
      isMounted = false;
      cancelScheduledInit?.();
      observer?.disconnect();
    };
  }, [settings.isIOS]);

  return (
    <div
      className={`creatorial-hero-bg creatorial-hero-bg--animated${settings.isIOS ? " creatorial-hero-bg--ios-lite" : ""}`}
      aria-hidden="true"
    >
      <div className="creatorial-hero-bg__base" />
      <div
        ref={embedRef}
        className={`creatorial-hero-bg__unicorn${isReady ? " is-ready" : ""}`}
        data-us-project={PAICO_PROJECT_ID}
        data-us-scale={settings.scale}
        data-us-dpi={settings.dpi}
        data-us-fps={settings.fps}
        data-us-lazyload="true"
        data-us-production="true"
      />
      <div className="creatorial-hero-bg__gradient" />
      <div className="creatorial-hero-bg__blur" />
      <div className="creatorial-hero-bg__glow" />
      <div className="creatorial-hero-bg__glow" />
      <div className="creatorial-hero-bg__bottom-border" />
    </div>
  );
}

export default UnicornAuroraBackground;
