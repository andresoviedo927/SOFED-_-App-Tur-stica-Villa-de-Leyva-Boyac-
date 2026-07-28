import React from 'react';

export const VillaMapIllustration: React.FC = () => {
  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full h-full drop-shadow-2xl select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Island Terrain Shadows & Gradients */}
        <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#002840" floodOpacity="0.35" />
        </filter>

        <linearGradient id="islandRock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A6038" />
          <stop offset="50%" stopColor="#5C3D21" />
          <stop offset="100%" stopColor="#3B2310" />
        </linearGradient>

        <linearGradient id="grassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#82C338" />
          <stop offset="50%" stopColor="#589B23" />
          <stop offset="100%" stopColor="#3E7216" />
        </linearGradient>

        <linearGradient id="plazaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E6D3B3" />
          <stop offset="100%" stopColor="#C9B18B" />
        </linearGradient>

        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
      </defs>

      <g filter="url(#mapShadow)">
        {/* 3D Underground Rock Base Slab */}
        <path
          d="M 120 180 L 190 290 L 320 320 L 480 260 L 520 170 L 420 100 L 280 80 L 160 110 Z"
          fill="url(#islandRock)"
        />
        <path
          d="M 190 290 L 320 320 L 480 260 L 480 275 L 320 335 L 190 305 Z"
          fill="#29180A"
          opacity="0.8"
        />

        {/* Top Lush Green Island Surface */}
        <path
          d="M 120 170 C 140 100 240 70 340 75 C 440 80 530 110 520 160 C 510 210 440 270 320 310 C 200 300 110 240 120 170 Z"
          fill="url(#grassGrad)"
          stroke="#4D8A1C"
          strokeWidth="3"
        />

        {/* River Streams */}
        <path
          d="M 330 90 Q 290 140 260 170 Q 220 200 180 220"
          stroke="url(#waterGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 390 110 Q 420 130 450 160 Q 480 180 500 210"
          stroke="url(#waterGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mountain Peak & Waterfall (Top Left) */}
        <g transform="translate(300, 75)">
          <path d="M 20 20 L 40 -25 L 60 20 Z" fill="#64748B" />
          <path d="M 28 20 L 40 -25 L 45 20 Z" fill="#94A3B8" />
          {/* Waterfall Flow */}
          <path d="M 38 -15 Q 36 5 35 25" stroke="#7DD3FC" strokeWidth="4" strokeLinecap="round" />
          {/* Waterfall Pool */}
          <ellipse cx="35" cy="27" rx="12" ry="6" fill="#0284C7" />
        </g>

        {/* Blue Pools (Pozos Azules - Bottom Left) */}
        <g transform="translate(170, 220)">
          <ellipse cx="20" cy="15" rx="18" ry="10" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
          <ellipse cx="45" cy="22" rx="14" ry="8" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
        </g>

        {/* Plaza Mayor (Cobblestone Square - Center) */}
        <polygon
          points="240,165 310,145 350,195 280,215"
          fill="url(#plazaGrad)"
          stroke="#B49870"
          strokeWidth="2"
        />
        {/* Plaza Grid Lines */}
        <line x1="260" y1="160" x2="300" y2="210" stroke="#9C825C" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="280" y1="154" x2="320" y2="204" stroke="#9C825C" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="255" y1="180" x2="325" y2="160" stroke="#9C825C" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="265" y1="195" x2="335" y2="175" stroke="#9C825C" strokeWidth="1" strokeDasharray="2 2" />

        {/* Plaza Fountain */}
        <circle cx="295" cy="180" r="5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Iglesia Principal (Nuestra Señora del Rosario) */}
        <g transform="translate(290, 130)">
          {/* Main Church Wall */}
          <rect x="0" y="10" width="30" height="22" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          {/* Roof */}
          <polygon points="-2,10 15,-2 32,10" fill="url(#roofGrad)" />
          {/* Church Arch Door */}
          <path d="M 10 32 L 10 24 A 5 5 0 0 1 20 24 L 20 32 Z" fill="#475569" />
          {/* Bell Tower */}
          <rect x="22" y="-12" width="12" height="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
          <polygon points="20,-12 28,-22 36,-12" fill="url(#roofGrad)" />
          <circle cx="28" cy="-5" r="2.5" fill="#475569" />
        </g>

        {/* Surrounding Colonial Houses */}
        {/* House 1 (Left Plaza) */}
        <g transform="translate(205, 175)">
          <rect x="0" y="0" width="22" height="14" fill="#FFFFFF" stroke="#E2E8F0" />
          <polygon points="-2,0 11,-8 24,0" fill="url(#roofGrad)" />
          <rect x="8" y="5" width="6" height="9" fill="#334155" />
        </g>
        {/* House 2 (Right Plaza) */}
        <g transform="translate(355, 185)">
          <rect x="0" y="0" width="24" height="14" fill="#FFFFFF" stroke="#E2E8F0" />
          <polygon points="-2,0 12,-8 26,0" fill="url(#roofGrad)" />
          <rect x="9" y="5" width="6" height="9" fill="#334155" />
        </g>
        {/* House 3 (Top Hill) */}
        <g transform="translate(370, 115)">
          <rect x="0" y="0" width="18" height="12" fill="#FEF3C7" stroke="#E2E8F0" />
          <polygon points="-2,0 9,-6 20,0" fill="url(#roofGrad)" />
        </g>
        {/* House 4 (Campsite Huts Right) */}
        <g transform="translate(430, 125)">
          <rect x="0" y="0" width="16" height="10" fill="#FEF3C7" stroke="#E2E8F0" />
          <polygon points="-2,0 8,-5 18,0" fill="url(#roofGrad)" />
        </g>

        {/* Camping Tents (Right Hill) */}
        <g transform="translate(390, 150)">
          <polygon points="0,12 8,0 16,12" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          <polygon points="20,14 27,2 34,14" fill="#EA580C" stroke="#9A3412" strokeWidth="1" />
        </g>

        {/* Trees Clusters */}
        <g fill="#166534">
          {/* Left Forest */}
          <circle cx="150" cy="180" r="10" />
          <circle cx="160" cy="170" r="12" fill="#15803D" />
          <circle cx="145" cy="195" r="9" />
          {/* Top Forest around Mountain */}
          <circle cx="280" cy="100" r="11" fill="#15803D" />
          <circle cx="295" cy="92" r="13" />
          <circle cx="350" cy="105" r="12" fill="#15803D" />
          {/* Right Hill Forest */}
          <circle cx="440" cy="105" r="11" />
          <circle cx="460" cy="115" r="14" fill="#15803D" />
          <circle cx="480" cy="130" r="12" />
          <circle cx="420" cy="170" r="10" fill="#15803D" />
          {/* Bottom Left Forest */}
          <circle cx="200" cy="245" r="11" />
          <circle cx="215" cy="255" r="13" fill="#15803D" />
        </g>
      </g>
    </svg>
  );
};

export default VillaMapIllustration;
