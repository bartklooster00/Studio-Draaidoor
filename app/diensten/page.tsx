import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { SectionIntro } from "@/components/SectionIntro";
import {
  StaggerContainer,
  StaggerItem,
  StaggerListItem
} from "@/components/motion/MotionPrimitives";
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
          <StaggerContainer className="mt-10 grid gap-4">
            {services.map((service, index) => (
              <StaggerItem key={service.title}>
                <article
                  className="scroll-mt-28 grid gap-5 rounded-lg border border-bone/10 bg-bone/[0.032] p-6 transition duration-300 hover:border-copper/35 md:grid-cols-[0.28fr_1fr] lg:p-7"
                  id={serviceIds[service.title]}
                >
                  <div>
                    <p className="text-xs font-bold text-copper">
                      0{index + 1}
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold text-bone">
                      {service.title}
                    </h2>
                  </div>
                  <div>
                    <p className="font-medium leading-7 text-bone">
                      {service.description}
                    </p>
                    <p className="mt-4 leading-7 text-bone/[0.66]">
                      {service.detail}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="mt-10 border-t border-bone/10 pt-8">
            <StaggerItem className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
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
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <section className="section-space-compact bg-coal">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            eyebrow="Werkwijze"
            title="Van eerste idee tot eindmontage"
            text="Je hoeft bij het eerste gesprek nog geen script klaar te hebben. We bespreken wat je wilt bereiken, bepalen wat daarvoor nodig is en werken van daaruit naar de opnames en montage."
          />
          <StaggerContainer className="grid gap-3">
            {processSteps.map((step, index) => (
              <StaggerListItem
                className="flex items-center gap-4 rounded-lg border border-bone/10 bg-bone/[0.03] px-5 py-4"
                key={step}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-copper/25 bg-copper/[0.08] text-sm font-bold text-copper">
                  {index + 1}.
                </span>
                <span className="text-bone/[0.78]">{step}</span>
              </StaggerListItem>
            ))}
          </StaggerContainer>
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
