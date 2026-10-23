import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
import { VideoEmbed } from "@/components/VideoEmbed";
import { portfolioProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Veiligheidsvideo laten maken | Studio DraaiDoor"
  },
  description:
    "Poortinstructies, veiligheidsinstructies en toolboxvideo’s voor bedrijven. Videoproductie met kennis van de praktijk.",
  alternates: {
    canonical: "https://www.studiodraaidoor.nl/veiligheidsvideo-laten-maken"
  }
};

const applications = [
  {
    title: "Poortinstructievideo",
    text: "Voor bezoekers, contractors, chauffeurs en tijdelijke medewerkers. Laat vooraf zien welke regels gelden en wat zij op jouw locatie kunnen verwachten."
  },
  {
    title: "Veiligheidsinstructievideo",
    text: "Laat bij een specifieke werkzaamheid, machine of procedure zien welke stappen en veiligheidsmaatregelen van belang zijn."
  },
  {
    title: "Toolboxvideo",
    text: "Een korte video rond één veiligheidsonderwerp, bedoeld voor een toolboxmeeting of andere terugkerende instructie."
  }
];

const productionSteps = [
  {
    title: "Inhoud en doelgroep",
    paragraphs: [
      "Je levert de bestaande informatie aan, bijvoorbeeld als presentatie, procedure of script. We bespreken wie de video gaat zien, wat diegene moet weten en waar de film wordt gebruikt."
    ]
  },
  {
    title: "Van tekst naar beeld",
    paragraphs: [
      "We bepalen welke informatie in beeld kan worden getoond en welke uitleg nodig blijft. Ook kijken we welke plekken, werkzaamheden en mensen belangrijk zijn voor de opnames.",
      "Je organisatie beoordeelt en accordeert de veiligheidsinhoud voordat de opnames beginnen."
    ]
  },
  {
    title: "Opnames op locatie",
    paragraphs: [
      "Ik film op de plek waar de instructie van toepassing is, met aandacht voor de werkzaamheden en de regels die daar gelden. Als de productie daarom vraagt, schakel ik extra mensen of apparatuur in."
    ]
  },
  {
    title: "Montage en oplevering",
    paragraphs: [
      "Na de opnames monteer ik de film. Waar nodig voegen we ondertiteling, voice-over of grafische uitleg toe en maken we versies voor verschillende talen of toepassingen."
    ]
  }
];

const frequentlyAskedQuestions = [
  {
    question: "Wat kost een veiligheidsvideo?",
    answer:
      "Dat hangt af van de inhoud, opnamedagen, lengte, montage en eventuele taalversies. Na een gesprek kan ik een voorstel maken dat bij jouw opdracht past."
  },
  {
    question: "Kunnen we bestaande instructies gebruiken?",
    answer:
      "Ja. Een bestaande presentatie, procedure, instructiefilm of script is vaak een goed vertrekpunt. We bekijken samen hoe we die informatie het beste naar video vertalen."
  },
  {
    question: "Kan de video in meerdere talen?",
    answer:
      "Ja. We kunnen bijvoorbeeld werken met ondertiteling of een voice-over, afhankelijk van de doelgroep en de toepassing."
  },
  {
    question: "Kan de video later worden aangepast?",
    answer:
      "Vaak wel. Tekst, ondertiteling en voice-over zijn meestal aan te passen zonder nieuwe opnames. Als een locatie of werkwijze verandert, kunnen aanvullende beelden nodig zijn."
  }
];

const serviceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Veiligheidsvideo laten maken voor industrie",
  serviceType:
    "productie van veiligheidsvideo’s, poortinstructievideo’s en toolboxvideo’s",
  provider: {
    "@type": "Organization",
    name: "Studio DraaiDoor",
    url: "https://www.studiodraaidoor.nl"
  },
  areaServed: {
    "@type": "Country",
    name: "Nederland"
  },
  url: "https://www.studiodraaidoor.nl/veiligheidsvideo-laten-maken"
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.studiodraaidoor.nl/"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Veiligheidsvideo laten maken",
      item: "https://www.studiodraaidoor.nl/veiligheidsvideo-laten-maken"
    }
  ]
};

export default function VeiligheidsvideoPage() {
  const eewProject = portfolioProjects.find(
    (project) => project.slug === "eew-delfzijl-veiligheidsfilm"
  );

  if (!eewProject) {
    throw new Error("EEW-projectdata ontbreekt.");
  }

  return (
    <div className="page-offset bg-ink">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData).replace(/</g, "\\u003c")
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData).replace(
            /</g,
            "\\u003c"
          )
        }}
        type="application/ld+json"
      />

      <section className="bg-ink pb-16 pt-16 lg:pb-20 lg:pt-20">
        <Container>
          <SectionIntro
            headingLevel="h1"
            title="Veiligheidsvideo laten maken"
          />
          <div className="mt-7 max-w-[880px]">
              <p className="body-copy text-bone/[0.72]">
                Een poortinstructie, veiligheidsinstructie of toolboxvideo moet
                begrijpelijk zijn voor de mensen die ermee werken. Ik vertaal de
                aangeleverde veiligheidsinformatie naar beelden van de eigen
                locatie. Daarbij combineer ik videoproductie met mijn ervaring als
                veiligheidskundige.
              </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">
                Bespreek je veiligheidsvideo
              </ButtonLink>
              <ButtonLink
                href="/portfolio/eew-delfzijl-veiligheidsfilm"
                variant="secondary"
              >
                Bekijk de EEW-case
              </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.16] bg-ink py-16 lg:py-28">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="type-section max-w-[620px] text-bone">
            Maak duidelijk welke regels op jouw locatie gelden.
          </h2>
          <div className="grid max-w-[68ch] gap-5">
            <p className="body-copy text-bone/[0.72]">
              Op locaties waar mensen werken of op bezoek komen, moet
              veiligheidsinformatie begrijpelijk zijn. Toch staat die informatie
              vaak verspreid over procedures, presentaties en mondelinge uitleg.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Met video kun je de situatie laten zien. Waar lopen mensen, welke
              regels gelden er en wat moet iemand weten voordat hij het terrein
              opgaat? Door de eigen locatie te filmen, wordt de uitleg herkenbaar.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Een veiligheidsvideo kun je vooraf toesturen, tijdens een
              poortinstructie tonen of gebruiken bij onboarding. De
              veiligheidsinhoud blijft bij jouw organisatie; ik help om die helder
              in beeld te brengen.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-space bg-ink">
        <Container>
          <h2 className="type-section max-w-[720px] text-bone">
            Van poortinstructie tot toolboxvideo
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {applications.map((application) => (
              <article key={application.title}>
                <h3 className="text-2xl font-semibold text-bone">
                  {application.title}
                </h3>
                <p className="mt-4 leading-7 text-bone/[0.66]">
                  {application.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space border-t border-white/[0.16] bg-ink">
        <Container>
          <SectionIntro
            title="Van 35 tot 40 minuten naar circa 6,5 minuut"
            text="Voor EEW Delfzijl maakte ik een nieuwe poortinstructievideo voor medewerkers en bezoekers. De vorige instructiefilm duurde ongeveer 35 tot 40 minuten. De nieuwe video behandelt de belangrijkste informatie in circa 6,5 minuut."
          />
          <div className="mt-10 lg:mt-12">
            <VideoEmbed
              loading="lazy"
              posterSrc={eewProject.posterSrc}
              title={eewProject.title}
              videoUrl={eewProject.videoUrl}
            />
          </div>
          <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div className="grid max-w-[68ch] gap-5">
                <p className="body-copy text-bone/[0.72]">
                  EEW leverde de veiligheidsinhoud en het grootste deel van het
                  script aan. Ik dacht mee over de opbouw en verzorgde de opnames
                  op locatie, de montage en de oplevering.
                </p>
                <p className="body-copy text-bone/[0.72]">
                  De film is opgeleverd in het Nederlands, Engels en Duits. Zo kan
                  EEW dezelfde locatiegerichte informatie aan verschillende
                  doelgroepen laten zien.
                </p>
            </div>
            <div>
              <ul className="grid gap-3 text-bone/[0.76]">
                <li>Film van circa 6,5 minuut</li>
                <li>Voor bezoekers en medewerkers</li>
                <li>Opgeleverd in drie talen</li>
                <li>Gefilmd en gemonteerd voor EEW Delfzijl</li>
              </ul>
              <div className="mt-7">
                <ButtonLink href="/portfolio/eew-delfzijl-veiligheidsfilm">
                  Bekijk de EEW-case
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-space bg-ink">
        <Container>
          <h2 className="type-section max-w-[720px] text-bone">
            Zo maken we een veiligheidsvideo.
          </h2>
          <div className="mt-10 grid gap-12 md:gap-14">
            {productionSteps.map((step) => (
              <article
                className="grid gap-4 md:grid-cols-[0.55fr_1fr] md:gap-8"
                key={step.title}
              >
                <h3 className="text-2xl font-semibold text-bone">
                  {step.title}
                </h3>
                <div className="grid max-w-[68ch] gap-4">
                  {step.paragraphs.map((paragraph) => (
                    <p className="leading-7 text-bone/[0.66]" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-space border-t border-white/[0.16] bg-ink">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="type-section max-w-[620px] text-bone">
            Videoproductie met kennis van veiligheid
          </h2>
          <div className="grid max-w-[68ch] gap-5">
            <p className="body-copy text-bone/[0.72]">
              Een veiligheidsfilm moet niet alleen prettig te bekijken zijn. De
              informatie moet kloppen en herkenbaar zijn voor de mensen die ermee
              werken.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Naast videoproducties werk ik als veiligheidskundige. Daardoor
              begrijp ik de context van werkplekken, instructies en risico&apos;s. De
              inhoudelijke goedkeuring van veiligheidsregels en procedures ligt
              altijd bij jouw organisatie.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Studio DraaiDoor werkt vanuit Groningen en filmt voor opdrachtgevers
              door heel Nederland.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-ink pb-16 pt-[72px] lg:pb-20 lg:pt-[120px]">
        <Container>
          <h2 className="type-section max-w-[720px] text-bone">
            Veelgestelde vragen
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {frequentlyAskedQuestions.map((item) => (
              <article key={item.question}>
                <h3 className="text-xl font-semibold text-bone">
                  {item.question}
                </h3>
                <p className="mt-4 leading-7 text-bone/[0.66]">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-white/[0.16] bg-ink py-16 sm:py-20">
        <Container className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-3xl font-bold leading-[1.08] text-bone sm:text-4xl">
              Een veiligheidsvideo voor jouw locatie?
            </h2>
            <p className="mt-5 max-w-[68ch] leading-7 text-bone/[0.68]">
              Heb je een poortinstructie, presentatie of werkinstructie die je als
              video wilt aanbieden? Vertel me wat je nodig hebt. Dan bespreken we
              hoe we dat in beeld kunnen brengen.
            </p>
          </div>
          <ButtonLink href="/contact">Bespreek je veiligheidsvideo</ButtonLink>
        </Container>
      </section>
    </div>
  );
}
