import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { VideoEmbed } from "@/components/VideoEmbed";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";
import { portfolioProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio | Video's van Studio DraaiDoor"
  },
  description:
    "Bekijk videoproducties voor EEW Delfzijl en Crash Interactive, met de opdracht, mijn rol en de volledige films.",
  alternates: {
    canonical: "/portfolio"
  }
};

export default function PortfolioPage() {
  return (
    <div className="page-offset bg-ink">
      <section className="border-b border-bone/10 py-16 lg:py-20">
        <Container>
          <StaggerContainer className="max-w-[780px]">
            <StaggerItem>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper">
                Portfolio
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="type-section-large mt-4 max-w-[720px] text-bone">
                Een selectie uit mijn werk.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="body-copy mt-6 max-w-[68ch] text-bone/[0.72]">
                Hier vind je drie producties voor EEW Delfzijl en Crash
                Interactive. Bij iedere film lees je waarvoor hij is gemaakt en
                welk deel van de productie ik heb verzorgd.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {portfolioProjects.map((project, index) => (
        <section
          className="border-b border-bone/10 py-20 lg:py-28"
          key={project.slug}
        >
          <Container className="grid gap-8 lg:grid-cols-[54fr_46fr] lg:items-start lg:gap-[72px] xl:gap-20">
            <FadeUp className="lg:sticky lg:top-[calc(var(--header-height-scrolled)+32px)]">
              <VideoEmbed
                loading="eager"
                posterSrc={project.posterSrc}
                title={project.title}
                videoUrl={project.videoUrl}
              />
            </FadeUp>

            <StaggerContainer>
              <StaggerItem>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper">
                  Case {String(index + 1).padStart(2, "0")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="type-project mt-4 text-bone">
                  {project.title}
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="body-copy mt-5 max-w-[62ch] text-bone/[0.72]">
                  {project.intro}
                </p>
              </StaggerItem>
              <StaggerItem>
                <dl className="meta-copy mt-8 grid gap-5 border-y border-bone/10 py-6">
                  {[
                    ["Opdrachtgever", project.client],
                    ["Type productie", project.productionType],
                    ["Doel", project.goal],
                    ["Rol", project.role],
                    ["Resultaat", project.result]
                  ].map(([label, value]) => (
                    <div
                      className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-5"
                      key={label}
                    >
                      <dt className="font-medium text-bone/[0.52]">{label}</dt>
                      <dd className="max-w-[62ch] font-medium text-bone/[0.8]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={project.href}>
                    Bekijk volledige case
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Bespreek je project
                  </ButtonLink>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </Container>
        </section>
      ))}
    </div>
  );
}
