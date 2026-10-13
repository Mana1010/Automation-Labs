type StoneProps = {
  x: number;
  ground: number;
  d: string;
  tilt?: number;
  label?: string;
  labelY?: number;
  crack?: string;
};

// Weathered tombstone: body, lit left edge, engraved label, crack and moss.
function Stone({ x, ground, d, tilt = 0, label, labelY = -50, crack }: StoneProps) {
  return (
    <g transform={`translate(${x} ${ground}) rotate(${tilt})`}>
      <path d={d} fill="#2E2840" stroke="#4A4263" strokeWidth="2.5" />
      <path d={d} fill="url(#gy-stone-light)" />
      {label && (
        <text
          y={labelY}
          textAnchor="middle"
          fontFamily="'Bricolage Grotesque', sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="2"
          fill="#1B1626"
          stroke="#55507A"
          strokeWidth=".6"
          strokeOpacity=".6"
        >
          {label}
        </text>
      )}
      {crack && <path d={crack} fill="none" stroke="#1B1626" strokeWidth="2" strokeLinecap="round" />}
      <ellipse cx="-8" cy="-2" rx="14" ry="4" fill="#3E6B2E" fillOpacity=".8" />
      <ellipse cx="10" cy="-1" rx="8" ry="3" fill="#4FB83A" fillOpacity=".45" />
    </g>
  );
}

type HandProps = {
  x: number;
  ground: number;
  scale?: number;
  tilt?: number;
  delay?: string;
};

// Zombie hand clawing out of a dirt mound. The mound is drawn after the arm
// so it hides the bottom of the forearm; only the rise is animated (CSS).
function ZombieHand({ x, ground, scale = 1, tilt = 0, delay = "0s" }: HandProps) {
  return (
    <g transform={`translate(${x} ${ground}) scale(${scale})`}>
      {/* nothing below the dirt line shows, however far the hand sinks */}
      <g clipPath="url(#gy-above-dirt)">
      <g transform={`rotate(${tilt})`}>
        <g className="zh-rise" style={{ animationDelay: delay }}>
          {/* forearm + torn sleeve */}
          <rect x="-11" y="-40" width="22" height="70" rx="6" fill="#7E9A68" stroke="#4C613E" strokeWidth="2" />
          <path d="M-14 -14 L14 -14 L14 6 L9 -2 L4 7 L-1 -1 L-6 8 L-10 0 L-14 6 Z" fill="#3B2F52" />
          {/* palm */}
          <path
            d="M-13 -38 L-15 -62 Q-16 -70 -10 -72 L10 -72 Q16 -70 15 -62 L13 -38 Z"
            fill="#8DAA74"
            stroke="#4C613E"
            strokeWidth="2"
          />
          {/* fingers (wiggle) + thumb */}
          <g className="zh-fingers" strokeLinecap="round">
            <g stroke="#4C613E" strokeWidth="9">
              <path d="M-9 -70 L-14 -92" />
              <path d="M-3 -72 L-4 -100" />
              <path d="M3 -72 L5 -97" />
              <path d="M9 -70 L15 -88" />
            </g>
            <g stroke="#8DAA74" strokeWidth="5.5">
              <path d="M-9 -70 L-14 -92" />
              <path d="M-3 -72 L-4 -100" />
              <path d="M3 -72 L5 -97" />
              <path d="M9 -70 L15 -88" />
            </g>
            <g fill="#2B2236">
              <circle cx="-14" cy="-92" r="2" />
              <circle cx="-4" cy="-100" r="2" />
              <circle cx="5" cy="-97" r="2" />
              <circle cx="15" cy="-88" r="2" />
            </g>
          </g>
          <path d="M-14 -52 L-28 -64" stroke="#4C613E" strokeWidth="9" strokeLinecap="round" />
          <path d="M-14 -52 L-28 -64" stroke="#8DAA74" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M-6 -58 Q0 -54 6 -58" fill="none" stroke="#4C613E" strokeWidth="1.5" strokeOpacity=".7" />
        </g>
      </g>
      </g>

      {/* dirt mound covering the arm's base, with a few clods */}
      <ellipse cx="0" cy="4" rx="46" ry="14" fill="#241A2C" />
      <ellipse cx="-4" cy="0" rx="36" ry="8" fill="#3A2C40" />
      <circle cx="-30" cy="-2" r="4" fill="#3A2C40" />
      <circle cx="26" cy="-4" r="3" fill="#3A2C40" />
      <circle cx="34" cy="2" r="2.5" fill="#241A2C" />
    </g>
  );
}

const ROUND = "M-24 0 L-24 -46 Q-24 -72 0 -72 Q24 -72 24 -46 L24 0 Z";
const ROUND_BIG = "M-34 0 L-34 -74 Q-34 -108 0 -108 Q34 -108 34 -74 L34 0 Z";
const SHOULDER = "M-30 0 L-30 -84 L-20 -96 L20 -96 L30 -84 L30 0 Z";

// Graveyard strip that sits behind the cauldron (wider than the pot scene,
// so stones and hands peek out on both sides).
function Graveyard({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 900 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="gy-stone-light" x1="0" x2="1">
          <stop offset="0%" stopColor="#8F86B8" stopOpacity=".28" />
          <stop offset="45%" stopColor="#8F86B8" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="gy-ground" x1="0" x2="1">
          <stop offset="0%" stopColor="#140F1C" stopOpacity="0" />
          <stop offset="18%" stopColor="#140F1C" />
          <stop offset="82%" stopColor="#140F1C" />
          <stop offset="100%" stopColor="#140F1C" stopOpacity="0" />
        </linearGradient>
        <clipPath id="gy-above-dirt">
          <rect x="-120" y="-220" width="240" height="222" />
        </clipPath>
        <filter id="gy-blur" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* ground */}
      <path d="M0 240 L0 206 Q150 194 300 202 Q450 210 600 200 Q750 192 900 204 L900 240 Z" fill="url(#gy-ground)" />

      {/* left plot */}
      <Stone x={48} ground={208} d={ROUND} label="RIP" labelY={-40} />
      <Stone x={168} ground={212} d={ROUND_BIG} tilt={-7} label="RIP" labelY={-66} crack="M-12 -96 L-6 -84 L-12 -74 L-4 -62" />
      <Stone x={268} ground={204} d={ROUND} tilt={4} />
      <ZombieHand x={102} ground={220} delay="-1.2s" />

      {/* right plot */}
      <Stone x={640} ground={204} d={ROUND} tilt={-3} />
      <Stone x={748} ground={212} d={SHOULDER} tilt={6} label="RIP" labelY={-60} crack="M14 -90 L8 -78 L16 -66" />
      <Stone x={858} ground={208} d={ROUND} tilt={-5} label="RIP" labelY={-40} />
      <ZombieHand x={812} ground={222} scale={0.85} tilt={10} delay="-3s" />

      {/* low graveyard mist over the stone bases */}
      <g filter="url(#gy-blur)" className="gy-mist">
        <ellipse cx="170" cy="214" rx="170" ry="16" fill="#B37BFF" fillOpacity=".12" />
        <ellipse cx="740" cy="214" rx="170" ry="16" fill="#7CE35A" fillOpacity=".09" />
      </g>
    </svg>
  );
}

export default Graveyard;
