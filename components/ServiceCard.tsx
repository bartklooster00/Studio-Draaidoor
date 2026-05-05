import { SubtleHover } from "@/components/motion/MotionPrimitives";

type ServiceCardProps = {
  title: string;
  description: string;
  index: number;
};

export function ServiceCard({ title, description, index }: ServiceCardProps) {
  return (
    <SubtleHover className="h-full">
      <article className="flex h-full flex-col rounded-lg border border-bone/[0.12] bg-bone/[0.032] p-6 transition duration-300 hover:border-copper/45 hover:bg-bone/[0.052]">
        <p className="font-mono text-xs text-copper/90">0{index + 1}</p>
        <h3 className="mt-5 text-xl font-semibold text-bone">{title}</h3>
        <p className="mt-4 text-sm leading-6 text-bone/[0.64]">
          {description}
        </p>
      </article>
    </SubtleHover>
  );
}
