import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { SectionIntro } from "@/components/SectionIntro";

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
            <div className="mt-10 max-w-[65ch]">
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
          </div>
          <div>
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
              <Image
                alt="Bart Klooster buiten"
                className="object-cover object-[50%_32%]"
                fill
                quality={95}
                sizes="(min-width: 1024px) 45vw, 100vw"
                src="/images/bart-portret-2026.webp"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space-compact border-t border-white/[0.16] bg-ink">
        <Container>
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2 md:gap-y-12">
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
              <article key={title}>
                <h3 className="text-xl font-semibold text-bone">{title}</h3>
                <p className="mt-4 max-w-[65ch] leading-7 text-bone/[0.62]">
                  {text}
                </p>
              </article>
          ))}
          </div>
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
