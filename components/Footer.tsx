import Link from "next/link";
import { navigation, site } from "@/lib/site-data";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-bone/10 bg-coal">
      <Container className="grid gap-9 py-10 md:grid-cols-[1.4fr_0.8fr_1fr] md:items-start">
        <div>
          <p className="text-lg font-semibold leading-none text-bone">
            {site.name}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-bone/[0.62]">
            {site.footerText}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-copper">
            Navigatie
          </p>
          <div className="mt-4 grid gap-2.5">
            {navigation.map((item) => (
              <Link
                className="text-sm text-bone/60 transition duration-300 hover:text-bone"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-copper">
            Contact
          </p>
          <div className="mt-4 space-y-2.5 text-sm text-bone/60">
            <p>{site.email}</p>
            <p>Telefoon: {site.phone}</p>
            <p>{site.location}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
