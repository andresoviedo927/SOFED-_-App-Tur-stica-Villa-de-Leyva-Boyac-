import React from 'react';

export const SkyDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Interactive sun at the top left */}
      <div className="absolute left-[20px] sm:left-[40px] top-0 w-[220px] sm:w-[285px] h-[190px] sm:h-[243px]">
        <svg viewBox="0 0 285 243" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
              <stop offset="30%" stopColor="#FDE047" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Sun Halo Rays */}
          <circle cx="120" cy="80" r="100" fill="url(#sunGlow)" />
          {/* Core Sun Disc */}
          <circle cx="120" cy="80" r="32" fill="#FFFFFF" />
          <circle cx="120" cy="80" r="32" fill="#FEF08A" opacity="0.6" />
        </svg>
      </div>

      {/* Nube 6 (Top Left near Sun) */}
      <div className="absolute left-[100px] sm:left-[118px] top-[40px] sm:top-[56px] w-[120px] sm:w-[154px] h-[80px] sm:h-[110px] opacity-90">
        <svg viewBox="0 0 154 110" fill="none" className="w-full h-full">
          <ellipse cx="77" cy="65" rx="60" ry="25" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="50" cy="55" r="30" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="85" cy="45" r="35" fill="#FFFFFF" fillOpacity="0.95" />
          <circle cx="115" cy="60" r="25" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      </div>

      {/* Nube 4 (Top Right) */}
      <div className="absolute right-[120px] sm:right-[150px] top-0 w-[180px] sm:w-[232px] h-[110px] sm:h-[146px] opacity-85">
        <svg viewBox="0 0 232 146" fill="none" className="w-full h-full">
          <ellipse cx="116" cy="90" rx="90" ry="35" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="75" cy="75" r="45" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="130" cy="60" r="50" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="175" cy="80" r="38" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Nube 5 (Far Right) */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[160px] sm:w-[214px] h-[130px] sm:h-[181px] opacity-80">
        <svg viewBox="0 0 214 181" fill="none" className="w-full h-full">
          <ellipse cx="107" cy="110" rx="85" ry="40" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="70" cy="90" r="45" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="125" cy="75" r="50" fill="#FFFFFF" fillOpacity="0.9" />
        </svg>
      </div>

      {/* Nube 2 (Far Left) */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-[120px] sm:w-[142px] h-[90px] sm:h-[111px] opacity-75">
        <svg viewBox="0 0 142 111" fill="none" className="w-full h-full">
          <ellipse cx="71" cy="70" rx="55" ry="25" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="45" cy="55" r="30" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="85" cy="50" r="32" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      </div>

      {/* Nube 1 (Bottom Floating) */}
      <div className="absolute left-[250px] sm:left-[280px] bottom-0 w-[110px] sm:w-[135px] h-[90px] sm:h-[116px] opacity-85">
        <svg viewBox="0 0 135 116" fill="none" className="w-full h-full">
          <ellipse cx="67" cy="75" rx="50" ry="22" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="45" cy="60" r="28" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="80" cy="55" r="30" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      </div>
    </div>
  );
};

export default SkyDecorations;
