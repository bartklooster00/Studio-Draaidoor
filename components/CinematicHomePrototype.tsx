"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { portfolioProjects } from "@/lib/site-data";

const HERO_VIDEO_SRC = "/video/drone-achter-auto.mp4";
const HERO_POSTER = "/images/studio-draaidoor-production-setup.png";

const primaryButton =
  "inline-flex h-14 w-full items-center justify-center rounded-lg border border-white bg-white px-8 text-lg font-bold text-[#050505] transition-colors hover:border-[#F5F3EF] hover:bg-[#F5F3EF] min-[768px]:w-auto";
const secondaryButton =
  "inline-flex h-14 w-full items-center justify-center rounded-lg border border-white/[0.28] bg-transparent px-8 text-lg font-bold text-white transition-colors hover:border-white/[0.42] hover:bg-white/[0.06] min-[768px]:w-auto";

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
    image: getYouTubeThumbnail(portfolioProjects[0].videoUrl)
  },
  {
    title: "Interview",
    image: "/images/bart-drone-controller.jpg"
  },
  {
    title: "Aftermovie",
    image: getYouTubeThumbnail(portfolioProjects[1].videoUrl)
  }
];

function getYouTubeThumbnail(embedUrl: string) {
  const id = embedUrl.split("/embed/")[1]?.split("?")[0];

  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : HERO_POSTER;
}

function PortfolioCase({
  isFeatured = false,
  project
}: {
  isFeatured?: boolean;
  project: (typeof portfolioProjects)[number];
}) {
  return (
    <article
      className={
        isFeatured
          ? "relative mt-[72px] aspect-[4/5] w-full overflow-hidden rounded-lg border-0 bg-[#050505] min-[768px]:aspect-[16/7] min-[768px]:min-h-[460px]"
          : "relative aspect-[4/5] overflow-hidden rounded-lg border-0 bg-[#050505] min-[768px]:aspect-video"
      }
    >
      <Image
        alt={`${project.title} thumbnail`}
        className="object-cover object-center"
        fill
        sizes={isFeatured ? "100vw" : "(min-width: 900px) 50vw, 100vw"}
        src={getYouTubeThumbnail(project.videoUrl)}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.82)_0%,rgba(5,5,5,0.24)_52%,rgba(5,5,5,0)_100%)]" />
      <div className="absolute inset-0 flex max-w-[760px] items-end p-6 text-left min-[768px]:p-10">
        <div>
        <h3
          className={
            isFeatured
              ? "m-0 text-[34px] font-extrabold leading-[1.05] tracking-normal text-white min-[768px]:text-[52px]"
              : "m-0 text-[32px] font-extrabold leading-[1.05] tracking-normal text-white min-[768px]:text-[40px]"
          }
        >
          {project.title}
        </h3>
        <p className="mt-4 max-w-[680px] text-base leading-[1.5] text-[#F5F3EF]/[0.68] min-[768px]:text-lg">
          {project.cardText}
        </p>
        <Link
          className={`${secondaryButton} mt-6 min-[768px]:w-auto`}
          href={project.href}
        >
          Bekijk project
        </Link>
        </div>
      </div>
    </article>
  );
}

export function CinematicHomePrototype() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [featuredProject, ...secondaryProjects] = portfolioProjects;

  useEffect(() => {
    const video = heroVideoRef.current;

    if (!video) {
      return;
    }

    const markVideoReady = () => setHeroVideoReady(true);

    if (video.readyState >= 2) {
      markVideoReady();
    }

    video.addEventListener("loadeddata", markVideoReady);
    video.addEventListener("canplay", markVideoReady);

    return () => {
      video.removeEventListener("loadeddata", markVideoReady);
      video.removeEventListener("canplay", markVideoReady);
    };
  }, []);

  return (
    <div className="relative bg-[#050505] font-sans text-[#F5F3EF]">
      <section className="relative min-h-[100svh] overflow-hidden bg-[#050505]">
          <video
            autoPlay
            className="absolute inset-0 h-full w-full object-cover object-[68%_center] transition-opacity duration-[180ms] ease-linear"
            loop
            muted
            onCanPlay={() => setHeroVideoReady(true)}
            onLoadedData={() => setHeroVideoReady(true)}
            playsInline
            preload="auto"
            ref={heroVideoRef}
            src={HERO_VIDEO_SRC}
            style={{ opacity: heroVideoReady ? 1 : 0 }}
          />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.62)_34%,rgba(5,5,5,0.18)_66%,rgba(5,5,5,0.10)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(0deg,#050505_0%,rgba(5,5,5,0.78)_14%,rgba(5,5,5,0)_42%)]" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(5,5,5,0.72)_0%,rgba(5,5,5,0)_34%)]" />

          <div className="relative z-[2] flex h-[100svh] items-center pt-[68px] min-[768px]:pt-[76px]">
            <div className="mx-auto w-full max-w-[1820px] px-[clamp(24px,5.6vw,112px)]">
              <div className="mt-6 w-full min-[768px]:w-[min(760px,48vw)]">
              <h1 className="m-0 max-w-full text-[42px] font-extrabold leading-[1.04] tracking-normal text-white min-[768px]:max-w-[760px] min-[768px]:text-[clamp(52px,4.2vw,72px)] min-[768px]:leading-[1.03]">
                Bedrijfsvideo’s die helder maken wat u doet
              </h1>
              <p className="mt-7 max-w-full text-lg leading-[1.55] text-[#F5F3EF]/[0.72] min-[768px]:max-w-[620px] min-[768px]:text-xl">
                Video’s voor industrie, veiligheid en events. Duidelijk
                voorbereid, rustig gedraaid en klaar voor gebruik.
              </p>
              <div className="mt-11 flex flex-col gap-3 min-[768px]:flex-row min-[768px]:gap-4">
                <Link className={primaryButton} href="/portfolio">
                  Bekijk portfolio
                </Link>
                <Link
                  className={secondaryButton}
                  href="/contact"
              >
                  Project bespreken
                </Link>
              </div>
              </div>
            </div>
          </div>
      </section>

      <section className="scroll-mt-[84px] bg-[#050505] py-20 min-[768px]:scroll-mt-24 min-[768px]:py-32 min-[768px]:px-20">
        <div className="mx-auto grid w-full max-w-[1840px] grid-cols-1 gap-12 px-6 min-[900px]:grid-cols-12 min-[900px]:px-0">
          <div className="min-[900px]:col-span-7">
            <p className="m-0 text-[clamp(42px,4vw,78px)] font-extrabold leading-[0.98] text-white">
              Geen groot bureauverhaal. Wel een video die uitlegt wat er moet
              gebeuren.
            </p>
          </div>
          <div className="min-[900px]:col-span-4 min-[900px]:col-start-9">
            {statementLines.map((line) => (
              <p
                className="m-0 border-t border-white/[0.14] pb-[26px] pt-[22px] text-2xl font-bold leading-tight text-white/[0.82]"
                key={line}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-[84px] bg-[#050505] py-20 min-[768px]:scroll-mt-24 min-[768px]:py-32 min-[768px]:px-20">
        <div className="mx-auto grid w-full max-w-[1840px] grid-cols-1 gap-12 px-6 min-[900px]:grid-cols-12 min-[900px]:gap-x-[72px] min-[900px]:px-0">
          <div className="min-[900px]:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg">
              <Image
                alt="Bart Klooster met dronecontroller in het veld"
                className="object-cover object-top"
                fill
                sizes="(min-width: 900px) 58vw, 100vw"
                src="/images/bart-drone-controller.jpg"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  alt="Studio Draaidoor productieset met camera en licht"
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 900px) 29vw, 50vw"
                  src="/images/studio-draaidoor-production-setup.png"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  alt="Basher Beatdown projectbeeld"
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 900px) 29vw, 50vw"
                  src={getYouTubeThumbnail(portfolioProjects[1].videoUrl)}
                />
              </div>
            </div>
          </div>

          <div className="min-[900px]:col-span-5 min-[900px]:col-start-8">
            <h2 className="m-0 max-w-[680px] text-[clamp(42px,11vw,48px)] font-extrabold leading-[1.04] tracking-normal text-white min-[768px]:text-[clamp(48px,4vw,68px)]">
              Praktisch gedraaid. Professioneel opgeleverd.
            </h2>
            <p className="mt-7 max-w-[620px] text-xl leading-[1.65] text-[#F5F3EF]/[0.68]">
              Ik maak videoproducties voor bedrijven die duidelijk willen laten
              zien wat ze doen. Geen groot bureauverhaal, maar een praktische
              aanpak met aandacht voor voorbereiding, beeld en oplevering.
            </p>
            <div className="mt-10 grid gap-3.5">
              {proofLines.map((line) => (
                <p
                  className="m-0 text-lg font-semibold leading-[1.45] text-[#F5F3EF]/[0.82]"
                  key={line}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-mt-[84px] bg-[#050505] py-20 min-[768px]:scroll-mt-24 min-[768px]:py-32 min-[768px]:px-20">
        <div className="mx-auto grid w-full max-w-[1840px] grid-cols-1 gap-10 px-6 min-[900px]:grid-cols-12 min-[900px]:gap-x-[72px] min-[900px]:px-0">
          <div className="min-[900px]:col-span-4">
            <h2 className="m-0 text-[clamp(42px,11vw,48px)] font-extrabold leading-[1.04] tracking-normal text-white min-[768px]:text-[clamp(48px,4vw,68px)]">
              Video’s voor duidelijke communicatie.
            </h2>
            <p className="mt-7 text-xl leading-[1.6] text-[#F5F3EF]/[0.68]">
              Voor websites, interne communicatie, veiligheid, events en
              campagnes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[768px]:grid-cols-2 min-[900px]:col-span-7 min-[900px]:col-start-6 min-[900px]:gap-6">
            {services.map((service) => (
              <article
                className="relative aspect-[16/10] overflow-hidden rounded-lg border-0 bg-[#050505]"
                key={service.title}
              >
                <Image
                  alt={`${service.title} visual`}
                  className="object-cover object-center"
                  fill
                  sizes="(min-width: 900px) 30vw, 100vw"
                  src={service.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,5,0.76)_0%,rgba(5,5,5,0.20)_48%,rgba(5,5,5,0)_100%)]" />
                <h3 className="absolute bottom-6 left-7 m-0 text-[34px] font-extrabold leading-[1.05] text-white">
                  {service.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-[84px] bg-[#050505] py-20 min-[768px]:scroll-mt-24 min-[768px]:py-32 min-[768px]:px-20">
        <div className="mx-auto w-full max-w-[1840px] px-6 min-[900px]:px-0">
          <div className="max-w-[760px]">
            <h2 className="m-0 max-w-[760px] text-[clamp(42px,11vw,48px)] font-extrabold leading-[1.04] tracking-normal text-white min-[768px]:text-[clamp(48px,4vw,68px)]">
              Videoprojecten voor bedrijven.
            </h2>
            <p className="mt-7 max-w-[760px] text-xl leading-[1.6] text-[#F5F3EF]/[0.68]">
              Een selectie van bedrijfsfilms, veiligheidsvideo’s, promo’s en
              interne communicatievideo’s.
            </p>
          </div>

          <PortfolioCase isFeatured project={featuredProject} />

          <div className="mt-6 grid grid-cols-1 gap-4 min-[768px]:grid-cols-2 min-[768px]:gap-6">
            {secondaryProjects.map((project) => (
              <PortfolioCase key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
