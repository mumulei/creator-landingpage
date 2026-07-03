import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

function BlindsAuroraBackground({ isActive = true }) {
  return (
    <div className="creatorial-hero-bg" aria-hidden="true">
      <div className="creatorial-hero-bg__mesh">
        <MeshGradient
          width={1280}
          height={720}
          colors={["#ffe5fd", "#ff8ade", "#ffadef", "#ff9ee7"]}
          distortion={0.7}
          swirl={0.6}
          grainMixer={0}
          grainOverlay={0}
          speed={isActive ? 1.2 : 0}
          scale={0.88}
          rotation={360}
          offsetX={-0.16}
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
