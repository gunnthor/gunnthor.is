"use client";

import { useLayoutEffect, useRef } from "react";

/* Module state survives client navigations but not a reload, so an entrance
   animation plays once per visit instead of every time Home remounts. */
let playedNode: Element | null = null;

/**
 * Wraps a CSS entrance animation. It skips the animation on repeat visits
 * within a session, and holds it while the element is below the fold (on
 * phones the map sits under the headline), so it plays when it can be seen.
 * Without JavaScript the CSS simply runs on load.
 */
export function PlayOnce({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Strict Mode re-runs effects on the same node; only a new mount settles.
    if (playedNode && playedNode !== el) {
      el.classList.add("is-settled");
      return;
    }
    playedNode = el;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.6) return;
    el.classList.add("is-waiting");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.classList.remove("is-waiting");
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
