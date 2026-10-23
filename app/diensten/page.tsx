import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { SectionIntro } from "@/components/SectionIntro";
import { processSteps, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Diensten | Studio DraaiDoor"
  },
  description:
    "Bekijk de videoproducties van Studio DraaiDoor: bedrijfsvideo’s, interviews, videopodcasts, aftermovies en veiligheidsvideo’s.",
  alternates: {
    canonical: "/diensten"
  }
};

export default function DienstenPage() {
  const serviceIds: Record<string, string> = {
    Aftermovies: "aftermovie",
    Interviews: "interview",
    "Bedrijfsvideo’s": "bedrijfsvideo"
  };

  return (
    <div className="page-offset bg-ink">
      <section className="section-space bg-ink">
        <Container>
          <SectionIntro
            eyebrow="Diensten"
            title="Videoproductie voor bedrijven"
            headingLevel="h1"
            text="Een bedrijfsvideo, interview, aftermovie of videopodcast vraagt telkens iets anders. Ik bespreek met je voor wie de film bedoeld is, verzorg de opnames en monteer voor het gebruik dat je voor ogen hebt."
          />
          <div className="mt-12 grid gap-14 md:gap-[88px]">
            {services.map((service) => (
              <article
                className="scroll-mt-28 grid gap-4 md:grid-cols-[30fr_70fr] md:gap-12"
                id={serviceIds[service.title]}
                key={service.title}
              >
                <h2 className="text-[23px] font-semibold leading-tight text-bone md:text-[26px]">
                  {service.title}
                </h2>
                <div className="max-w-[65ch]">
                  <p className="text-lg font-medium leading-[1.5] text-bone">
                    {service.description}
                  </p>
                  <p className="mt-3 text-base font-normal leading-[1.65] text-bone/[0.66] md:mt-4">
                    {service.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <h2 className="text-2xl font-semibold text-bone">
                  Veiligheids- en instructievideo’s
                </h2>
                <p className="mt-3 max-w-[58ch] leading-7 text-bone/[0.66]">
                  Van poortinstructies tot toolboxen: laat veiligheidsinformatie
                  zien op de plek waar deze van belang is.
                </p>
              </div>
              <ButtonLink
                href="/veiligheidsvideo-laten-maken"
                variant="secondary"
              >
                Bekijk veiligheidsvideo’s
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space-compact border-t border-white/[0.16] bg-ink">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <SectionIntro
            eyebrow="Werkwijze"
            title="Van eerste idee tot eindmontage"
            text="Je hoeft bij het eerste gesprek nog geen script klaar te hebben. We bespreken wat je wilt bereiken, bepalen wat daarvoor nodig is en werken van daaruit naar de opnames en montage."
          />
          <ol className="grid gap-7">
            {processSteps.map((step, index) => (
              <li className="flex items-center gap-5" key={step}>
                <span className="shrink-0 text-sm font-bold text-copper">
                  {index + 1}.
                </span>
                <span className="text-lg text-bone/[0.78]">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        eyebrow="Heb je iets in gedachten?"
        title="Vertel me wat je wilt maken."
        buttonLabel="Neem contact op"
      />
    </div>
  );
}
