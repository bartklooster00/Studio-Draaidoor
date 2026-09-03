import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
import { VideoEmbed } from "@/components/VideoEmbed";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";

type Project = {
  title: string;
  client: string;
  productionType: string;
  goal: string;
  role: string;
  intro: string;
  videoUrl: string;
  posterSrc: string;
  longDescription: string[];
  result?: string;
};

type ProjectDetailProps = {
  project: Project;
  relatedServiceLink?: {
    href: string;
    label: string;
  };
};

export function ProjectDetail({
  project,
  relatedServiceLink
}: ProjectDetailProps) {
  const metadata = [
    ["Opdrachtgever", project.client],
    ["Type productie", project.productionType],
    ["Doel", project.goal],
    ["Rol Studio Draaidoor", project.role],
    ...(project.result ? [["Resultaat", project.result]] : [])
  ];

  return (
    <section className="page-offset bg-ink">
      <div className="section-space">
        <Container>
          <SectionIntro
            eyebrow="Portfolio"
            title={project.title}
            headingLevel="h1"
            text={project.intro}
          />

          <FadeUp className="mt-12 lg:mt-16">
            <div id="project-video">
              <VideoEmbed
                loading="eager"
                posterSrc={project.posterSrc}
                title={project.title}
                videoUrl={project.videoUrl}
              />
            </div>
          </FadeUp>

          <StaggerContainer className="meta-copy mt-10 border-y border-bone/10 py-8">
            <dl className="grid gap-6">
              {metadata.map(([label, value]) => (
                <StaggerItem key={label}>
                  <div className="grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-6">
                    <dt className="font-medium text-bone/[0.54]">{label}</dt>
                    <dd className="max-w-[68ch] text-bone/[0.8]">{value}</dd>
                  </div>
                </StaggerItem>
              ))}
            </dl>
          </StaggerContainer>

          <StaggerContainer className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="grid max-w-[68ch] gap-5">
              {project.longDescription.map((paragraph) => (
                <StaggerItem key={paragraph}>
                  <p className="body-copy text-bone/[0.72]">{paragraph}</p>
                </StaggerItem>
              ))}
              <StaggerItem>
                <h2 className="text-2xl font-bold leading-[1.2] text-bone">
                  Ook een videoproject bespreken?
                </h2>
              </StaggerItem>
            </div>
            <StaggerItem className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#project-video">
                Bekijk video
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Project bespreken
              </ButtonLink>
            </StaggerItem>
          </StaggerContainer>

          <StaggerContainer className="mt-8 border-t border-bone/10 pt-8">
            <StaggerItem className="flex flex-col gap-3 sm:flex-row">
              {relatedServiceLink ? (
                <ButtonLink
                  href={relatedServiceLink.href}
                  variant="secondary"
                >
                  {relatedServiceLink.label}
                </ButtonLink>
              ) : null}
              <ButtonLink href="/portfolio" variant="secondary">
                Terug naar portfolio
              </ButtonLink>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </div>
    </section>
  );
}
