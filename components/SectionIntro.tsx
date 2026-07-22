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
    <StaggerContainer className="max-w-[780px]">
      {eyebrow ? (
        <StaggerItem>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-copper">
            {eyebrow}
          </p>
        </StaggerItem>
      ) : null}
      <StaggerItem>
        <Heading className="type-section max-w-[720px] text-bone">
          {title}
        </Heading>
      </StaggerItem>
      {text ? (
        <StaggerItem>
          <p className="body-copy mt-5 max-w-[68ch] text-bone/[0.72]">
            {text}
          </p>
        </StaggerItem>
      ) : null}
    </StaggerContainer>
  );
}
