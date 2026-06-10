import React, { useState, useEffect, useRef } from "react";

/**
 * ScrollReveal Component
 * Automatically adds the "is-visible" class when the element enters the viewport.
 * Works alongside CSS transition/animation rules.
 */
export default function ScrollReveal({
  children,
  as: Component = "div",
  threshold = 0.3,
  rootMargin = "0px 0px -50px 0px",
  className = "",
  style = {},
  ...props
}) {
  const [inView, setInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, show content immediately
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (observer && currentElement) {
        observer.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  return (
    <Component
      ref={elementRef}
      className={`${className} ${inView ? "is-visible" : ""}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}
