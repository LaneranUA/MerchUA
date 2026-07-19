"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";

import { VacancyCard } from "@/components/vacancy-card";
import type { VacancyListItem } from "@/lib/vacancies";

type VacancyGridProps = {
  items: VacancyListItem[];
};

function Reveal({ children, delay = 0 }: PropsWithChildren<{ delay?: number }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`reveal ${visible ? "is-visible" : ""}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function VacancyGrid({ items }: VacancyGridProps) {
  return (
    <div className="jobs-grid">
      {items.map((vacancy, index) => (
        <Reveal delay={(index % 6) * 80} key={vacancy.id}>
          <VacancyCard vacancy={vacancy} />
        </Reveal>
      ))}
    </div>
  );
}
