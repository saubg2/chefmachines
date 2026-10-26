import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'sm', linkToHome = true }) => {
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 38 : 32;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const content = (
    <div className={`flex items-center gap-2.5 font-display font-extrabold tracking-tight ${className}`}>
      {/* Precision Flame & Equipment Dial Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="44" height="44" rx="10" fill="#0F172A" />
          {/* Flame Toque */}
          <path
            d="M12 24.5C10.5 22.8 10 19.5 11.5 16.5C13 13.5 16 13 18 14C19.5 11.5 22.5 10.5 25.5 11.5C28.5 12.5 30 15 30 17.5C32 18 33.5 20 33 22.5C32.5 25 30.5 26 28 26H16C14.5 26 13 25.5 12 24.5Z"
            fill="url(#chefFlameGradLight)"
          />
          <rect x="13" y="28" width="18" height="2.5" rx="1.25" fill="#FFFFFF" />
          <rect x="15" y="32.5" width="14" height="2" rx="1" fill="#EA580C" />
          <defs>
            <linearGradient id="chefFlameGradLight" x1="10" y1="11" x2="33" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5722" />
              <stop offset="0.6" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className={`flex items-center tracking-tight ${textSize}`}>
          <span className="text-slate-900 font-extrabold tracking-tight">CHEF</span>
          <span className="text-brand-orange font-black ml-0.5">
            MACHINES
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
            Commercial Food Systems
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" title="500+ Active Outlets" />
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
