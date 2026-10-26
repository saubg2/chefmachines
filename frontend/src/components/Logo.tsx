import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  linkToHome?: boolean;
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds, 'dark' is for dark backgrounds (e.g. footer)
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  linkToHome = true,
  variant = 'light'
}) => {
  const iconSize = size === 'sm' ? 30 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subTextSize = size === 'sm' ? 'text-[8px]' : size === 'lg' ? 'text-[11px]' : 'text-[9px]';

  const isDarkBg = variant === 'dark';

  const content = (
    <div className={`flex items-center gap-2.5 font-display tracking-tight select-none ${className}`}>
      {/* Precision Engineered Hex-Flame Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:scale-105"
        >
          {/* Engineering Hex Shield */}
          <polygon
            points="24,3 43,14 43,34 24,45 5,34 5,14"
            fill="#0F172A"
            stroke="#1E293B"
            strokeWidth="2"
          />
          {/* Subtle Inner Accent Rim */}
          <polygon
            points="24,6 40,15.5 40,32.5 24,42 8,32.5 8,15.5"
            fill="none"
            stroke="#FF5722"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />

          {/* Precision Flame Core (Dual Thermal Arc) */}
          <path
            d="M24 10C24 10 29 16 29 22C29 25.5 26.8 28.5 24 29.5C21.2 28.5 19 25.5 19 22C19 16 24 10 24 10Z"
            fill="url(#chefFlameLinear)"
          />

          {/* Dynamic Burner Jets / Induction Coils at base */}
          <path
            d="M15 31.5C17.5 34.5 20.5 36 24 36C27.5 36 30.5 34.5 33 31.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M18 35.5C19.8 37.5 21.8 38.5 24 38.5C26.2 38.5 28.2 37.5 30 35.5"
            stroke="#FF5722"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="chefFlameLinear" x1="24" y1="10" x2="24" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6B35" />
              <stop offset="0.5" stopColor="#FF5722" />
              <stop offset="1" stopColor="#E63900" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`flex items-baseline font-black tracking-tight ${textSize}`}>
          <span className={isDarkBg ? 'text-white' : 'text-slate-900'}>
            CHEF
          </span>
          <span className="text-[#FF5722] ml-1">
            MACHINES
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`font-semibold tracking-wider uppercase ${subTextSize} ${isDarkBg ? 'text-slate-400' : 'text-slate-500'}`}>
            Commercial Kitchen Systems
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Active Hotline 9782690188" />
        </div>
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="group inline-flex items-center focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
