import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

function BlindsAuroraBackground({ isActive = true }) {
  return (
    <div className="creatorial-hero-bg" aria-hidden="true">
      <div className="creatorial-hero-bg__mesh">
        <MeshGradient
          fit="contain"
          scale={0.98}
          rotation={180}
          offsetX={-0.16}
          offsetY={0}
          speed={isActive ? 1.2 : 0}
          originX={0.5}
          originY={0.5}
          worldWidth={0}
          worldHeight={0}
          colors={["#FBD5E4", "#FD9BBF", "#FCE8EE", "#FBACD2", "#FFF0F8", "#FFD1E9", "#FFF5F8", "#FDC4D9", "#FEF5F8", "#FFD1E6"]}
          distortion={0.68}
          swirl={0.61}
          grainMixer={0}
          grainOverlay={0}
          style={{
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="creatorial-hero-bg__gradient" />
    </div>
  );
}

export default BlindsAuroraBackground;
