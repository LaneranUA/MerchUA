// Суто декоративний, статичний рендер (без JS) — анімації йдуть через CSS keyframes.
export function HeroBackground() {
  return (
    <div className="hero-animated-bg" aria-hidden="true">
      <div className="floating-shape text-primary w-96 h-96 -top-20 -left-20" />
      <div
        className="floating-shape text-secondary-fixed-dim w-[500px] h-[500px] -bottom-40 -right-20"
        style={{ animationDelay: "-2s" }}
      />
      <div className="floating-shape text-primary-fixed w-72 h-72 top-1/4 left-1/2" style={{ animationDelay: "-4s" }} />

      <div className="floating-icon left-[10%] top-[20%]">
        <span className="material-symbols-outlined !text-4xl">work</span>
      </div>
      <div className="floating-icon right-[15%] top-[15%]" style={{ animationDelay: "-3s" }}>
        <span className="material-symbols-outlined !text-4xl">search</span>
      </div>
      <div className="floating-icon left-[15%] bottom-[20%]" style={{ animationDelay: "-6s" }}>
        <span className="material-symbols-outlined !text-4xl">description</span>
      </div>
      <div className="floating-icon right-[10%] bottom-[30%]" style={{ animationDelay: "-9s" }}>
        <span className="material-symbols-outlined !text-4xl">distance</span>
      </div>
    </div>
  );
}
