"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY >= 80);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[66px] border-b border-white/[0.08] bg-[#050505] transition-[height,background-color,backdrop-filter] duration-200 motion-reduce:transition-none lg:h-[88px] ${
        isScrolled
          ? "bg-[rgba(3,3,3,0.98)] backdrop-blur-[4px] lg:!h-[66px]"
          : ""
      }`}
    >
      <nav
        className="site-container flex h-full items-center justify-between"
        aria-label="Hoofdnavigatie"
      >
        <Link aria-label="Studio DraaiDoor" className="flex items-center" href="/">
          <Image
            alt=""
            aria-hidden
            className="h-auto w-[150px] min-[360px]:w-[170px] md:w-[194px]"
            height={47}
            priority
            src="/brand/studio-draaidoor-logo-white.svg"
            width={350}
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navigation.map((item) => (
            <Link
              className="text-base font-medium leading-none tracking-normal text-[#F5F3EF]/[0.82] transition-colors duration-200 hover:text-white sm:text-lg"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          className="grid size-11 place-items-center text-white md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="grid w-6 gap-1.5">
            <span className="h-px bg-current" />
            <span className="h-px bg-current" />
            <span className="h-px bg-current" />
          </span>
        </button>
      </nav>

      {isMenuOpen ? (
        <nav
          aria-label="Mobiele navigatie"
          className="border-b border-white/[0.08] bg-[#050505] px-5 py-5 md:hidden"
          id="mobile-navigation"
        >
          <div className="grid gap-1">
            {navigation.map((item) => (
              <Link
                className="py-3 text-lg font-medium text-[#F5F3EF]/[0.82] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                href={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
