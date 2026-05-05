"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

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
  const reduceMotion = useReducedMotion();
  const classes = {
    primary:
      "border border-copper bg-copper text-ink shadow-[0_14px_36px_rgba(111,129,150,0.12)] hover:border-bone hover:bg-bone hover:text-ink",
    secondary:
      "border border-bone/20 bg-bone/[0.035] text-bone hover:border-copper/70 hover:bg-bone/[0.07] hover:text-bone",
    dark: "border border-ink bg-ink text-bone shadow-[0_14px_36px_rgba(11,11,11,0.18)] hover:border-copper hover:bg-copper hover:text-ink"
  }[variant];

  return (
    <MotionLink
      className={`inline-flex min-h-12 min-w-40 items-center justify-center rounded-md px-6 text-sm font-semibold transition duration-300 ease-out ${classes}`}
      href={href}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { y: 0 }}
    >
      {children}
    </MotionLink>
  );
}
