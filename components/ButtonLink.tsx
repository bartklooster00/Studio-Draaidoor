"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
};

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: ButtonLinkProps) {
  const classes = {
    primary:
      "border border-white bg-white text-[#050505] hover:border-[#F5F3EF] hover:bg-[#F5F3EF] hover:text-[#050505] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    secondary:
      "border border-white/[0.28] bg-transparent text-white hover:border-white/[0.42] hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    dark: "border border-white/[0.28] bg-transparent text-white hover:border-white/[0.42] hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
  }[variant];

  return (
    <Link
      className={`inline-flex h-14 w-full min-w-40 items-center justify-center whitespace-nowrap rounded-lg px-8 text-lg font-bold transition duration-300 ease-out sm:w-auto ${classes}`}
      href={href}
    >
      {children}
    </Link>
  );
}
