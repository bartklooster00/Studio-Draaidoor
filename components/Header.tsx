import Link from "next/link";
import { navigation, site } from "@/lib/site-data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-bone/10 bg-ink/[0.88] backdrop-blur-xl">
      <nav
        className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Hoofdnavigatie"
      >
        <Link className="group flex items-center gap-3" href="/">
          <span className="grid size-10 place-items-center rounded-md border border-copper/50 bg-copper/15 text-sm font-black text-copper transition group-hover:bg-copper group-hover:text-ink">
            SD
          </span>
          <span className="text-base font-semibold tracking-wide text-bone">
            {site.name}
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <Link
              className="relative text-sm text-bone/70 transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 hover:text-copper hover:after:scale-x-100"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          className="hidden rounded-md border border-bone/20 px-4 py-2 text-sm font-medium text-bone transition hover:border-copper hover:text-copper sm:inline-flex"
          href="/contact"
        >
          Plan een gesprek
        </Link>
      </nav>
      <div className="mx-auto flex w-full max-w-7xl gap-5 overflow-x-auto px-5 pb-4 sm:px-8 md:hidden">
        {navigation.map((item) => (
          <Link
            className="shrink-0 text-sm text-bone/70 transition duration-300 hover:text-copper"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
