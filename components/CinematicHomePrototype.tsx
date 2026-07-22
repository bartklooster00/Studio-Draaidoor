"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { portfolioProjects } from "@/lib/site-data";

const HERO_VIDEO_SRC = "/video/drone-achter-auto.mp4";
const HERO_POSTER = "/posters/hero-car.webp";

const primaryButton =
  "inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-lg border border-white bg-white px-8 text-lg font-bold text-[#050505] transition-colors hover:border-[#F5F3EF] hover:bg-[#F5F3EF] sm:w-auto";
const secondaryButton =
  "inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-lg border border-white/[0.28] bg-transparent px-8 text-lg font-bold text-white transition-colors hover:border-white/[0.42] hover:bg-white/[0.06] sm:w-auto";

const statementLines = [
  "Vooraf helder plan.",
  "Op locatie rustig werken.",
  "Montage zonder omwegen."
];

const proofLines = [
  "Regie, camera en montage",
  "Bedrijfsvideo en veiligheidsfilm",
  "Interviews, podcasts en aftermovies",
  "Voor bedrijven en organisaties"
];

const services = [
  {
    title: "Bedrijfsvideo",
    image: "/images/studio-draaidoor-production-setup.png"
  },
  {
    title: "Veiligheidsfilm",
    image: portfolioProjects[0].posterSrc
  },
  {
    title: "Interview",
    image: "/images/bart-drone-controller.jpg"
  },
  {
    title: "Aftermovie",
    image: portfolioProjects[1].posterSrc
  }
];

function PortfolioCase({
  isFeatured = false,
  project
}: {
  isFeatured?: boolean;
  project: (typeof portfolioProjects)[number];
}) {
  return (
    <article
      className={`group relative w-full overflow-hidden rounded-lg bg-[#050505] ${
        isFeatured
          ? "aspect-[4/5] sm:aspect-[16/8]"
          : "aspect-[4/5] sm:aspect-video"
      }`}
    >
      <Image
        alt={`${project.title} thumbnail`}
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        fill
        sizes={isFeatured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        src={project.posterSrc}
      />
      <div className="absolute inset-0 bg-[#050505]/50 transition-colors duration-300 group-hover:bg-[#050505]/[0.44]" />
      <div className="absolute inset-0 flex max-w-[760px] items-end p-6 text-left sm:p-10">
        <div>
          <h3
            className={
              isFeatured
                ? "m-0 text-[34px] font-bold leading-[1.05] text-white sm:text-[52px]"
                : "m-0 text-[32px] font-bold leading-[1.05] text-white sm:text-[40px]"
            }
          >
            {project.title}
          </h3>
          <p className="mt-4 max-w-[68ch] text-base leading-[1.55] text-[#F5F3EF]/[0.76] sm:text-lg">
            {project.cardText}
          </p>
          <Link className={`${secondaryButton} mt-6`} href={project.href}>
            Bekijk project
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CinematicHomePrototype() {
  const [featuredProject, ...secondaryProjects] = portfolioProjects;
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

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
  }, []);

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
        <video
          autoPlay
          className={`home-hero-video absolute inset-0 h-full w-full object-cover object-[68%_center] transition-opacity duration-[180ms] ${
            heroVideoReady ? "opacity-100" : "opacity-0"
          }`}
          loop
          muted
          playsInline
          poster={HERO_POSTER}
          preload="auto"
          ref={heroVideoRef}
          src={HERO_VIDEO_SRC}
        />
        <div className="pointer-events-none absolute inset-0 bg-[#050505]/40" />

        <div className="relative flex h-full items-center pb-[4vh] pt-[var(--header-height)]">
          <Container>
            <div className="w-full max-w-[780px] min-[900px]:w-[52vw]">
              <h1 className="type-hero m-0 max-w-[780px] text-white">
                Bedrijfsvideo’s die helder maken wat u doet
              </h1>
              <p className="mt-7 max-w-[62ch] text-lg leading-[1.6] text-[#F5F3EF]/[0.78] sm:text-xl lg:text-2xl">
                Video’s voor industrie, veiligheid en events. Duidelijk
                voorbereid, rustig gedraaid en klaar voor gebruik.
              </p>
              <div className="mt-11 flex flex-col gap-4 sm:flex-row">
                <Link className={primaryButton} href="/portfolio">
                  Bekijk portfolio
                </Link>
                <Link className={secondaryButton} href="/contact">
                  Project bespreken
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <section className="bg-[#050505] pb-8 pt-16 sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24">
        <Container className="grid gap-12 min-[900px]:grid-cols-[58fr_34fr] min-[900px]:items-center min-[900px]:gap-[8%]">
          <h2 className="m-0 max-w-[880px] text-[34px] font-bold leading-[1.04] text-white sm:text-[38px] lg:text-[54px]">
            Geen groot bureauverhaal. Wel een video die uitlegt wat er moet
            gebeuren.
          </h2>
          <div>
            {statementLines.map((line) => (
              <p
                className="m-0 border-t border-white/[0.14] py-[22px] text-2xl font-bold leading-[1.2] text-white/[0.86]"
                key={line}
              >
                {line}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] py-8 sm:py-12 lg:py-14">
        <Container className="grid gap-12 min-[1024px]:grid-cols-[55fr_45fr] min-[1024px]:items-start min-[1024px]:gap-[72px]">
          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image
                alt="Bart Klooster met dronecontroller in het veld"
                className="object-cover object-[50%_20%]"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                src="/images/bart-drone-controller.jpg"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <Image
                  alt="Studio Draaidoor productieset met camera en licht"
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 27vw, 50vw"
                  src="/images/studio-draaidoor-production-setup.png"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <Image
                  alt="Basher Beatdown projectbeeld"
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 1024px) 27vw, 50vw"
                  src={portfolioProjects[1].posterSrc}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="type-section m-0 max-w-[680px] text-white">
              Praktisch gedraaid. Professioneel opgeleverd.
            </h2>
            <p className="body-copy mt-7 max-w-[68ch] text-[#F5F3EF]/[0.76]">
              Ik maak videoproducties voor bedrijven die duidelijk willen laten
              zien wat ze doen. Geen groot bureauverhaal, maar een praktische
              aanpak met aandacht voor voorbereiding, beeld en oplevering.
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

      <section className="bg-[#050505] py-8 sm:py-12 lg:py-14">
        <Container className="grid gap-12 min-[1024px]:grid-cols-[38fr_62fr] min-[1024px]:items-start min-[1024px]:gap-[72px]">
          <div>
            <h2 className="type-section m-0 text-white">
              Video’s voor duidelijke communicatie.
            </h2>
            <p className="body-copy mt-6 max-w-[48ch] text-[#F5F3EF]/[0.72]">
              Voor websites, interne communicatie, veiligheid, events en
              campagnes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            {services.map((service) => (
              <article
                className="group relative aspect-[16/10] overflow-hidden rounded-lg bg-[#050505]"
                key={service.title}
              >
                <Image
                  alt={`${service.title} visual`}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  src={service.image}
                />
                <div className="absolute inset-0 bg-[#050505]/45 transition-colors duration-300 group-hover:bg-[#050505]/[0.38]" />
                <h3 className="absolute bottom-6 left-7 m-0 text-[30px] font-bold leading-[1.05] text-white">
                  {service.title}
                </h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#050505] pb-16 pt-8 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
        <Container>
          <div className="max-w-[760px]">
            <h2 className="m-0 max-w-[760px] text-[34px] font-bold leading-[1.04] text-white sm:text-[38px] lg:text-[54px]">
              Videoprojecten voor bedrijven.
            </h2>
            <p className="body-copy mt-6 max-w-[68ch] text-[#F5F3EF]/[0.72]">
              Een selectie van bedrijfsfilms, veiligheidsvideo’s, promo’s en
              interne communicatievideo’s.
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
