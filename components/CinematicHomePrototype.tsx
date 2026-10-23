"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { EditorialReveal } from "@/components/EditorialReveal";
import { portfolioProjects } from "@/lib/site-data";

const HERO_VIDEO_SRC = "/video/drone-achter-auto-720p.mp4";
const HERO_POSTER = "/posters/hero-car.webp";

const primaryButton =
  "inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-lg border border-white bg-white px-8 text-lg font-bold text-[#050505] transition-colors hover:border-[#F5F3EF] hover:bg-[#F5F3EF] sm:w-auto";
const secondaryButton =
  "inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-lg border border-white/[0.28] bg-transparent px-8 text-lg font-bold text-white transition-colors hover:border-white/[0.42] hover:bg-white/[0.06] sm:w-auto";

const statementLines = [
  "Voor wie maken we de video?",
  "Welke beelden laten dat zien?",
  "Waar wordt de film voor gebruikt?"
];

const proofLines = [
  "Inhoud en voorbereiding",
  "Camerawerk op locatie",
  "Montage en nabewerking",
  "Eén vast aanspreekpunt"
];

type HomeService = {
  title: string;
  image: string;
  href: string;
};

const services: HomeService[] = [
  {
    title: "Bedrijfsvideo",
    image: "/images/studio-draaidoor-production-setup.png",
    href: "/diensten#bedrijfsvideo"
  },
  {
    title: "Veiligheidsvideo",
    image: portfolioProjects[0].posterSrc,
    href: "/veiligheidsvideo-laten-maken"
  },
  {
    title: "Interview",
    image: "/posters/eew-qhse-lancering.webp",
    href: "/diensten#interview"
  },
  {
    title: "Aftermovie",
    image: portfolioProjects[1].posterSrc,
    href: "/diensten#aftermovie"
  }
];

function ServiceVisual({ service }: { service: HomeService }) {
  return (
    <Link
      className="editorial-arrow-link group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      href={service.href}
    >
      <div className="editorial-media relative aspect-[16/10] overflow-hidden bg-[#050505]">
      <Image
        alt={`${service.title} visual`}
        className="object-cover object-center"
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        src={service.image}
      />
      </div>
      <h3 className="mt-4 flex items-center justify-between gap-4 text-2xl font-bold leading-[1.1] text-white">
        {service.title}
        <span aria-hidden className="editorial-arrow shrink-0">
          →
        </span>
      </h3>
    </Link>
  );
}

function PortfolioCase({
  isFeatured = false,
  project
}: {
  isFeatured?: boolean;
  project: (typeof portfolioProjects)[number];
}) {
  const media = (
    <Link
      aria-label={`Bekijk project: ${project.title}`}
      className={`editorial-media relative block w-full overflow-hidden bg-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        isFeatured ? "aspect-[4/5] sm:aspect-[16/8]" : "aspect-[4/5] sm:aspect-video"
      }`}
      href={project.href}
    >
      <Image
        alt={`${project.title} thumbnail`}
        className="object-cover object-center"
        fill
        sizes={isFeatured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        src={project.posterSrc}
      />
    </Link>
  );

  return (
    <article className="w-full">
      {isFeatured ? <EditorialReveal>{media}</EditorialReveal> : media}
      <div className="mt-5 max-w-[760px] sm:mt-6">
        <h3
          className={
            isFeatured
              ? "m-0 text-[34px] font-bold leading-[1.08] text-white sm:text-[48px]"
              : "m-0 text-[30px] font-bold leading-[1.08] text-white sm:text-[38px]"
          }
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-[65ch] text-base leading-[1.6] text-[#F5F3EF]/[0.76] sm:text-lg">
          {project.cardText}
        </p>
        <Link
          className="editorial-arrow-link mt-5 inline-flex min-h-11 items-center gap-3 border-b border-white/40 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          href={project.href}
        >
          Bekijk project
          <span aria-hidden className="editorial-arrow">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export function CinematicHomePrototype() {
  const [featuredProject, ...secondaryProjects] = portfolioProjects;
  const [heroVideoEnabled, setHeroVideoEnabled] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enableTimer: ReturnType<typeof setTimeout> | undefined;

    const updateVideoPreference = () => {
      if (reducedMotion.matches) {
        if (enableTimer) clearTimeout(enableTimer);
        setHeroVideoEnabled(false);
        setHeroVideoReady(false);
        return;
      }

      enableTimer = setTimeout(() => setHeroVideoEnabled(true), 150);
    };

    updateVideoPreference();
    reducedMotion.addEventListener("change", updateVideoPreference);

    return () => {
      if (enableTimer) clearTimeout(enableTimer);
      reducedMotion.removeEventListener("change", updateVideoPreference);
    };
  }, []);

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) return;

    const markReady = () => {
      if (
        video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
        video.currentTime > 0.08 &&
        !video.paused
      ) {
        setHeroVideoReady(true);
      }
    };

    markReady();

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);
    video.addEventListener("timeupdate", markReady);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("timeupdate", markReady);
    };
  }, [heroVideoEnabled]);

  return (
    <div className="relative bg-[#050505] font-sans text-[#F5F3EF]">
      <link as="image" href={HERO_POSTER} rel="preload" type="image/webp" />
      <section className="home-hero relative overflow-hidden bg-[#050505]">
        <Image
          alt=""
          aria-hidden
          className={`home-hero-poster object-cover object-[68%_center] transition-opacity duration-[180ms] ${
            heroVideoReady ? "opacity-0" : "opacity-100"
          }`}
          fill
          priority
          sizes="100vw"
          src={HERO_POSTER}
          unoptimized
        />
        {heroVideoEnabled ? (
          <video
            autoPlay
            className={`home-hero-video absolute inset-0 h-full w-full object-cover object-[68%_center] transition-opacity duration-[180ms] ${
              heroVideoReady ? "opacity-100" : "opacity-0"
            }`}
            loop
            muted
            playsInline
            poster={HERO_POSTER}
            preload="metadata"
            ref={heroVideoRef}
            src={HERO_VIDEO_SRC}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-[#050505]/40" />

        <div className="relative flex h-full items-center pb-[4vh] pt-[var(--header-height)]">
          <Container>
            <div className="w-full max-w-[780px] min-[900px]:w-[52vw]">
              <h1 className="type-hero m-0 max-w-[780px] text-white">
                Goed werk verdient het om gezien te worden.
              </h1>
              <p className="mt-7 max-w-[62ch] text-lg leading-[1.6] text-[#F5F3EF]/[0.78] sm:text-xl lg:text-2xl">
                Ik maak bedrijfsvideo’s, interviews en projectfilms over de mensen
                en het werk achter een organisatie. We bepalen samen wat de film
                moet overbrengen; ik verzorg de opnames en montage.
              </p>
              <div className="mt-11 flex flex-col gap-4 sm:flex-row">
                <Link className={primaryButton} href="/portfolio">
                  Bekijk mijn werk
                </Link>
                <Link className={secondaryButton} href="/contact">
                  Bespreek je project
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 min-[900px]:grid-cols-[58fr_34fr] min-[900px]:items-center min-[900px]:gap-[8%]">
          <h2 className="m-0 max-w-[880px] text-[34px] font-bold leading-[1.04] text-white sm:text-[38px] lg:text-[54px]">
            Eerst helder krijgen wat de video moet doen.
          </h2>
          <div className="grid gap-7 md:gap-9">
            {statementLines.map((line) => (
              <p className="m-0 text-left text-2xl font-bold leading-[1.2] text-white/[0.86]" key={line}>
                {line}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 min-[1024px]:grid-cols-[55fr_45fr] min-[1024px]:items-start min-[1024px]:gap-[72px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              alt="Bart Klooster met dronecontroller in het veld"
              className="object-cover object-[50%_20%]"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              src="/images/bart-drone-controller.jpg"
            />
          </div>

          <div>
            <h2 className="type-section m-0 max-w-[680px] text-white">
              Je hebt direct contact met de maker.
            </h2>
            <p className="body-copy mt-7 max-w-[68ch] text-[#F5F3EF]/[0.76]">
              Ik ben Bart Klooster, oprichter van Studio DraaiDoor. Ik denk mee
              over de inhoud, film op locatie en verzorg de montage. Heeft een
              productie extra mensen of apparatuur nodig, dan bespreken we dat
              vooraf.
            </p>
            <div className="mt-9 grid gap-3">
              {proofLines.map((line) => (
                <p
                  className="m-0 text-lg font-semibold leading-[1.45] text-[#F5F3EF]/[0.84]"
                  key={line}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-28">
        <Container className="grid gap-12 min-[1024px]:grid-cols-[38fr_62fr] min-[1024px]:items-start min-[1024px]:gap-[72px]">
          <div>
            <h2 className="type-section m-0 text-white">
              Wat wil je in beeld brengen?
            </h2>
            <p className="body-copy mt-6 max-w-[48ch] text-[#F5F3EF]/[0.72]">
              De ene video introduceert je bedrijf, de andere laat een project of
              een evenement zien. We kiezen de beelden en vorm die passen bij wat
              je wilt vertellen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-y-12">
            {services.map((service) => (
              <ServiceVisual key={service.title} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] py-16 sm:py-20 lg:py-32">
        <Container>
          <div className="max-w-[760px]">
            <h2 className="m-0 max-w-[760px] text-[34px] font-bold leading-[1.04] text-white sm:text-[38px] lg:text-[54px]">
              Bekijk het werk.
            </h2>
            <p className="body-copy mt-6 max-w-[68ch] text-[#F5F3EF]/[0.72]">
              Hier zie je films die ik maakte voor EEW Delfzijl en Crash
              Interactive, met verschillende doelen en een eigen aanpak per
              productie.
            </p>
          </div>

          <div className="mt-12 lg:mt-14">
            <PortfolioCase isFeatured project={featuredProject} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {secondaryProjects.map((project) => (
              <PortfolioCase key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
