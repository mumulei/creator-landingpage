import React, { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const UNICORN_SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.12/dist/unicornStudio.umd.js";
const PAICO_PROJECT_ID = "D3Vd49nwPvID5Nz0VKLr";

function loadUnicornStudio() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.UnicornStudio?.init) return Promise.resolve(window.UnicornStudio);

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-unicorn-studio="true"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.UnicornStudio), {
        once: true,
      });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = UNICORN_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.unicornStudio = "true";
    script.onload = () => resolve(window.UnicornStudio);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function BlindsAuroraBackground() {
  const embedRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const embedNode = embedRef.current;
    if (!embedNode) return;

    let isMounted = true;
    let observer = null;

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

    return () => {
      isMounted = false;
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="creatorial-hero-bg creatorial-hero-bg--paico" aria-hidden="true">
      <div className="creatorial-hero-bg__mesh is-hidden">
        <MeshGradient
          fit="contain"
          scale={0.82}
          rotation={0}
          offsetX={0}
          offsetY={0}
          speed={0.85}
          originX={0.5}
          originY={0.5}
          worldWidth={0}
          worldHeight={0}
          colors={["#FDFAFF", "#FA8FDC", "#ECB9F8", "#F5F2F8", "#FDE5C9", "#FDEDF9", "#EDFCFC", "#FCE4F4", "#F9E1EC", "#E4DAFB"]}
          distortion={0.5}
          swirl={0.32}
          grainMixer={0}
          grainOverlay={0}
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        ref={embedRef}
        className={`creatorial-hero-bg__unicorn${isReady ? " is-ready" : ""}`}
        data-us-project={PAICO_PROJECT_ID}
        data-us-scale="1"
      />
      <div className="creatorial-hero-bg__gradient" />
      <div className="creatorial-hero-bg__blur" />
      <div className="creatorial-hero-bg__glow" />
      <div className="creatorial-hero-bg__glow" />
      <div className="creatorial-hero-bg__bottom-border" />
    </div>
  );
}

export default BlindsAuroraBackground;
