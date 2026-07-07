import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
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
  longDescription: string[];
  result?: string;
  href?: string;
};

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <Container>
        <SectionIntro
          eyebrow="Portfolio"
          title={project.title}
          headingLevel="h1"
          text={project.intro}
        />

        <FadeUp className="mt-10">
          <div className="overflow-hidden rounded-lg border border-bone/10 bg-smoke p-3 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video w-full rounded-md border border-bone/10 bg-ink"
              referrerPolicy="strict-origin-when-cross-origin"
              src={project.videoUrl}
              title={`${project.title} video`}
            />
          </div>
        </FadeUp>

        <StaggerContainer className="mt-8 grid gap-5 rounded-lg border border-bone/10 bg-bone/[0.035] p-6 md:grid-cols-2 lg:p-7">
          {[
            ["Opdrachtgever", project.client],
            ["Type productie", project.productionType],
            ["Doel", project.goal],
            ["Rol Studio Draaidoor", project.role]
          ].map(([label, value]) => (
            <StaggerItem key={label}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-copper">
                  {label}
                </p>
                <p className="mt-2 text-bone/[0.78]">{value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mt-10 grid gap-6 border-t border-bone/10 pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="grid max-w-3xl gap-5">
            {project.longDescription.map((paragraph) => (
              <StaggerItem key={paragraph}>
                <p className="leading-7 text-bone/[0.68]">{paragraph}</p>
              </StaggerItem>
            ))}
            <StaggerItem>
              <h2 className="text-2xl font-semibold text-bone">
                Ook een videoproject bespreken?
              </h2>
            </StaggerItem>
          </div>
          <StaggerItem>
            <ButtonLink href="/contact">Project bespreken</ButtonLink>
          </StaggerItem>
        </StaggerContainer>
        <StaggerContainer className="mt-8 flex flex-wrap gap-3 border-t border-bone/10 pt-8">
          <StaggerItem>
            <ButtonLink href="/portfolio" variant="secondary">
              Terug naar portfolio
            </ButtonLink>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  );
}
