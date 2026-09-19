interface SteamProps {
  /** Cantidad de hilos de vapor */
  count?: number;
  className?: string;
  tone?: "cream" | "wine";
}

/** Aroma que sube y se disuelve. Nunca horizontal. */
export function Steam({ count = 5, className = "", tone = "cream" }: SteamProps) {
  const color = tone === "cream" ? "bg-cream/45" : "bg-wine/25";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 overflow-hidden ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`steam absolute bottom-0 rounded-full ${color}`}
          style={{
            left: `${8 + index * (84 / Math.max(1, count - 1))}%`,
            width: `${10 + (index % 3) * 6}px`,
            height: `${70 + (index % 4) * 26}px`,
            animationDelay: `${index * 1.15}s`,
            animationDuration: `${5.8 + (index % 3) * 1.4}s`,
          }}
        />
      ))}
    </div>
  );
}
