import Ladle from "./Ladle";

type CauldronProps = {
  /** true while the automation runs: a ladle stirs the brew and it bubbles harder */
  isLoading?: boolean;
};

function Cauldron({ isLoading = false }: CauldronProps) {
  return (
    <svg
      className={`relative z-1 h-auto w-[72%] overflow-visible desk:h-full desk:w-auto desk:max-w-[72%]${isLoading ? " is-brewing" : ""}`}
      viewBox="0 0 400 370"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="cd-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7CE35A" stopOpacity=".6" />
          <stop offset="100%" stopColor="#7CE35A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cd-fire-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7A1A" stopOpacity=".55" />
          <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cd-body" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#120D1A" />
          <stop offset="35%" stopColor="#2B2238" />
          <stop offset="100%" stopColor="#0E0A14" />
        </linearGradient>
        <radialGradient id="cd-brew" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#C6FFAE" />
          <stop offset="45%" stopColor="#7CE35A" />
          <stop offset="100%" stopColor="#3E9A2C" />
        </radialGradient>
        <clipPath id="cd-mouth">
          <ellipse cx="200" cy="112" rx="138" ry="26" />
        </clipPath>
      </defs>

      {/* glows */}
      <ellipse
        className="al-glow"
        cx="200"
        cy="100"
        rx="190"
        ry="90"
        fill="url(#cd-glow)"
      />
      <ellipse
        className="cd-fire-glow"
        cx="200"
        cy="340"
        rx="170"
        ry="40"
        fill="url(#cd-fire-glow)"
      />

      {/* legs */}
      <path
        d="M110 270 L96 318 L116 318 L130 278 Z"
        fill="#1A1424"
        stroke="#3A2F4D"
        strokeWidth="3"
      />
      <path
        d="M290 270 L304 318 L284 318 L270 278 Z"
        fill="#1A1424"
        stroke="#3A2F4D"
        strokeWidth="3"
      />

      {/* logs */}
      <rect
        x="120"
        y="330"
        width="160"
        height="16"
        rx="8"
        fill="#5A341C"
        transform="rotate(-8 200 338)"
      />
      <rect
        x="120"
        y="330"
        width="160"
        height="16"
        rx="8"
        fill="#6E4124"
        transform="rotate(8 200 338)"
      />

      {/* fire */}
      <g className="cd-flames">
        <path
          className="cd-flame f1"
          d="M150 340 C138 318 152 300 158 286 C160 304 174 312 170 340 Z"
          fill="#FF7A1A"
        />
        <path
          className="cd-flame f2"
          d="M180 342 C166 310 188 288 196 268 C198 292 220 306 212 342 Z"
          fill="#FF9A3D"
        />
        <path
          className="cd-flame f3"
          d="M220 340 C212 316 230 298 236 284 C238 302 252 314 246 340 Z"
          fill="#FF7A1A"
        />
        <path
          className="cd-flame f2"
          d="M186 342 C182 322 194 308 198 296 C200 312 212 322 206 342 Z"
          fill="#FFE27A"
        />
      </g>

      {/* everything from here to the drips rocks gently while brewing */}
      <g className="cd-pot">
        {/* pot body */}
        <path
          d="M58 112 C44 200 90 296 200 296 C310 296 356 200 342 112 Z"
          fill="url(#cd-body)"
        />
        <path
          d="M86 150 C84 200 108 250 150 272"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity=".08"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* glowing jack-o'-lantern emblem */}
        <g className="cd-emblem">
          <path
            d="M198 176 C197 168 201 164 207 163 L208 167 C204 168 203 171 204 176 Z"
            fill="#4FB83A"
          />
          <ellipse cx="184" cy="208" rx="20" ry="30" fill="#FF7A1A" />
          <ellipse cx="216" cy="208" rx="20" ry="30" fill="#FF7A1A" />
          <ellipse cx="200" cy="208" rx="22" ry="32" fill="#FF9A3D" />
          <path
            d="M190 180 C184 196 184 222 190 238 M210 180 C216 196 216 222 210 238"
            fill="none"
            stroke="#C24E00"
            strokeWidth="1.5"
          />
          <g className="pk-face" fill="#FFE27A">
            <path d="M180 202 L190 202 L185 192 Z" />
            <path d="M210 202 L220 202 L215 192 Z" />
            <path d="M176 214 Q200 234 224 214 L218 217 L214 213 L209 219 L204 215 L200 220 L196 215 L191 219 L186 213 L182 217 Z" />
          </g>
        </g>

        {/* brew surface */}
        <ellipse cx="200" cy="112" rx="138" ry="26" fill="#1F3318" />
        <g clipPath="url(#cd-mouth)">
          <g className="al-surface">
            <ellipse cx="200" cy="116" rx="140" ry="24" fill="url(#cd-brew)" />
            <circle
              cx="150"
              cy="114"
              r="8"
              fill="none"
              stroke="#E7FFD9"
              strokeWidth="2"
              strokeOpacity=".7"
            />
            <circle cx="240" cy="118" r="5" fill="#E7FFD9" fillOpacity=".7" />
            <circle
              cx="200"
              cy="108"
              r="11"
              fill="none"
              stroke="#E7FFD9"
              strokeWidth="2"
              strokeOpacity=".5"
            />
          </g>

          {/* whirlpool, squashed into the surface ellipse: dark vortex arms
            with light highlights, plus a sinking dark centre */}
          {isLoading && (
            <g transform="translate(200 114) scale(1 0.19)">
              <g className="cd-swirl" fill="none" strokeLinecap="round">
                <g stroke="#2E7A20" strokeWidth="14" strokeOpacity=".75">
                  <path d="M0 0 C40 -14 64 26 38 62 C0 112 -88 76 -100 0 C-112 -88 -12 -150 76 -138 C160 -124 182 -24 170 50" />
                  <path d="M0 0 C-40 14 -64 -26 -38 -62 C0 -112 88 -76 100 0 C112 88 12 150 -76 138 C-160 124 -182 24 -170 -50" />
                </g>
                <g stroke="#E7FFD9" strokeWidth="6" strokeOpacity=".85">
                  <path d="M10 -20 C52 -30 70 20 44 52 C10 92 -60 70 -76 18" />
                  <path d="M-10 20 C-52 30 -70 -20 -44 -52 C-10 -92 60 -70 76 -18" />
                  <path
                    d="M120 -96 C160 -70 172 -10 160 40"
                    strokeOpacity=".5"
                  />
                  <path
                    d="M-120 96 C-160 70 -172 10 -160 -40"
                    strokeOpacity=".5"
                  />
                </g>
              </g>
              <ellipse
                className="cd-vortex"
                cx="0"
                cy="0"
                rx="34"
                ry="34"
                fill="#1F3318"
              />
            </g>
          )}
        </g>

        {/* witch's ladle — only while brewing (see Ladle.tsx for the stirring math) */}
        {isLoading && <Ladle />}

        {/* rim */}
        <ellipse
          cx="200"
          cy="112"
          rx="146"
          ry="30"
          fill="none"
          stroke="#3A2F4D"
          strokeWidth="14"
        />
        <ellipse
          cx="200"
          cy="108"
          rx="146"
          ry="29"
          fill="none"
          stroke="#5C4C78"
          strokeWidth="3"
          strokeOpacity=".6"
        />

        {/* slime drips over the front lip */}
        <path
          d="M120 136 C122 150 118 160 124 166 C130 160 126 150 132 139 Z M248 140 C250 158 246 172 253 178 C260 172 256 156 260 139 Z M300 128 C302 138 300 146 305 150 C310 146 307 136 310 126 Z"
          fill="#7CE35A"
        />
      </g>

      {/* bubbles escaping upward (toward the result slot) */}
      <circle className="cd-bubble b1" cx="150" cy="100" r="7" fill="#C6FFAE" />
      <circle className="cd-bubble b2" cx="210" cy="96" r="5" fill="#9DF27A" />
      <circle
        className="cd-bubble b3"
        cx="250"
        cy="102"
        r="9"
        fill="none"
        stroke="#C6FFAE"
        strokeWidth="2.5"
      />
      <circle className="cd-bubble b4" cx="180" cy="98" r="4" fill="#E7FFD9" />
      <circle className="cd-bubble b5" cx="270" cy="100" r="5" fill="#9DF27A" />
      <circle className="cd-bubble b6" cx="125" cy="104" r="4" fill="#E7FFD9" />
    </svg>
  );
}

export default Cauldron;
