import React from 'react';

export const RibbonBanner: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-[280px] sm:w-[316px] h-[50px] sm:h-[63px] mx-auto select-none pointer-events-none drop-shadow-xl z-20">
      <svg
        viewBox="0 0 316 63"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D96E14" />
            <stop offset="50%" stopColor="#BD4F08" />
            <stop offset="100%" stopColor="#7C2D03" />
          </linearGradient>
          <linearGradient id="ribbonFold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5B1F01" />
            <stop offset="100%" stopColor="#3B1200" />
          </linearGradient>
          <linearGradient id="goldText" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1D6" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="ribbonShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#ribbonShadow)">
          {/* Ribbon Tail Left */}
          <path d="M 10 20 L 45 12 L 45 48 L 10 56 L 25 38 Z" fill="url(#ribbonFold)" />

          {/* Ribbon Tail Right */}
          <path d="M 306 20 L 271 12 L 271 48 L 306 56 L 291 38 Z" fill="url(#ribbonFold)" />

          {/* Ribbon Main Curved Body */}
          <path
            d="M 38 15 Q 158 2 278 15 Q 282 35 278 48 Q 158 62 38 48 Q 34 35 38 15 Z"
            fill="url(#ribbonGrad)"
            stroke="#FDE68A"
            strokeWidth="1.5"
          />

          {/* Golden Ribbon Inset Line */}
          <path
            d="M 44 20 Q 158 8 272 20 M 44 43 Q 158 55 272 43"
            stroke="#FDE68A"
            strokeWidth="0.8"
            strokeDasharray="3 2"
            opacity="0.8"
          />

          {/* Ribbon Text: VILLA DE LEYVA */}
          <text
            x="158"
            y="37"
            textAnchor="middle"
            fill="url(#goldText)"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="3"
            stroke="#451A03"
            strokeWidth="0.5"
          >
            VILLA DE LEYVA
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RibbonBanner;
