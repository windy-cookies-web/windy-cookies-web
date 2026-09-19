interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  italic?: string;
  description?: string;
  tone?: "wine" | "cream";
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  italic,
  description,
  tone = "wine",
  align = "center",
}: SectionHeadingProps) {
  const base = tone === "cream" ? "text-cream" : "text-wine";
  const soft = tone === "cream" ? "text-cream/75" : "text-wine/70";
  const accent = tone === "cream" ? "text-gold-soft" : "text-gold";
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`reveal flex flex-col ${alignment} ${base}`}>
      <span className={`smallcaps text-[0.6rem] ${accent}`}>{eyebrow}</span>
      <h2 className="display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">
        {title}
        {italic ? <span className="italic"> {italic}</span> : null}
      </h2>
      <div className={`hairline mt-5 ${align === "center" ? "w-24" : "w-16"}`} />
      {description ? (
        <p className={`mt-5 max-w-xl text-[0.95rem] leading-relaxed ${soft}`}>{description}</p>
      ) : null}
    </div>
  );
}
