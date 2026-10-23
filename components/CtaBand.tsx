import Link from "next/link";
import { Container } from "./Container";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
};

export function CtaBand({
  eyebrow = "Klaar om uw project te bespreken?",
  title = "Een videoproject bespreken?",
  buttonLabel = "Project bespreken"
}: CtaBandProps) {
  return (
    <section className="border-t border-white/[0.16] bg-ink py-16 text-white sm:py-20">
      <Container className="grid gap-8 md:grid-cols-[1.4fr_auto] md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper">
            {eyebrow}
          </p>
          <h2 className="type-section mt-4 max-w-3xl text-white">{title}</h2>
        </div>
        <Link
          className="editorial-arrow-link inline-flex min-h-11 items-center gap-3 justify-self-start border-b border-white/40 text-lg font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:justify-self-end"
          href="/contact"
        >
          {buttonLabel}
          <span aria-hidden className="editorial-arrow">
            →
          </span>
        </Link>
      </Container>
    </section>
  );
}
