import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', linkToHome = true }) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';

  const content = (
    <div className={`flex items-center gap-2.5 font-display font-extrabold tracking-tight ${className}`}>
      {/* Custom Vector Icon: Flame Toque & Industrial Machine Gear */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Rounded industrial badge backdrop */}
          <rect width="44" height="44" rx="11" fill="#121824" stroke="#253245" strokeWidth="1.5" />
          
          {/* Flame Gradient Toque / Burner Head */}
          <path
            d="M12 24.5C10.5 22.8 10 19.5 11.5 16.5C13 13.5 16 13 18 14C19.5 11.5 22.5 10.5 25.5 11.5C28.5 12.5 30 15 30 17.5C32 18 33.5 20 33 22.5C32.5 25 30.5 26 28 26H16C14.5 26 13 25.5 12 24.5Z"
            fill="url(#chefFlameGrad)"
          />
          
          {/* Commercial Grill / Machine Slat Plates */}
          <rect x="13" y="28" width="18" height="2.5" rx="1.25" fill="#FFFFFF" />
          <rect x="15" y="32.5" width="14" height="2" rx="1" fill="#FFA000" />
          
          {/* Center Precision Dial / Node */}
          <circle cx="22" cy="20.5" r="2.5" fill="#121824" />
          <circle cx="22" cy="20.5" r="1.2" fill="#FFFFFF" />

          <defs>
            <linearGradient id="chefFlameGrad" x1="10" y1="11" x2="33" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5722" />
              <stop offset="0.55" stopColor="#FF9800" />
              <stop offset="1" stopColor="#FFC107" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className={`flex items-center tracking-tight ${textSize}`}>
          <span className="text-white font-extrabold tracking-tight">CHEF</span>
          <span className="bg-gradient-to-r from-brand-orange via-amber-400 to-amber-300 bg-clip-text text-transparent font-black ml-0.5">
            MACHINES
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
            Commercial Kitchen Systems
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="500+ Active Commercial Kitchens" />
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
