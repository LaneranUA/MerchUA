import { HeroBackground } from "@/components/hero-background";

type HeroProps = {
  q?: string;
  category?: string;
  totalVacancies: number;
  categoriesCount: number;
};

export function Hero({ q, category, totalVacancies, categoriesCount }: HeroProps) {
  return (
    <section className="hero-container pt-16 pb-20 px-margin-mobile">
      <HeroBackground />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-text-primary mb-stack-md">
          Знайди роботу у Львові — швидко і без зайвого
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary mb-stack-lg max-w-2xl mx-auto">
          Свіжі вакансії для мерчендайзерів з перевірених джерел — в одному зручному місці, без реєстрацій і зайвого спаму.
        </p>

        {/* GET-форма: пошук працює без JS, зберігає SEO-дружні URL типу /?q=кур'єр */}
        <form action="/" className="relative max-w-2xl mx-auto mb-stack-lg" method="get">
          {category ? <input name="category" type="hidden" value={category} /> : null}
          <div className="flex items-center bg-white border border-surface-border rounded-full p-2 pl-6 custom-shadow focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
            <span className="material-symbols-outlined text-outline mr-2">search</span>
            <input
              className="flex-grow border-none focus:ring-0 font-body-md text-body-md placeholder:text-outline bg-transparent outline-none"
              defaultValue={q}
              name="q"
              placeholder="Пошук за ключовими словами (напр. Кур'єр)"
              type="search"
            />
            <button
              className="bg-primary-container text-on-primary font-label-md text-label-md px-8 py-3 rounded-full hover:bg-primary transition-colors"
              type="submit"
            >
              Знайти
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-stack-lg">
          <div>
            <p className="font-headline-md text-headline-md text-text-primary">{totalVacancies}</p>
            <p className="font-body-sm text-body-sm text-text-secondary">активних вакансій</p>
          </div>
          <div>
            <p className="font-headline-md text-headline-md text-text-primary">{categoriesCount || "∞"}</p>
            <p className="font-body-sm text-body-sm text-text-secondary">категорій</p>
          </div>
          <div>
            <p className="font-headline-md text-headline-md text-text-primary">24/7</p>
            <p className="font-body-sm text-body-sm text-text-secondary">оновлення бази</p>
          </div>
        </div>
      </div>
    </section>
  );
}
