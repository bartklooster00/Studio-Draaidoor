import type { Metadata } from "next";
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
    absolute:
      "Diensten | Videoproductie voor bedrijven, interviews, aftermovies en podcasts"
  },
  description:
    "Ik maak videoproducties voor bedrijven en organisaties, zoals bedrijfsvideo’s, interviews, podcasts en aftermovies. Bekijk welke vorm het beste past bij uw doel."
};

export default function DienstenPage() {
  return (
    <>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionIntro
            eyebrow="Diensten"
            title="Videoproducties voor bedrijven, organisaties en events"
            headingLevel="h1"
            text="Ik help bedrijven en organisaties met videoproducties die professioneel ogen en direct inzetbaar zijn voor communicatie, zichtbaarheid en merkbeleving. Denk aan bedrijfsvideo’s, interviews, podcasts en aftermovies die passen bij het doel, de doelgroep en de boodschap."
          />
          <StaggerContainer className="mt-10 grid gap-4">
            {services.map((service, index) => (
              <StaggerItem key={service.title}>
                <article className="grid gap-5 rounded-lg border border-bone/10 bg-bone/[0.032] p-6 transition duration-300 hover:border-copper/35 md:grid-cols-[0.28fr_1fr] lg:p-7">
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
        </Container>
      </section>

      <section className="bg-coal py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            eyebrow="Werkwijze"
            title="Van idee tot oplevering"
            text="Ik houd het traject overzichtelijk, met korte lijnen en duidelijke afstemming. Zo weet u waar u aan toe bent en werk ik toe naar een eindresultaat dat direct bruikbaar is."
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
        eyebrow="Benieuwd wat past bij uw organisatie?"
        title="Een videoproject bespreken?"
        buttonLabel="Project bespreken"
      />
    </>
  );
}
