import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionIntro } from "@/components/SectionIntro";
import {
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

export default function PortfolioPage() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <Container>
        <SectionIntro
          eyebrow="Portfolio"
          title="Portfolio"
          headingLevel="h1"
          text="In mijn portfolio laat ik zien hoe ik videoproducties inzet voor bedrijven en organisaties. Hier vindt u voorbeelden van veiligheidsfilms, promo video’s en interne communicatievideo’s waarin inhoud, uitstraling en helderheid samenkomen."
        />

        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portfolioProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-12 grid gap-6 border-t border-bone/10 pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <StaggerItem>
            <p className="max-w-2xl text-xl font-semibold leading-8 text-bone">
              Wilt u ook een videoproject laten maken dat helder communiceert en
              professioneel oogt?
            </p>
          </StaggerItem>
          <StaggerItem>
            <ButtonLink href="/contact">Project bespreken</ButtonLink>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  );
}
