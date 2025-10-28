export function ArtisticAmpersand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`inline-block ${className}`}
      style={{ verticalAlign: 'baseline' }}
    >
      <defs>
        {/* Rich red gradient inspired by plated sauce */}
        <linearGradient id="ampersandGradient" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#991B1B', stopOpacity: 1 }} />
          <stop offset="35%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
          <stop offset="65%" style={{ stopColor: '#B91C1C', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#7F1D1D', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Subtle glow effect */}
        <filter id="ampersandGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Shine effect */}
        <radialGradient id="shineGradient">
          <stop offset="0%" style={{ stopColor: '#FEE2E2', stopOpacity: 0.4 }} />
          <stop offset="100%" style={{ stopColor: '#FEE2E2', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      
      {/* Main flowing ampersand - inspired by elegant sauce swirl */}
      <path
        d="M 65 18
           C 75 15, 82 18, 85 25
           C 88 32, 85 38, 78 43
           C 72 47, 64 50, 55 52
           C 50 53, 46 55, 42 58
           C 38 62, 35 67, 35 73
           C 35 78, 37 82, 42 85
           C 47 88, 53 88, 58 85
           C 62 83, 65 80, 67 76
           C 68 74, 69 73, 71 73
           C 73 73, 75 74, 76 76
           C 78 80, 79 85, 78 89
           C 76 94, 72 97, 66 99
           C 58 101, 48 100, 40 95
           C 32 90, 27 82, 27 72
           C 27 65, 29 59, 33 54
           C 35 51, 37 49, 38 46
           C 38 44, 36 42, 33 39
           C 28 34, 25 28, 25 22
           C 25 15, 29 9, 36 6
           C 43 3, 51 4, 57 8
           C 62 11, 65 16, 65 22
           C 65 27, 62 31, 57 33
           C 53 35, 48 34, 45 31
           C 43 29, 42 26, 43 24
           C 44 22, 46 21, 48 22
           C 50 23, 51 25, 51 27
           C 51 28, 50 29, 49 29
           C 49 29, 50 29, 51 28
           C 54 26, 56 23, 56 20
           C 56 16, 53 13, 49 11
           C 45 9, 40 10, 37 13
           C 34 16, 33 20, 35 24
           C 37 28, 41 32, 46 35
           C 50 37, 54 38, 57 38
           C 62 38, 67 36, 71 33
           C 76 29, 78 24, 76 20
           C 75 17, 72 15, 68 16
           C 65 17, 64 18, 65 18
           Z"
        fill="url(#ampersandGradient)"
        filter="url(#ampersandGlow)"
        style={{
          paintOrder: 'fill',
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        }}
      />
      
      {/* Highlight accents - like sauce gloss */}
      <ellipse
        cx="50"
        cy="25"
        rx="8"
        ry="6"
        fill="url(#shineGradient)"
        opacity="0.6"
      />
      
      <path
        d="M 45 30 Q 48 28, 51 30"
        stroke="rgba(254, 226, 226, 0.5)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Artistic flourish at bottom */}
      <path
        d="M 55 82 Q 58 81, 60 83"
        stroke="rgba(254, 226, 226, 0.4)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
