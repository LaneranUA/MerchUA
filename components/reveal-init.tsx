"use client";

import { useEffect } from "react";

/**
 * Легкий IntersectionObserver, що додає клас .is-visible елементам .reveal,
 * коли вони заходять у видиму область — це і є staggered fade-in карток при скролі.
 * Без зовнішніх бібліотек: чистий Web API, ~15 рядків.
 */
export function RevealInit() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return null;
}
