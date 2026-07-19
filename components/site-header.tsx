import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">UA</span>
          <span>MerchUA</span>
        </Link>

        <nav className="nav-links" aria-label="Основна навігація">
          <a href="/#about">Про проєкт</a>
          <a href="/#contacts">Контакти</a>
        </nav>

        <div className="header-actions">
          <a
            className="icon-button"
            href="https://bsky.app"
            rel="noreferrer"
            target="_blank"
          >
            Bluesky
          </a>
          <a className="button button-secondary button-small" href="/#about">
            Для рекрутерів
          </a>
        </div>
      </div>
    </header>
  );
}
