"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site-data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY >= 80);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[68px] border-b border-[#A9B0B6]/[0.08] bg-[rgba(5,5,5,0.72)] backdrop-blur-[10px] transition duration-300 min-[768px]:h-[76px] ${
        isScrolled ? "bg-[rgba(5,5,5,0.78)]" : ""
      }`}
    >
      <nav
        className="mx-auto flex h-[68px] w-full max-w-[1820px] items-center justify-between px-[clamp(24px,5.6vw,112px)] min-[768px]:h-[76px]"
        aria-label="Hoofdnavigatie"
      >
        <Link className="group flex items-center gap-5" href="/">
          <Image
            alt=""
            aria-hidden
            className="h-auto w-[38px] min-[768px]:w-[42px]"
            height={29}
            priority
            src="/brand/studio-draaidoor-camera-d.svg"
            width={48}
          />
          <span className="text-xl font-bold leading-none tracking-normal text-white transition duration-300 group-hover:text-white min-[768px]:text-2xl">
            {site.name}
          </span>
        </Link>

        <div className="flex items-center gap-5 min-[768px]:gap-10">
          {navigation.map((item) => (
            <Link
              className="relative text-base font-medium tracking-normal text-[#F5F3EF]/[0.82] transition duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-copper after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 min-[768px]:text-xl"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
