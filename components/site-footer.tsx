import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="bg-surface-container-low border-t border-surface-border py-12" id="contacts">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start md:items-center gap-stack-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img alt="MerchUA" className="h-8 w-8 object-contain" src="/logo.png" />
            <span className="font-label-md text-label-md font-bold text-text-primary">MerchUA</span>
          </div>
          <p className="font-body-sm text-body-sm text-text-secondary max-w-xs">
            Ваш надійний путівник у світі вакансій Львова.
          </p>
        </div>

        <div className="flex flex-wrap gap-stack-lg">
          <div className="flex flex-col gap-2">
            <h4 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Посилання</h4>
            <nav className="flex flex-col gap-1">
              <a className="font-body-sm text-body-sm text-text-secondary hover:text-primary transition-colors" href="/#about">
                Про проєкт
              </a>
              <a className="font-body-sm text-body-sm text-text-secondary hover:text-primary transition-colors" href="/#contacts">
                Контакти
              </a>
              <a className="font-body-sm text-body-sm text-text-secondary hover:text-primary transition-colors" href="/terms">
                Умови використання
              </a>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Ми в мережах</h4>
            <div className="flex flex-col gap-2">
              <a
                className="flex items-center gap-2 font-body-sm text-body-sm text-primary-container font-semibold hover:opacity-80"
                href="https://t.me/merchUA"
                rel="noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Telegram канал
              </a>
              <a
                className="flex items-center gap-2 font-body-sm text-body-sm text-primary-container font-semibold hover:opacity-80"
                href="https://bsky.app/profile/merchua.bsky.social"
                rel="noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">cloud</span>
                BlueSky
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-6 border-t border-surface-border flex justify-between items-center">
        <p className="font-body-sm text-body-sm text-outline">
          © {new Date().getFullYear()} MerchUA. Всі права захищені. Sourced from Telegram.
        </p>
      </div>
    </footer>
  );
}
