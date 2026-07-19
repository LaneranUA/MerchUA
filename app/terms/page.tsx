import Link from "next/link";

export const metadata = {
  title: "Умови використання"
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="detail-backlink">
          <Link href="/">← Назад до всіх вакансій</Link>
        </div>

        <article className="detail-card">
          <p className="eyebrow">MerchUA</p>
          <h1>Умови використання</h1>

          <div className="markdown">
            <p>
              MerchUA — це агрегатор вакансій для мерчендайзерів у Львові. Ми збираємо оголошення
              з відкритих джерел і публікуємо їх у зручному вигляді для пошуку роботи.
            </p>
            <p>
              Ми не є роботодавцем і не несемо відповідальності за умови працевлаштування,
              вказані в оголошеннях — за деталями звертайтесь безпосередньо до контактів у самій
              вакансії.
            </p>
            <p>
              Якщо ви є автором оголошення і хочете, щоб його прибрали з сайту, напишіть нам у
              Telegram — ми оперативно відреагуємо.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
