function FlaskLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <clipPath id="al-flask">
          <circle cx="60" cy="78" r="33" />
        </clipPath>
        <radialGradient id="al-halo" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#7CE35A" stopOpacity=".55" />
          <stop offset="100%" stopColor="#7CE35A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="al-glow" cx="60" cy="80" r="52" fill="url(#al-halo)" />
      <rect x="51" y="20" width="18" height="30" rx="3" fill="#1C1428" stroke="#B9A6D9" strokeWidth="3" />
      <rect x="47" y="12" width="26" height="11" rx="4" fill="#FF9A3D" />
      <rect x="51" y="14" width="6" height="7" rx="2" fill="#FFC27F" />
      <circle cx="60" cy="78" r="33" fill="#1C1428" />
      <g clipPath="url(#al-flask)">
        <g className="al-surface">
          <path d="M20 72 Q34 64 48 72 T76 72 T104 72 L104 120 L20 120 Z" fill="#7CE35A" />
          <path d="M20 76 Q34 70 48 76 T76 76 T104 76 L104 120 L20 120 Z" fill="#4FB83A" />
        </g>
        <circle className="al-b1" cx="46" cy="100" r="4" fill="#C6FFAE" />
        <circle className="al-b2" cx="62" cy="104" r="3" fill="#C6FFAE" />
        <circle className="al-b3" cx="72" cy="98" r="5" fill="none" stroke="#C6FFAE" strokeWidth="2" />
        <circle className="al-b4" cx="54" cy="94" r="2.5" fill="#E7FFD9" />
        <circle className="al-b5" cx="80" cy="102" r="2" fill="#E7FFD9" />
      </g>
      <circle cx="60" cy="78" r="33" fill="none" stroke="#B9A6D9" strokeWidth="3" />
      <path d="M38 66 Q40 56 48 52" fill="none" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
      <circle className="al-b2" cx="66" cy="40" r="3" fill="#9DF27A" />
      <circle className="al-b4" cx="55" cy="44" r="2" fill="#9DF27A" />
    </svg>
  )
}

export default FlaskLogo
