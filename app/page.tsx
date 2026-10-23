import type { Metadata } from "next";
import { CinematicHomePrototype } from "@/components/CinematicHomePrototype";

export const metadata: Metadata = {
  title: {
    absolute: "Studio DraaiDoor | Videoproductie voor bedrijven"
  },
  description:
    "Studio DraaiDoor maakt bedrijfsvideo’s, projectfilms en interviews. Van het eerste idee tot de montage. Bekijk het werk en bespreek je project.",
  alternates: {
    canonical: "https://www.studiodraaidoor.nl/"
  }
};

export default function HomePage() {
  return <CinematicHomePrototype />;
}
