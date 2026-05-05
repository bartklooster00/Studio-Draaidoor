import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import {
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
};

export function CtaBand({
  eyebrow = "Klaar om uw project te bespreken?",
  title = "Een videoproject bespreken?",
  buttonLabel = "Project bespreken"
}: CtaBandProps) {
  return (
    <section className="border-y border-copper/10 bg-bone py-12 text-ink sm:py-14">
      <Container className="grid gap-6 md:grid-cols-[1.4fr_auto] md:items-center">
        <div>
          <StaggerContainer>
            <StaggerItem>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-copper-dark">
                {eyebrow}
              </p>
            </StaggerItem>
            <StaggerItem>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
                {title}
              </h2>
            </StaggerItem>
          </StaggerContainer>
        </div>
        <StaggerContainer>
          <StaggerItem>
            <ButtonLink href="/contact" variant="dark">
              {buttonLabel}
            </ButtonLink>
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  );
}
