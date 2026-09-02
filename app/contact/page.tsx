import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
import { FadeUp } from "@/components/motion/MotionPrimitives";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute:
      "Contact | Bedrijfsvideo en videoproductie in Groningen | Studio Draaidoor"
  },
  description:
    "Neem contact op met Studio Draaidoor voor een bedrijfsvideo, veiligheidsfilm, interviewvideo of andere videoproductie in Groningen en daarbuiten.",
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
            title="Een videoproject bespreken?"
            headingLevel="h1"
            text="Wilt u een bedrijfsvideo, veiligheidsfilm, interviewvideo of andere videoproductie laten maken? Neem contact met mij op om de mogelijkheden te bespreken of om vrijblijvend kennis te maken."
          />
          <div className="mt-7 grid gap-3 text-sm text-bone/[0.68]">
            <p className="rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3">
              E-mail: {site.email}
            </p>
            <p className="rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3">
              Locatie: {site.location}
            </p>
            <p className="rounded-md border border-bone/10 bg-bone/[0.03] px-4 py-3">
              Telefoon: {site.phone}
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
