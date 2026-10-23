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
    absolute: "Over Bart Klooster | Studio DraaiDoor"
  },
  description:
    "Maak kennis met Bart Klooster, videomaker en oprichter van Studio DraaiDoor. Direct contact van het eerste gesprek tot de montage.",
  alternates: {
    canonical: "/over"
  }
};

export default function OverPage() {
  return (
    <div className="page-offset bg-ink">
      <section className="section-space bg-ink">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionIntro
              eyebrow="Over Studio DraaiDoor"
              title="De maker achter Studio DraaiDoor."
              headingLevel="h1"
              text="Studio DraaiDoor is een zelfstandig videoproductiebedrijf uit Groningen. Ik maak films voor bedrijven en organisaties, van interviews en projectfilms tot video’s voor interne communicatie."
            />
            <FadeUp className="mt-8">
              <div className="rounded-lg border border-bone/10 bg-bone/[0.035] p-6 lg:p-7">
                <h2 className="text-2xl font-semibold text-bone">
                  Bart Klooster
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-copper">
                  Videomaker en oprichter
                </p>
                <p className="mt-5 leading-7 text-bone/[0.68]">
                  Mijn naam is Bart Klooster. Ik ben betrokken vanaf het eerste
                  gesprek en verzorg het camerawerk en de montage. Als een
                  productie om extra mensen of apparatuur vraagt, stem ik dat met
                  je af en schakel ik mijn netwerk in.
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
              "Eerst de opdracht",
              "Voor wie maken we de film, en wat moet die persoon na het kijken weten of begrijpen? Dat bespreken we voordat we gaan filmen."
            ],
            [
              "Aandacht voor mensen",
              "Niet iedereen staat dagelijks voor een camera. Ik neem de tijd voor de opname en let op licht, beeld en geluid."
            ],
            [
              "Direct contact",
              "Je overlegt met mij over planning, opnames en montage. Zo weet je wie de keuzes maakt en bij wie je terechtkunt met vragen."
            ],
            [
              "De juiste inzet per productie",
              "Soms is één camera voldoende, soms zijn extra mensen of apparatuur nodig. We bespreken vooraf wat bij de opdracht past."
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

      <CtaBand
        eyebrow="Heb je een idee voor een video?"
        title="Laten we je project bespreken."
        buttonLabel="Neem contact op"
      />
    </div>
  );
}
