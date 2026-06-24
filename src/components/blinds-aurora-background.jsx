import React from "react";

function BlindsAuroraBackground() {
  return (
    <div className="creatorial-hero-bg" aria-hidden="true">
      <video
        src="/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          inset: 0
        }}
      />
    </div>
  );
}

export default BlindsAuroraBackground;
