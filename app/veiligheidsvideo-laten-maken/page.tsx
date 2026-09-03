import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { SectionIntro } from "@/components/SectionIntro";
import { VideoEmbed } from "@/components/VideoEmbed";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem
} from "@/components/motion/MotionPrimitives";
import { portfolioProjects } from "@/lib/site-data";

export const metadata: Metadata = {
  title: {
    absolute: "Veiligheidsvideo laten maken | Studio Draaidoor"
  },
  description:
    "Laat veiligheidsregels en poortinstructies vertalen naar een heldere video voor medewerkers, contractors en bezoekers. Actief door heel Nederland.",
  alternates: {
    canonical: "https://www.studiodraaidoor.nl/veiligheidsvideo-laten-maken"
  }
};

const applications = [
  {
    title: "Poortinstructievideo",
    text: "Voor bezoekers, contractors, chauffeurs en tijdelijke medewerkers. De video maakt hen vóór of bij aankomst bekend met uw locatie, veiligheidsregels en belangrijkste risico’s."
  },
  {
    title: "Veiligheidsinstructievideo",
    text: "Voor het uitleggen van een specifieke werkzaamheid, machine, procedure of veiligheidsmaatregel. De kijker ziet wat er wordt verwacht én hoe de situatie er in de praktijk uitziet."
  },
  {
    title: "Toolboxvideo",
    text: "Een korte video over één veiligheidsonderwerp. Geschikt voor een toolboxmeeting, interne campagne of terugkerende instructie."
  }
];

const productionSteps = [
  {
    title: "Inhoud en doelgroep",
    paragraphs: [
      "U levert de bestaande informatie aan, bijvoorbeeld als presentatie, procedure, script of huidige instructievideo. Samen bepalen we wie de video gaat bekijken, wat diegene moet weten en waar de video wordt gebruikt."
    ]
  },
  {
    title: "Vertaling naar beeld",
    paragraphs: [
      "Ik help de informatie terug te brengen tot een logische video-opbouw. Wat moet worden verteld? Wat kunnen we beter laten zien? En welke locaties, werkzaamheden of medewerkers zijn nodig voor de opnames?",
      "Uw organisatie controleert en accordeert de veiligheidsinhoud voordat we gaan filmen."
    ]
  },
  {
    title: "Opnames op locatie",
    paragraphs: [
      "Ik verzorg de opnames met aandacht voor de dagelijkse werkzaamheden en regels op uw terrein. Vraagt de productie om extra mensen of specialistische kennis? Dan kan ik hiervoor mijn netwerk inschakelen, terwijl u één aanspreekpunt houdt."
    ]
  },
  {
    title: "Montage en oplevering",
    paragraphs: [
      "Na de opnames verzorg ik de montage en eventuele ondertiteling, grafische uitleg en voice-over. De video kan in de benodigde talen en formaten worden opgeleverd voor uw website, interne omgeving, toegangssysteem of presentatie."
    ]
  }
];

const frequentlyAskedQuestions = [
  {
    question: "Wat kost een veiligheidsvideo?",
    answer:
      "De prijs hangt af van de voorbereiding, lengte, opnamedagen, montage en gewenste taalversies. Na een eerste gesprek ontvangt u een voorstel op basis van de productie die bij uw situatie past."
  },
  {
    question: "Kunnen bestaande instructies als basis worden gebruikt?",
    answer:
      "Ja. Een bestaande presentatie, procedure, video of script vormt vaak een goed uitgangspunt. Ik help de informatie te ordenen en te vertalen naar beeld."
  },
  {
    question: "Kan de video in meerdere talen worden opgeleverd?",
    answer:
      "Ja. Vanuit dezelfde productie kunnen versies met ondertiteling of een professionele voice-over in de benodigde talen worden gemaakt."
  },
  {
    question: "Kan de video later worden aangepast?",
    answer:
      "Dat hangt af van de wijziging. Tekst, ondertiteling en voice-over zijn vaak aan te passen zonder nieuwe opnames. Veranderen de locatie, werkzaamheden of praktijksituaties, dan kunnen aanvullende opnames nodig zijn."
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
    name: "Studio Draaidoor",
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
            title="Veiligheidsvideo laten maken voor industrie"
          />
          <StaggerContainer className="mt-7 max-w-[880px]">
            <StaggerItem>
              <p className="body-copy text-bone/[0.72]">
                Studio Draaidoor vertaalt bestaande veiligheidsinformatie naar
                een professionele video voor medewerkers, contractors en
                bezoekers. Ik denk mee over de opbouw en verzorg de opnames,
                montage, taalversies en oplevering. Omdat ik daarnaast in de
                veiligheidskunde werk, begrijp ik ook de omgeving waarin de
                video wordt gebruikt.
              </p>
            </StaggerItem>
          </StaggerContainer>
          <StaggerContainer className="mt-8 flex flex-col gap-3 sm:flex-row">
            <StaggerItem>
              <ButtonLink href="/contact">
                Bespreek uw veiligheidsvideo
              </ButtonLink>
            </StaggerItem>
            <StaggerItem>
              <ButtonLink
                href="/portfolio/eew-delfzijl-veiligheidsfilm"
                variant="secondary"
              >
                Bekijk de EEW-case
              </ButtonLink>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <section className="bg-coal py-16 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="type-section max-w-[620px] text-bone">
            Dezelfde veiligheidsinformatie voor iedere kijker
          </h2>
          <div className="grid max-w-[68ch] gap-5">
            <p className="body-copy text-bone/[0.72]">
              Veiligheidsinformatie staat vaak verspreid over presentaties,
              documenten en procedures. Een deel wordt mondeling toegelicht.
              Dat kost iedere keer opnieuw tijd en maakt het lastig om
              medewerkers en bezoekers op dezelfde manier te informeren.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Een veiligheidsvideo brengt die informatie samen. U kunt op de
              werkelijke locatie laten zien welke regels gelden, waar risico’s
              aanwezig zijn, welke PBM verplicht zijn en wat iemand bij een
              incident moet doen.
            </p>
            <p className="body-copy text-bone/[0.72]">
              De video kan vooraf worden toegestuurd, bij de toegang worden
              vertoond of worden gebruikt tijdens onboarding en interne
              instructies. Zo beschikt uw organisatie over één duidelijke basis
              die steeds opnieuw kan worden ingezet.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-space bg-ink">
        <Container>
          <h2 className="type-section max-w-[720px] text-bone">
            Van poortinstructie tot toolboxvideo
          </h2>
          <StaggerContainer className="mt-10 grid gap-8 md:grid-cols-3">
            {applications.map((application) => (
              <StaggerItem
                className="border-t border-bone/10 pt-6"
                key={application.title}
              >
                <h3 className="text-2xl font-semibold text-bone">
                  {application.title}
                </h3>
                <p className="mt-4 leading-7 text-bone/[0.66]">
                  {application.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="section-space-compact bg-coal">
        <Container>
          <SectionIntro
            title="Van 35 minuten instructie naar 6,5 minuut video"
            text="Voor EEW Energy from Waste Delfzijl maakte ik een nieuwe veiligheidsfilm voor medewerkers en bezoekers. De bestaande instructievideo duurde ongeveer 35 tot 40 minuten. De nieuwe video brengt de belangrijkste informatie in ongeveer 6,5 minuut over."
          />
          <FadeUp className="mt-10 lg:mt-12">
            <VideoEmbed
              loading="lazy"
              posterSrc={eewProject.posterSrc}
              title={eewProject.title}
              videoUrl={eewProject.videoUrl}
            />
          </FadeUp>
          <StaggerContainer className="mt-9 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div className="grid max-w-[68ch] gap-5">
              <StaggerItem>
                <p className="body-copy text-bone/[0.72]">
                  EEW leverde de veiligheidsinhoud en het grootste deel van het
                  script aan. Ik dacht mee over de opbouw en vertaling naar
                  beeld en verzorgde vervolgens de opnames, montage en volledige
                  oplevering.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="body-copy text-bone/[0.72]">
                  De veiligheidsfilm werd uitgevoerd in het Nederlands, Engels
                  en Duits. Vanuit één productie kan EEW daardoor verschillende
                  doelgroepen dezelfde locatiegerichte uitleg geven.
                </p>
              </StaggerItem>
            </div>
            <StaggerItem>
              <ul className="grid gap-3 border-t border-bone/10 pt-5 text-bone/[0.76]">
                <li>Veiligheidsfilm van circa 6,5 minuut</li>
                <li>Voor medewerkers en bezoekers</li>
                <li>Opgeleverd in drie talen</li>
                <li>Opnames, montage en oplevering door Studio Draaidoor</li>
              </ul>
              <div className="mt-7">
                <ButtonLink href="/portfolio/eew-delfzijl-veiligheidsfilm">
                  Bekijk de EEW-case
                </ButtonLink>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      <section className="section-space bg-ink">
        <Container>
          <h2 className="type-section max-w-[720px] text-bone">
            Zo komt uw veiligheidsvideo tot stand
          </h2>
          <StaggerContainer className="mt-10 border-t border-bone/10">
            {productionSteps.map((step) => (
              <StaggerItem
                className="grid gap-4 border-b border-bone/10 py-7 md:grid-cols-[0.55fr_1fr] md:gap-8"
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="section-space-compact bg-coal">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="type-section max-w-[620px] text-bone">
            Videoproductie met kennis van veiligheid
          </h2>
          <div className="grid max-w-[68ch] gap-5">
            <p className="body-copy text-bone/[0.72]">
              Een veiligheidsvideo moet er niet alleen goed uitzien. De inhoud
              moet duidelijk zijn, de locatie herkenbaar en de uitleg
              begrijpelijk voor mensen die uw organisatie nog niet kennen.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Mijn achtergrond in communicatie, videoproductie en
              veiligheidskunde komt hier samen. Daardoor kan ik gericht
              meedenken, ook wanneer de aangeleverde informatie technisch of
              uitgebreid is.
            </p>
            <p className="body-copy text-bone/[0.72]">
              Studio Draaidoor werkt vanuit Groningen en voert videoproducties
              uit door heel Nederland.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-ink pb-16 pt-[72px] lg:pb-20 lg:pt-[120px]">
        <Container>
          <h2 className="type-section max-w-[720px] text-bone">
            Veelgestelde vragen
          </h2>
          <StaggerContainer className="mt-10 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {frequentlyAskedQuestions.map((item) => (
              <StaggerItem
                className="border-t border-bone/10 py-7"
                key={item.question}
              >
                <h3 className="text-xl font-semibold text-bone">
                  {item.question}
                </h3>
                <p className="mt-4 leading-7 text-bone/[0.66]">
                  {item.answer}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="border-y border-bone/10 bg-coal py-12 sm:py-14">
        <Container className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-3xl font-bold leading-[1.08] text-bone sm:text-4xl">
              Uw veiligheidsinstructie duidelijk in beeld?
            </h2>
            <p className="mt-5 max-w-[68ch] leading-7 text-bone/[0.68]">
              Heeft u een bestaande poortinstructie, presentatie of
              veiligheidsprocedure die duidelijker en compacter kan worden
              overgebracht? Dan kijk ik graag mee naar de inhoud en de
              mogelijkheden voor video.
            </p>
          </div>
          <ButtonLink href="/contact">Bespreek uw veiligheidsvideo</ButtonLink>
        </Container>
      </section>
    </div>
  );
}
