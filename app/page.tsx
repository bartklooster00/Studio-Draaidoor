import Image from "next/image";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionIntro } from "@/components/SectionIntro";
import { ServiceCard } from "@/components/ServiceCard";
import {
  HeroImageMotion,
  PageLoadStagger,
  StaggerContainer,
  StaggerItem,
  StaggerListItem
} from "@/components/motion/MotionPrimitives";
import { portfolioProjects, processSteps, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute:
      "Studio Draaidoor | Bedrijfsvideo laten maken voor bedrijven en organisaties"
  },
  description:
    "Studio Draaidoor maakt bedrijfsvideo’s, veiligheidsfilms, interviews, podcasts en aftermovies voor bedrijven en organisaties. Professioneel, helder en direct inzetbaar."
};

export default function HomePage() {
  const featuredProject = portfolioProjects[0];

  return (
    <>
      <section className="relative min-h-[calc(86svh-5rem)] overflow-hidden bg-ink">
        <HeroImageMotion className="absolute inset-0">
          <Image
            priority
            alt="Videograaf op set tijdens een filmopname"
            className="object-cover object-[58%_52%] opacity-[0.46] md:object-center"
            fill
            sizes="100vw"
            src="/images/studio-draaidoor-production-setup.png"
          />
        </HeroImageMotion>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,11,0.97)_0%,rgba(11,11,11,0.78)_46%,rgba(11,11,11,0.38)_100%)]" />

        <Container className="relative flex min-h-[calc(86svh-5rem)] items-center py-16 sm:py-20">
          <PageLoadStagger className="max-w-5xl" delay={0.08}>
            <StaggerItem>
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-copper">
                Professionele videoproductie
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-bone sm:text-6xl lg:text-7xl">
                Videoproducties voor bedrijven, organisaties en events
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-xl text-base leading-7 text-bone/[0.74] sm:text-lg sm:leading-8">
                Ik maak videoproducties voor bedrijven, organisaties en events
                die helder willen communiceren en professioneel in beeld willen
                komen. Van bedrijfsvideo’s en veiligheidsfilms tot interviews,
                podcasts en aftermovies: ik zorg voor een productie die niet
                alleen sterk oogt, maar ook direct inzetbaar is.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/portfolio">Bekijk portfolio</ButtonLink>
                <ButtonLink href="/diensten" variant="secondary">
                  Bekijk diensten
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Project bespreken
                </ButtonLink>
              </div>
            </StaggerItem>
          </PageLoadStagger>
        </Container>
      </section>

      <section className="bg-coal py-16 sm:py-20">
        <Container>
          <SectionIntro
            eyebrow="Portfolio"
            title="Werk dat laat zien wat ik lever"
            text="Ik help bedrijven en organisaties met videoproducties die helder communiceren, professioneel ogen en direct inzetbaar zijn. In mijn portfolio laat ik zien hoe ik verschillende producties aanpak, van veiligheidsfilms tot promotievideo’s en interne communicatie."
          />
          <StaggerContainer className="mt-9 grid gap-8 rounded-lg border border-bone/10 bg-bone/[0.025] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:grid-cols-[0.9fr_1fr] md:items-center md:p-5">
            <StaggerItem>
              <ProjectCard project={featuredProject} />
            </StaggerItem>
            <StaggerItem>
              <div className="px-1 pb-2 md:px-4 md:pb-0">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-copper">
                  Uitgelicht project
                </p>
                <h3 className="mt-4 max-w-md text-2xl font-semibold leading-tight text-bone">
                  EEW Delfzijl Veiligheidsfilm
                </h3>
                <p className="mt-4 max-w-md leading-7 text-bone/[0.64]">
                  Voor EEW Energy from Waste Delfzijl B.V. maakte ik een
                  compacte veiligheidsfilm / poortinstructie die medewerkers en
                  bezoekers snel en duidelijk informeert over de belangrijkste
                  veiligheidsregels op locatie.
                </p>
                <div className="mt-6">
                  <ButtonLink
                    href={featuredProject.href ?? "/portfolio"}
                    variant="secondary"
                  >
                    Bekijk case
                  </ButtonLink>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionIntro
            eyebrow="Diensten"
            title="Wat ik maak"
            text="Ik help bedrijven en organisaties met videoproducties die professioneel ogen en direct inzetbaar zijn voor communicatie, zichtbaarheid en merkbeleving."
          />
          <StaggerContainer className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <StaggerItem key={service.title}>
                <ServiceCard
                  description={service.description}
                  index={index}
                  title={service.title}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <StaggerContainer className="mt-8">
            <StaggerItem>
              <ButtonLink href="/diensten" variant="secondary">
                Bekijk alle diensten
              </ButtonLink>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <section className="bg-coal py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionIntro
            eyebrow="Werkwijze"
            title="Van idee tot oplevering"
            text="Ik werk met korte lijnen, duidelijke afspraken en een aanpak die praktisch blijft. Zo ontstaat een eindresultaat dat professioneel oogt en direct bruikbaar is."
          />
          <StaggerContainer className="grid gap-3">
            {processSteps.map((step, index) => (
              <StaggerListItem
                className="flex items-center gap-4 rounded-lg border border-bone/10 bg-bone/[0.03] px-5 py-4 transition duration-300 hover:border-copper/30"
                key={step}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-md border border-copper/25 bg-copper/[0.08] font-mono text-sm text-copper">
                  {index + 1}.
                </span>
                <span className="text-bone/[0.78]">{step}</span>
              </StaggerListItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
