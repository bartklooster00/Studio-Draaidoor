import Image from "next/image";
import Link from "next/link";
import { SubtleHover } from "@/components/motion/MotionPrimitives";

type ProjectCardProps = {
  project: {
    title: string;
    category: string;
    year: string;
    href?: string;
    image?: string;
    description: string;
    cardText?: string;
    client?: string;
    productionType?: string;
  };
};

export function ProjectCard({ project }: ProjectCardProps) {
  const content = (
    <>
      {project.image ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            alt={`Still uit ${project.title}`}
            className="object-cover transition duration-700 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={project.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 rounded-md border border-bone/10 bg-ink/75 px-3 py-1.5 text-xs font-medium text-bone backdrop-blur">
            {project.category}
          </p>
        </div>
      ) : (
        <div className="border-b border-bone/10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-copper">
            {project.category}
          </p>
        </div>
      )}
      <div className="p-6">
        {project.client || project.productionType ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-copper/90">
            {project.client ?? project.productionType}
          </p>
        ) : null}
        <h3 className="text-xl font-semibold text-bone">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-bone/[0.64]">
          {project.cardText ?? project.description}
        </p>
        <p className="mt-5 inline-flex border-b border-copper/35 pb-1 text-sm font-semibold text-copper transition duration-300 group-hover:border-bone/60 group-hover:text-bone">
          Bekijk project
        </p>
      </div>
    </>
  );

  const className =
    "group block h-full overflow-hidden rounded-lg border border-bone/[0.12] bg-smoke shadow-[0_24px_70px_rgba(0,0,0,0.22)] outline-none transition duration-300 hover:border-copper/45 focus-visible:border-copper/70";

  if (project.href) {
    return (
      <SubtleHover className="h-full">
        <Link className={className} href={project.href}>
          {content}
        </Link>
      </SubtleHover>
    );
  }

  return (
    <SubtleHover className="h-full">
      <article className={className}>{content}</article>
    </SubtleHover>
  );
}
