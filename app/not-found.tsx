import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 px-margin-mobile gap-stack-md">
      <span className="material-symbols-outlined !text-6xl text-outline">work_off</span>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Вакансію не знайдено</h1>
      <p className="font-body-md text-body-md text-text-secondary max-w-sm">
        Можливо, вона вже деактивована або посилання застаріле.
      </p>
      <Link
        className="mt-stack-sm bg-primary-container text-on-primary font-label-md text-label-md px-stack-lg py-3 rounded-full hover:opacity-90 transition-all"
        href="/"
      >
        Усі вакансії
      </Link>
    </section>
  );
}
