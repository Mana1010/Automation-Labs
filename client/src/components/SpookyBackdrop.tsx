// Purely decorative night-sky layer: moon, stars, bats, a spider web and fog.
const STARS = [
  [6, 12],
  [14, 30],
  [22, 8],
  [31, 22],
  [44, 6],
  [52, 18],
  [61, 9],
  [68, 26],
  [74, 5],
  [83, 15],
  [92, 24],
  [97, 8],
  [38, 40],
  [88, 44],
  [12, 52],
  [58, 48],
];

function Bat({ className }: { className: string }) {
  return (
    <svg
      className={`absolute animate-drift fill-[#05030a] drop-shadow-[0_0_6px_rgba(179,123,255,0.35)] ${className}`}
      viewBox="0 0 64 32"
      aria-hidden="true"
    >
      <path
        className="bat-wings"
        d="M32 12 C28 4 20 2 10 4 C14 8 12 12 4 14 C10 16 14 20 16 24 C20 18 26 18 30 22 Z M32 12 C36 4 44 2 54 4 C50 8 52 12 60 14 C54 16 50 20 48 24 C44 18 38 18 34 22 Z"
      />
      <ellipse cx="32" cy="16" rx="4" ry="7" />
      <path d="M29 10 L30 6 L32 9 L34 6 L35 10 Z" />
    </svg>
  );
}

const craterCls = "absolute rounded-full bg-[rgba(200,140,60,0.35)]";
const fogCls =
  "absolute -bottom-[60px] h-[200px] w-[70%] animate-fog rounded-full blur-[40px]";

function SpookyBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {STARS.map(([x, y], i) => (
        <span
          key={i}
          className="absolute size-[3px] animate-twinkle rounded-full bg-ink-h opacity-50"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${(i % 5) * 0.7}s`,
          }}
        />
      ))}

      <div className="absolute top-[120px] right-[6%] size-[110px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff6d8,#ffd98a_60%,#e8b45a)] opacity-85 shadow-[0_0_60px_10px_rgba(255,217,138,0.25),0_0_140px_40px_rgba(255,154,61,0.12)]">
        <span className={`${craterCls} top-[26px] left-[58px] size-[22px]`} />
        <span className={`${craterCls} top-16 left-[30px] size-[14px]`} />
        <span className={`${craterCls} top-[72px] left-[70px] size-[10px]`} />
      </div>

      <Bat className="top-[70px] left-[46%] w-12 [animation-duration:9s]" />
      <Bat className="top-[160px] right-[18%] w-[34px] [animation-delay:-3s]" />
      <Bat className="top-10 right-[30%] w-[26px] [animation-delay:-6s] [animation-duration:13s]" />

      <svg
        className="absolute top-0 right-0 w-[200px] -scale-x-100"
        viewBox="0 0 200 200"
      >
        <g fill="none" stroke="#B9A6D9" strokeOpacity=".22" strokeWidth="1.2">
          <path d="M0 0 L200 40 M0 0 L170 110 M0 0 L110 170 M0 0 L40 200" />
          <path d="M40 8 Q36 30 34 34 Q28 36 8 40" />
          <path d="M80 16 Q72 52 68 68 Q52 72 16 80" />
          <path d="M120 24 Q108 76 102 102 Q76 108 24 120" />
          <path d="M160 32 Q144 100 136 136 Q100 144 32 160" />
        </g>
      </svg>
      <div className="absolute top-0 right-[120px] flex origin-top animate-dangle flex-col items-center">
        <span className="h-[70px] w-px bg-[rgba(185,166,217,0.4)]" />
        <svg viewBox="0 0 40 40" className="-mt-1 w-[26px]">
          <g stroke="#1A1424" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M14 18 L4 10 M14 21 L2 20 M14 24 L4 32 M15 26 L8 38" />
            <path d="M26 18 L36 10 M26 21 L38 20 M26 24 L36 32 M25 26 L32 38" />
          </g>
          <ellipse cx="20" cy="22" rx="8" ry="9" fill="#1A1424" />
          <circle cx="20" cy="12" r="5" fill="#1A1424" />
          <circle cx="18" cy="11" r="1.3" fill="#FF9A3D" />
          <circle cx="22" cy="11" r="1.3" fill="#FF9A3D" />
        </svg>
      </div>

      <div className={`${fogCls} -left-[10%] bg-[rgba(179,123,255,0.08)]`} />
      <div
        className={`${fogCls} -right-[10%] bg-[rgba(124,227,90,0.06)] [animation-delay:-9s]`}
      />
    </div>
  );
}

export default SpookyBackdrop;
