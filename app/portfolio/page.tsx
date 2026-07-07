import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";
import { portfolioProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio | Videoprojecten van Studio Draaidoor"
  },
  description:
    "Bekijk videoprojecten van Studio Draaidoor, van veiligheidsfilms en promo video’s tot lanceringsvideo’s voor bedrijven en organisaties."
};

function PortfolioVideo({
  title,
  videoUrl
}: {
  title: string;
  videoUrl: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-bone/10 bg-smoke p-2 shadow-[0_30px_90px_rgba(0,0,0,0.3)] sm:p-3">
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full rounded-md border border-bone/10 bg-ink"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={videoUrl}
        title={`${title} video`}
      />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="bg-ink lg:snap-y lg:snap-proximity">
      <section className="flex min-h-[78svh] items-end border-b border-bone/10 py-16 sm:py-20 lg:snap-start">
        <Container>
          <StaggerContainer className="max-w-4xl">
            <StaggerItem>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper">
                Portfolio
              </p>
            </StaggerItem>
            <StaggerItem>
              <h1 className="mt-4 text-5xl font-semibold leading-tight text-bone sm:text-7xl">
                Videoprojecten als hoofdstukken
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-6 max-w-2xl text-base leading-7 text-bone/[0.68] sm:text-lg sm:leading-8">
                Een selectie van producties waarin communicatie, uitstraling en
                bruikbaarheid samenkomen. Scroll door veiligheidscommunicatie,
                promo en interne video als compacte cases.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {portfolioProjects.map((project, index) => (
        <section
          className="border-b border-bone/10 py-16 sm:py-20 lg:min-h-[100svh] lg:snap-start lg:py-24"
          key={project.slug}
        >
          <Container className="grid gap-10 lg:grid-cols-[1.14fr_0.86fr] lg:items-start">
            <FadeUp className="lg:sticky lg:top-24">
              <PortfolioVideo title={project.title} videoUrl={project.videoUrl} />
            </FadeUp>

            <StaggerContainer className="flex min-h-[60svh] flex-col justify-center">
              <StaggerItem>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper">
                  Case {String(index + 1).padStart(2, "0")}
                </p>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mt-4 text-4xl font-semibold leading-tight text-bone sm:text-5xl">
                  {project.title}
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-5 max-w-xl leading-7 text-bone/[0.68]">
                  {project.intro}
                </p>
              </StaggerItem>
              <StaggerItem>
                <dl className="mt-8 grid gap-5 border-y border-bone/10 py-6 text-sm">
                  {[
                    ["Opdrachtgever", project.client],
                    ["Type productie", project.productionType],
                    ["Doel", project.goal],
                    ["Rol", project.role],
                    ["Resultaat", project.result]
                  ].map(([label, value]) => (
                    <div
                      className="grid gap-1 sm:grid-cols-[0.32fr_1fr]"
                      key={label}
                    >
                      <dt className="text-bone/45">{label}</dt>
                      <dd className="font-medium leading-6 text-bone/[0.78]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={project.href}>Bekijk project</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Project bespreken
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
