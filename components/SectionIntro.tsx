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
  const headingClass =
    headingLevel === "h1" ? "type-section-large" : "type-section";

  return (
    <div className="max-w-[780px]">
      {eyebrow ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.26em] text-copper">
          {eyebrow}
        </p>
      ) : null}
      <Heading className={`${headingClass} max-w-[720px] text-bone`}>
        {title}
      </Heading>
      {text ? (
        <p className="body-copy mt-6 max-w-[65ch] text-bone/[0.72]">
          {text}
        </p>
      ) : null}
    </div>
  );
}
