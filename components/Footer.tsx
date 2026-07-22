import Link from "next/link";
import { navigation, site } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.1] bg-coal py-14 lg:py-[72px]">
      <div className="site-container grid gap-9 min-[900px]:grid-cols-[1.2fr_0.7fr_0.9fr] min-[900px]:items-start min-[900px]:gap-20">
        <div>
          <p className="text-2xl font-bold leading-none text-white">
            {site.name}
          </p>
          <p className="mt-4 max-w-sm text-lg leading-[1.65] text-bone/[0.7]">
            {site.footerText}
          </p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-copper">
            Navigatie
          </p>
          <div className="mt-4 grid gap-2.5">
            {navigation.map((item) => (
              <Link
                className="text-lg leading-[1.65] text-bone/[0.7] transition duration-300 hover:text-white"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-copper">
            Contact
          </p>
          <div className="mt-4 space-y-2.5 text-lg leading-[1.65] text-bone/[0.7]">
            <p>
              <a className="transition-colors hover:text-white" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p>{site.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
