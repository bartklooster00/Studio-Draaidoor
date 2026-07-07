import type { Metadata } from "next";
import { CinematicHomePrototype } from "@/components/CinematicHomePrototype";

export const metadata: Metadata = {
  title: {
    absolute:
      "Studio Draaidoor | Bedrijfsvideo laten maken voor bedrijven en organisaties"
  },
  description:
    "Studio Draaidoor maakt bedrijfsvideo’s, veiligheidsfilms, interviews, podcasts en aftermovies voor bedrijven en organisaties. Professioneel, helder en direct inzetbaar."
};

export default function HomePage() {
  return <CinematicHomePrototype />;
}
