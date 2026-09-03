import type { MetadataRoute } from "next";

const baseUrl = "https://www.studiodraaidoor.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/diensten` },
    { url: `${baseUrl}/portfolio` },
    { url: `${baseUrl}/portfolio/eew-delfzijl-veiligheidsfilm` },
    { url: `${baseUrl}/portfolio/basher-beatdown-promo` },
    { url: `${baseUrl}/portfolio/eew-qhse-lancering` },
    { url: `${baseUrl}/over` },
    { url: `${baseUrl}/contact` },
    { url: `${baseUrl}/veiligheidsvideo-laten-maken` }
  ];
}
