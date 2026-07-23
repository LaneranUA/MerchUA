import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 w-full z-50 bg-surface-container-lowest border-b border-surface-border">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link className="flex items-center gap-stack-sm" href="/">
          <img alt="MerchUA" className="h-8 w-8 object-contain" src="/logo.png" />
          <span className="hidden md:inline font-headline-sm text-headline-sm font-bold text-primary">MerchUA</span>
        </Link>

        <nav className="flex items-center gap-stack-md md:gap-stack-lg">
          <a className="font-label-md text-label-md text-text-secondary hover:text-primary transition-colors" href="/#about">
            Про нас
          </a>
          <a className="font-label-md text-label-md text-text-secondary hover:text-primary transition-colors" href="/#contacts">
            Контакти
          </a>
          <a
            className="flex items-center text-primary-container hover:opacity-80 transition-opacity"
            href="https://bsky.app/profile/merchua.bsky.social"
            rel="noreferrer"
            target="_blank"
            aria-label="Bluesky"
          >
            <span className="material-symbols-outlined">send</span>
          </a>
          <a
            className="hidden md:block bg-primary-container text-on-primary font-label-md text-label-md px-stack-lg py-2 rounded-full hover:opacity-90 transition-all"
            href="/#about"
          >
            
          </a>
        </nav>
      </div>
    </header>
  );
}
