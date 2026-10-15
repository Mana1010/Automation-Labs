import type { BrewResult } from "../store/app.store";

// [left %, top %, size px, colour, drift delay s]
const PUFFS: [number, number, number, string, number][] = [
  [12, 50, 130, "bg-[#B37BFF]/55", 0],
  [30, 26, 160, "bg-slime/40", -1.5],
  [50, 16, 170, "bg-[#B37BFF]/55", -3],
  [70, 28, 160, "bg-slime/35", -4.5],
  [88, 50, 130, "bg-[#B37BFF]/50", -2],
  [38, 66, 170, "bg-[#8E81A6]/55", -5],
  [64, 68, 170, "bg-[#B37BFF]/45", -1],
  [20, 76, 120, "bg-slime/35", -3.5],
  [82, 76, 120, "bg-[#8E81A6]/45", -2.5],
];

// little sparkles drifting inside the cloud: [left %, top %, delay s]
const SPARKS: [number, number, number][] = [
  [20, 30, 0],
  [78, 22, 0.8],
  [62, 76, 1.6],
  [30, 78, 2.2],
  [88, 60, 1.1],
];

/** Witchcraft smoke cloud that rises out of the cauldron carrying the result. */
function MagicSmoke({ value, label }: BrewResult) {
  return (
    <div className="relative flex size-full min-h-[inherit] animate-smoke-rise items-center justify-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* soft base that fuses the puffs into one cloud */}
        <span className="absolute inset-x-[6%] inset-y-[14%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(179,123,255,0.45),rgba(124,227,90,0.18)_55%,transparent_75%)] blur-xl" />
        {PUFFS.map(([left, top, size, color, delay], i) => (
          <span
            key={i}
            className={`absolute animate-smoke-drift rounded-full blur-xl ${color}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size * 0.75,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
        {SPARKS.map(([left, top, delay], i) => (
          <span
            key={i}
            className="absolute size-1.5 animate-twinkle rounded-full bg-slime-pale shadow-[0_0_8px_2px_rgba(198,255,174,0.7)]"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <div className="relative flex animate-result-in flex-col items-center gap-1">
        <span className="font-heading text-5xl leading-none font-extrabold text-ink-h [text-shadow:0_0_24px_rgba(124,227,90,0.8),0_0_6px_rgba(179,123,255,0.6)] short:text-4xl">
          {value}
        </span>
        <span className="font-mono text-xs tracking-[0.16em] text-slime-pale uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

export default MagicSmoke;
