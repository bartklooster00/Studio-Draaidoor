import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
import { FadeUp } from "@/components/motion/MotionPrimitives";
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
        <FadeUp>
          <SectionIntro
            eyebrow="Contact"
            title="Vertel me over je videoproject."
            headingLevel="h1"
            text="Vertel me wat je wilt laten maken en waar je de video voor wilt gebruiken. Je hoeft nog geen uitgewerkt concept of script te hebben."
          />
          <div className="mt-7 grid gap-3 text-sm text-bone/[0.68]">
            <p className="rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3">
              E-mailadres: {site.email}
            </p>
            <p className="rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3">
              Locatie: {site.location}
            </p>
            <p className="rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3">
              Telefoon:{" "}
              <a href="tel:+31653366676">{site.phone}</a>
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <ContactForm />
        </FadeUp>
      </Container>
    </section>
  );
}
