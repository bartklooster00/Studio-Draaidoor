import {
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  headingLevel?: "h1" | "h2";
};

export function SectionIntro({
  eyebrow,
  title,
  text,
  headingLevel = "h2"
}: SectionIntroProps) {
  const Heading = headingLevel;

  return (
    <StaggerContainer className="max-w-3xl">
      {eyebrow ? (
        <StaggerItem>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-copper">
            {eyebrow}
          </p>
        </StaggerItem>
      ) : null}
      <StaggerItem>
        <Heading className="max-w-2xl text-3xl font-semibold leading-tight text-bone sm:text-4xl">
          {title}
        </Heading>
      </StaggerItem>
      {text ? (
        <StaggerItem>
          <p className="mt-4 max-w-2xl leading-7 text-bone/[0.66]">
            {text}
          </p>
        </StaggerItem>
      ) : null}
    </StaggerContainer>
  );
}
