import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: {
    absolute: "Privacyverklaring | Studio DraaiDoor"
  },
  description:
    "Lees hoe Studio DraaiDoor omgaat met contactgegevens, cookies, statistieken en externe diensten.",
  alternates: {
    canonical: "/privacy"
  },
  robots: {
    index: false,
    follow: false
  }
};

const sectionClass = "max-w-[74ch]";
const headingClass = "text-2xl font-semibold leading-tight text-bone sm:text-3xl";
const paragraphClass = "mt-5 text-base leading-8 text-bone/[0.7] sm:text-lg";
const linkClass =
  "text-bone underline decoration-bone/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export default function PrivacyPage() {
  return (
    <div className="page-offset bg-ink">
      <Container className="section-space">
        <header className="max-w-[900px]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-copper">
            Privacy
          </p>
          <h1 className="mt-5 text-[clamp(2rem,9.5vw,6.5rem)] font-extrabold leading-[0.98] text-white sm:text-[clamp(3rem,6vw,6.5rem)]">
            Privacyverklaring
          </h1>
          <p className="mt-8 max-w-[65ch] text-lg leading-8 text-bone/[0.72] sm:text-xl">
            In deze privacyverklaring lees je welke persoonsgegevens Studio
            DraaiDoor verwerkt, waarom dat gebeurt en welke keuzes en rechten je
            hebt.
          </p>
        </header>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:gap-20">
          <section className={sectionClass}>
            <h2 className={headingClass}>Wie verantwoordelijk is</h2>
            <p className={paragraphClass}>
              Studio DraaiDoor is een eenmanszaak en is verantwoordelijk voor de
              verwerking van persoonsgegevens die via deze website worden
              ontvangen.
            </p>
            <address className={`${paragraphClass} not-italic`}>
              Studio DraaiDoor
              <br />
              Zuiderkerkstraat 6
              <br />
              9712 PZ Groningen
              <br />
              KvK 99331012
              <br />
              Btw-id NL005379995B93
              <br />
              <a className={linkClass} href="mailto:info@studiodraaidoor.nl">
                info@studiodraaidoor.nl
              </a>
              <br />
              <a className={linkClass} href="tel:+31653366676">
                06 53 36 66 76
              </a>
            </address>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Contactaanvragen</h2>
            <p className={paragraphClass}>
              Via het contactformulier verwerken we je naam, bedrijfsnaam,
              e-mailadres, telefoonnummer en bericht, voor zover je die gegevens
              invult. We gebruiken deze gegevens om je vragen te beantwoorden en
              mogelijke opdrachten met je te bespreken. We gebruiken je
              formuliergegevens niet voor ongevraagde marketing.
            </p>
            <p className={paragraphClass}>
              Vraag je om een offerte of neem je contact op over een mogelijke
              opdracht, dan kan de verwerking nodig zijn om op jouw verzoek stappen
              te zetten voordat we een overeenkomst sluiten. Bij algemene
              contactvragen kan ons gerechtvaardigde belang om je vraag te
              beantwoorden de grondslag zijn. We gebruiken die grondslag alleen als
              de verwerking noodzakelijk is en jouw privacybelangen niet zwaarder
              wegen.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Hoe lang gegevens worden bewaard</h2>
            <p className={paragraphClass}>
              Leidt je contactaanvraag niet tot een opdracht, dan verwijderen we je
              gegevens uiterlijk zes maanden na het laatste inhoudelijke contact,
              tenzij een andere geldige bewaarplicht geldt. Dit verwijderbeleid geldt
              ook voor kopieën van je aanvraag in onze zakelijke mailbox.
            </p>
            <p className={paragraphClass}>
              Gegevens die onderdeel worden van een opdracht, factuur of zakelijke
              administratie bewaren we volgens de toepasselijke wettelijke
              bewaartermijnen. Voor facturen en de zakelijke administratie is dat
              doorgaans zeven jaar vanwege de fiscale bewaarplicht.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Formspree</h2>
            <p className={paragraphClass}>
              Voor de technische verwerking van het contactformulier gebruiken we
              Formspree. De gegevens die je invult worden daarom aan Formspree
              doorgegeven. We gebruiken het gratis abonnement. Dat biedt volgens
              Formspree 30 dagen formuliergeschiedenis in het dashboard. Dit is geen
              garantie dat alle gegevens na 30 dagen definitief uit iedere omgeving
              van Formspree zijn verwijderd.
            </p>
            <p className={paragraphClass}>
              Formspree vermeldt dat zijn diensten via Amazon Web Services in de
              Verenigde Staten worden gehost en dat het als verwerker gebruikmaakt
              van standaardcontractbepalingen, ook wel SCC&apos;s genoemd.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Google Analytics 4</h2>
            <p className={paragraphClass}>
              Google Analytics 4 wordt alleen geladen nadat je analytische cookies
              hebt geaccepteerd. Na je toestemming meten we paginaweergaven en
              succesvol verzonden contactaanvragen. Zo&apos;n contactaanvraag wordt
              geregistreerd als <code className="mx-1 text-[0.92em] text-bone">generate_lead</code>.
              Namen, e-mailadressen, telefoonnummers, berichtinhoud en de parameter
              <code className="mx-1 text-[0.92em] text-bone">oppref</code>
              verzenden we niet als GA4-eventgegevens.
            </p>
            <p className={paragraphClass}>
              De bewaartermijn voor gegevens op gebruikers- en gebeurtenisniveau
              staat op twee maanden. Google Signals en advertentiepersonalisatie
              staan uit.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Cookies en je keuze aanpassen</h2>
            <p className={paragraphClass}>
              We gebruiken noodzakelijke browseropslag om je keuze te onthouden.
              Analytische cookies worden pas geplaatst nadat je op
              <span className="mx-1 text-bone">Cookies accepteren</span>
              hebt geklikt. Je kunt ook kiezen voor
              <span className="mx-1 text-bone">Cookies weigeren</span>.
              Via <span className="text-bone">Cookie-instellingen</span> in de
              footer kun je je keuze later aanpassen of intrekken. Het
              contactformulier blijft werken als je analytische cookies weigert.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>YouTube-video&apos;s</h2>
            <p className={paragraphClass}>
              Projectvideo&apos;s worden eerst als een lokale afbeelding weergegeven.
              De externe YouTube-speler wordt pas geladen wanneer je op die afbeelding
              klikt. We gebruiken daarvoor <code className="mx-1 text-[0.92em] text-bone">youtube-nocookie.com</code>.
              Dat beperkt bepaalde vormen van personalisatie, maar betekent niet dat
              YouTube geen gegevens kan verwerken. Wanneer je een video afspeelt,
              maakt je browser contact met YouTube en kan YouTube onder meer
              technische gegevens en informatie over het afspelen ontvangen.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Je privacyrechten</h2>
            <p className={paragraphClass}>
              Je kunt ons vragen om inzage, correctie of verwijdering van je
              persoonsgegevens. Afhankelijk van je situatie kun je ook vragen om
              beperking van de verwerking, bezwaar maken, je toestemming intrekken of
              gegevensoverdraagbaarheid verzoeken. Stuur je verzoek naar{" "}
              <a className={linkClass} href="mailto:info@studiodraaidoor.nl">
                info@studiodraaidoor.nl
              </a>.
              We vragen alleen om aanvullende informatie om je identiteit te
              controleren als dat noodzakelijk en proportioneel is. Ben je niet
              tevreden over hoe we met je persoonsgegevens omgaan, dan kun je een
              klacht indienen bij de{" "}
              <a
                className={linkClass}
                href="https://autoriteitpersoonsgegevens.nl"
              >
                Autoriteit Persoonsgegevens
              </a>.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Internationale doorgifte</h2>
            <p className={paragraphClass}>
              Formspree, Google Analytics en YouTube kunnen persoonsgegevens buiten de
              Europese Economische Ruimte verwerken. Formspree vermeldt dat het voor
              doorgifte als verwerker standaardcontractbepalingen gebruikt. Google
              beschrijft in zijn eigen privacy- en doorgifte-informatie welke
              waarborgen voor Google Analytics en YouTube worden gebruikt.
            </p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>Contact</h2>
            <p className={paragraphClass}>
              Heb je een vraag over deze verklaring of over je persoonsgegevens? Mail
              dan naar{" "}
              <a className={linkClass} href="mailto:info@studiodraaidoor.nl">
                info@studiodraaidoor.nl
              </a>,
              bel 06 53 36 66 76 of gebruik de gegevens bovenaan deze pagina.
            </p>
            <p className={paragraphClass}>
              Wil je een videoproject bespreken? Ga dan naar de{" "}
              <Link className={linkClass} href="/contact">
                contactpagina
              </Link>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
