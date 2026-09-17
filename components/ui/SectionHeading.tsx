type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", as: Tag = "h2", id }: Props) {
  const center = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${center}`}>
      {eyebrow && <p className="mb-4 font-mono text-xs font-medium text-tb-red">{eyebrow}</p>}
      <Tag
        id={id}
        className={
          Tag === "h1"
            ? "text-4xl leading-[1.1] font-black md:text-5xl"
            : "text-3xl leading-[1.2] font-extrabold md:text-[32px]"
        }
      >
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lg leading-[1.6] text-tb-cream/80">{intro}</p>}
    </div>
  );
}
