import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { portfolioProjects } from "@/lib/site-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Portfolio"
    };
  }

  return {
    title: {
      absolute: project.seoTitle
    },
    description: project.seoDescription,
    alternates: {
      canonical: `/portfolio/${project.slug}`
    }
  };
}

export default async function PortfolioDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetail
      project={project}
      relatedServiceLink={
        project.slug === "eew-delfzijl-veiligheidsfilm"
          ? {
              href: "/veiligheidsvideo-laten-maken",
              label: "Meer over veiligheidsvideo’s"
            }
          : undefined
      }
    />
  );
}
