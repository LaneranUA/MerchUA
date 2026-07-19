import { TelegramIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contacts">
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="footer-brand__mark">UA</span>
          <div>
            <p className="footer-brand__name">MerchUA</p>
            <p className="footer-brand__tagline">Ваш надійний путівник у світі вакансій Львова.</p>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-column__title">Посилання</p>
          <a href="/#about">Про проєкт</a>
          <a href="/#contacts">Контакти</a>
          <a href="/terms">Умови використання</a>
        </div>

        <div className="footer-column">
          <p className="footer-column__title">Ми в мережах</p>
          <a href="https://t.me" rel="noreferrer" target="_blank">
            <TelegramIcon className="meta-icon" />
            Telegram канал
          </a>
          <a href="https://bsky.app" rel="noreferrer" target="_blank">
            Bluesky
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} MerchUA. Всі права захищені.</p>
      </div>
    </footer>
  );
}
