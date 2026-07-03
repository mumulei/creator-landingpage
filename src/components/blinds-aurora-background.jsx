import React from "react";
import { MeshGradient } from "@paper-design/shaders-react";

function BlindsAuroraBackground({ isActive = true }) {
  return (
    <div className="creatorial-hero-bg" aria-hidden="true">
      <div className="creatorial-hero-bg__mesh">
        <MeshGradient
          width={1280}
          height={720}
          colors={["#ffe5fe", "#ff8ade", "#ffadef"]}
          distortion={0.68}
          swirl={0.2}
          grainMixer={0}
          grainOverlay={0}
          speed={isActive ? 1.36 : 0}
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
