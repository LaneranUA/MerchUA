import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty-state">
          <h1>Вакансію не знайдено</h1>
          <p>Можливо, вона вже деактивована або URL був змінений.</p>
          <Link className="button" href="/">
            Повернутися до списку
          </Link>
        </div>
      </div>
    </section>
  );
}
