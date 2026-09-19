interface LogoProps {
  variant?: "wine" | "cream";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { word: "text-2xl", label: "text-[0.5rem]", line: "w-5" },
  md: { word: "text-4xl sm:text-5xl", label: "text-[0.6rem]", line: "w-8" },
  lg: { word: "text-6xl sm:text-7xl lg:text-8xl", label: "text-[0.7rem] sm:text-xs", line: "w-10 sm:w-14" },
};

export function Logo({ variant = "wine", size = "md", className = "" }: LogoProps) {
  const tone = variant === "cream" ? "text-cream" : "text-wine";
  const rule = variant === "cream" ? "bg-gold-soft/70" : "bg-gold/70";
  const label = variant === "cream" ? "text-cream/80" : "text-wine/70";
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center ${tone} ${className}`}>
      <span className={`display italic ${s.word} leading-none`}>Windy</span>
      <span className="mt-1.5 flex items-center gap-2.5">
        <span className={`${s.line} h-px ${rule}`} />
        <span className={`smallcaps ${s.label} ${label}`}>Pastelería</span>
        <span className={`${s.line} h-px ${rule}`} />
      </span>
    </div>
  );
}
