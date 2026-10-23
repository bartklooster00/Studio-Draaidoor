"use client";

import { useEffect, useRef, type ReactNode } from "react";

type EditorialRevealProps = {
  children: ReactNode;
  className?: string;
};

export function EditorialReveal({
  children,
  className = ""
}: EditorialRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    element.dataset.revealReady = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.revealVisible = "true";
        observer.disconnect();
      },
      { threshold: 0.18 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`editorial-reveal ${className}`} ref={elementRef}>
      {children}
    </div>
  );
}
