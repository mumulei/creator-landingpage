const defaultLayers = [
  {
    zIndex: 1,
    blur: "0.5px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%)"
  },
  {
    zIndex: 2,
    blur: "1px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%)"
  },
  {
    zIndex: 3,
    blur: "2px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%)"
  },
  {
    zIndex: 4,
    blur: "4px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%)"
  },
  {
    zIndex: 5,
    blur: "8px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%)"
  },
  {
    zIndex: 6,
    blur: "16px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%)"
  },
  {
    zIndex: 7,
    blur: "32px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%)"
  },
  {
    zIndex: 8,
    blur: "64px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%)"
  }
];

const iPhoneLayers = [
  {
    zIndex: 1,
    blur: "1px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 16%, rgba(0, 0, 0, 1) 48%, rgba(0, 0, 0, 0) 64%)"
  },
  {
    zIndex: 2,
    blur: "4px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 34%, rgba(0, 0, 0, 1) 48%, rgba(0, 0, 0, 1) 72%, rgba(0, 0, 0, 0) 86%)"
  },
  {
    zIndex: 3,
    blur: "12px",
    mask: "linear-gradient(to top, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 1) 76%, rgba(0, 0, 0, 1) 100%)"
  }
];

function isIPhoneWebKit() {
  if (typeof window === "undefined") return false;

  const { navigator, screen } = window;
  const ua = navigator.userAgent;
  const isWebKit = /AppleWebKit/i.test(ua);
  const isIPhoneUA = /iPhone|iPod/i.test(ua);
  const isDesktopModeIPhone =
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1 &&
    Math.min(screen.width, screen.height) <= 440;

  return isWebKit && (isIPhoneUA || isDesktopModeIPhone);
}

export default function GradientBlurTop() {
  const isIPhone = isIPhoneWebKit();
  const activeLayers = isIPhone ? iPhoneLayers : defaultLayers;

  return (
    <div className={`gradient-blur-top${isIPhone ? " gradient-blur-top--iphone" : ""}`}>
      {activeLayers.map((layer) => {
        const style = {
          opacity: 1,
          position: "absolute",
          inset: 0,
          zIndex: layer.zIndex,
          maskImage: layer.mask,
          WebkitMaskImage: layer.mask,
          borderRadius: "0px",
          pointerEvents: "none",
          backdropFilter: `blur(${layer.blur})`,
          WebkitBackdropFilter: `blur(${layer.blur})`
        };

        return (
          <div
            key={layer.zIndex}
            style={style}
          />
        );
      })}
    </div>
  );
}
