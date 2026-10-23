import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Contact | Videoproject bespreken | Studio DraaiDoor"
  },
  description:
    "Een bedrijfsvideo, interview, aftermovie of ander videoproject laten maken? Vertel Bart van Studio DraaiDoor wat je voor ogen hebt.",
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <section className="page-offset bg-ink">
      <Container className="section-space grid gap-10 lg:grid-cols-[0.85fr_1.05fr] lg:items-start lg:gap-[72px]">
        <div>
          <SectionIntro
            eyebrow="Contact"
            title="Vertel me over je videoproject."
            headingLevel="h1"
            text="Vertel me wat je wilt laten maken en waar je de video voor wilt gebruiken. Je hoeft nog geen uitgewerkt concept of script te hebben."
          />
          <div className="mt-8 grid gap-5 text-base text-bone/[0.68]">
            <p>
              E-mailadres:{" "}
              <a className="hover:underline focus-visible:underline focus-visible:outline-none" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p>
              Locatie: {site.location}
            </p>
            <p>
              Telefoon:{" "}
              <a className="hover:underline focus-visible:underline focus-visible:outline-none" href="tel:+31653366676">
                {site.phone}
              </a>
            </p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
