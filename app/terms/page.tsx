import Link from "next/link";

export const metadata = {
  title: "Умови використання"
};

export default function TermsPage() {
  return (
    <section className="max-w-3xl mx-auto px-margin-mobile py-section-padding">
      <Link
        className="inline-flex items-center gap-1 text-primary font-label-md text-label-md mb-stack-lg hover:underline"
        href="/"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Усі вакансії
      </Link>

      <div className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-lg md:p-8">
        <h1 className="font-headline-lg text-headline-lg text-text-primary mb-stack-lg">Умови використання</h1>

        <div className="flex flex-col gap-stack-md font-body-md text-body-md text-text-primary">
          <p>
            MerchUA — це агрегатор вакансій для мерчендайзерів у Львові. Ми збираємо оголошення з
            відкритих джерел і публікуємо їх у зручному вигляді для пошуку роботи.
          </p>
          <p>
            Ми не є роботодавцем і не несемо відповідальності за умови працевлаштування, вказані в
            оголошеннях — за деталями звертайтесь безпосередньо до контактів у самій вакансії.
          </p>
          <p>
            Якщо ви є автором оголошення і хочете, щоб його прибрали з сайту, напишіть нам у
            Telegram — ми оперативно відреагуємо.
          </p>
        </div>
      </div>
    </section>
  );
}
