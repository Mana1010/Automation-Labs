type PumpkinProps = {
  className?: string
  /** 'grin' = classic jack-o'-lantern, 'spooky' = wide fanged grin */
  face?: 'grin' | 'spooky'
}

function Pumpkin({ className, face = 'grin' }: PumpkinProps) {
  return (
    <svg className={className} viewBox="0 0 120 110" aria-hidden="true">
      <defs>
        <radialGradient id={`pk-body-${face}`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFB04D" />
          <stop offset="60%" stopColor="#FF7A1A" />
          <stop offset="100%" stopColor="#C24E00" />
        </radialGradient>
      </defs>

      {/* stem + leaf */}
      <path d="M58 22 C56 12 60 6 68 4 L70 9 C64 11 63 16 64 22 Z" fill="#4FB83A" />
      <path d="M66 14 C78 6 90 10 92 18 C82 16 74 18 66 14 Z" fill="#7CE35A" />
      <path d="M70 10 C74 2 82 2 84 6" fill="none" stroke="#4FB83A" strokeWidth="2" strokeLinecap="round" />

      {/* body segments */}
      <ellipse cx="34" cy="62" rx="28" ry="38" fill={`url(#pk-body-${face})`} />
      <ellipse cx="86" cy="62" rx="28" ry="38" fill={`url(#pk-body-${face})`} />
      <ellipse cx="60" cy="62" rx="32" ry="42" fill={`url(#pk-body-${face})`} />
      <path d="M44 24 C34 50 34 80 44 102" fill="none" stroke="#B84800" strokeWidth="2" strokeOpacity=".7" />
      <path d="M76 24 C86 50 86 80 76 102" fill="none" stroke="#B84800" strokeWidth="2" strokeOpacity=".7" />
      <path d="M30 34 C24 44 22 54 24 62" fill="none" stroke="#FFD08A" strokeWidth="3" strokeLinecap="round" strokeOpacity=".5" />

      {/* glowing face */}
      <g className="pk-face" fill="#FFE27A">
        {face === 'grin' ? (
          <>
            <path d="M36 50 L48 50 L42 38 Z" />
            <path d="M72 50 L84 50 L78 38 Z" />
            <path d="M56 58 L64 58 L60 66 Z" />
            <path d="M30 70 Q60 96 90 70 L82 74 L78 70 L72 77 L66 72 L60 79 L54 72 L48 77 L42 70 L38 74 Z" />
          </>
        ) : (
          <>
            <path d="M34 46 Q42 36 50 48 Q42 52 34 46 Z" />
            <path d="M70 48 Q78 36 86 46 Q78 52 70 48 Z" />
            <path d="M56 60 L64 60 L60 54 Z" />
            <path d="M28 68 Q60 102 92 68 Q60 82 28 68 Z M44 74 L48 82 L52 75 Z M68 75 L72 82 L76 74 Z" fillRule="evenodd" />
          </>
        )}
      </g>
    </svg>
  )
}

export default Pumpkin
