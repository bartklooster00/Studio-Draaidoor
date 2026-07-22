import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { SectionIntro } from "@/components/SectionIntro";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: {
    absolute:
      "Over Studio Draaidoor | Bart Klooster, videograaf voor bedrijven en organisaties"
  },
  description:
    "Ik ben Bart Klooster van Studio Draaidoor. Ik maak videoproducties voor bedrijven, organisaties en events met focus op heldere communicatie en professionele uitstraling."
};

export default function OverPage() {
  return (
    <div className="page-offset bg-ink">
      <section className="section-space bg-ink">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionIntro
              eyebrow="Over Studio Draaidoor"
              title="Professioneel in beeld, zonder onnodig gedoe"
              headingLevel="h1"
              text="Ik ben Bart Klooster, oprichter van Studio Draaidoor. Ik maak videoproducties voor bedrijven, organisaties en events die niet alleen goed moeten ogen, maar ook functioneel moeten zijn in communicatie en uitstraling."
            />
            <FadeUp className="mt-8">
              <div className="rounded-lg border border-bone/10 bg-bone/[0.035] p-6 lg:p-7">
                <h2 className="text-2xl font-semibold text-bone">
                  Bart Klooster
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-copper">
                  Oprichter van Studio Draaidoor
                </p>
                <p className="mt-5 leading-7 text-bone/[0.68]">
                  Achter Studio Draaidoor sta ik, Bart Klooster. Met een
                  praktische aanpak en oog voor kwaliteit werk ik aan
                  videoproducties die inhoud en uitstraling combineren. Van
                  eerste afstemming tot eindmontage zorg ik voor duidelijke
                  communicatie en een verzorgd eindresultaat.
                </p>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.08}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-bone/10 lg:aspect-[5/6]">
              <Image
                alt="Bart Klooster met dronecontroller in het veld"
                className="object-cover object-[50%_35%] md:object-[50%_36%]"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                src="/images/bart-drone-controller.jpg"
              />
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="section-space-compact bg-coal">
        <Container>
          <StaggerContainer className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            [
              "Professionele uitstraling",
              "Ik zorg voor verzorgd beeld, goed geluid en een montage die past bij zakelijke communicatie."
            ],
            [
              "Heldere communicatie",
              "Ik werk met duidelijke afspraken, korte lijnen en een aanpak die overzichtelijk blijft."
            ],
            [
              "Betrouwbare samenwerking",
              "Ik werk gestructureerd en denk mee over wat nodig is om tot een bruikbaar eindresultaat te komen."
            ],
            [
              "Praktische aanpak",
              "Ik houd het proces efficiënt en doelgericht, zonder onnodig complexe productielagen."
            ]
          ].map(([title, text]) => (
            <StaggerItem key={title}>
              <article className="flex h-full flex-col rounded-lg border border-bone/10 bg-bone/[0.035] p-6 transition duration-300 hover:border-copper/35">
                <h3 className="text-xl font-semibold text-bone">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-bone/[0.62]">
                  {text}
                </p>
              </article>
            </StaggerItem>
          ))}
          </StaggerContainer>
        </Container>
      </section>

      <CtaBand />
    </div>
  );
}
