import React from 'react';

interface BrandLogoProps {
  brand: string;
  className?: string;
  showWordmark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ brand, className = 'h-7', showWordmark = true }) => {
  const norm = brand.toLowerCase().trim();

  // 1. CELFROST
  if (norm.includes('celfrost')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <circle cx="16" cy="16" r="15" fill="#0284C7" />
          {/* Frost crystal */}
          <path d="M16 6V26M6 16H26M9 9L23 23M9 23L23 9" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-lg tracking-wider text-[#0284C7] uppercase">
            CELFROST
          </span>
        )}
      </div>
    );
  }

  // 2. ELECTROLUX
  if (norm.includes('electrolux')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#0F2042" strokeWidth="3" />
          <path d="M10 16H22M16 10V22" stroke="#0F2042" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="6" fill="#0F2042" />
        </svg>
        {showWordmark && (
          <span className="font-display font-extrabold text-lg tracking-tight text-[#0F2042]">
            Electrolux
          </span>
        )}
      </div>
    );
  }

  // 3. FIORENZATO
  if (norm.includes('fiorenzato')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <path d="M4 8L16 28L28 8L22 8L16 20L10 8Z" fill="#DC2626" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-lg tracking-widest text-[#B91C1C] uppercase">
            FIORENZATO
          </span>
        )}
      </div>
    );
  }

  // 4. MIDDLEBY MARSHALL
  if (norm.includes('middleby')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="4" fill="#1E293B" />
          <path d="M7 23V9L16 17L25 9V23" stroke="#FF5722" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {showWordmark && (
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-sm tracking-tight text-slate-900 uppercase">
              MIDDLEBY
            </span>
            <span className="font-display font-extrabold text-[10px] tracking-widest text-slate-600 uppercase">
              MARSHALL
            </span>
          </div>
        )}
      </div>
    );
  }

  // 5. PITCO
  if (norm.includes('pitco')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="3" fill="#DC2626" />
          <path d="M8 8H18C21.3 8 24 10.7 24 14C24 17.3 21.3 20 18 20H13V25H8V8ZM13 16H17C18.1 16 19 15.1 19 14C19 12.9 18.1 12 17 12H13V16Z" fill="#FFFFFF" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-xl tracking-tighter text-[#DC2626] uppercase">
            PITCO
          </span>
        )}
      </div>
    );
  }

  // 6. TURBOCHEF
  if (norm.includes('turbochef')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <polygon points="18,3 6,18 16,18 14,29 26,14 16,14" fill="#EA580C" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black italic text-lg tracking-tight text-slate-900 uppercase">
            TURBO<span className="text-[#EA580C]">CHEF</span>
          </span>
        )}
      </div>
    );
  }

  // 7. MARCO
  if (norm.includes('marco')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <circle cx="16" cy="16" r="14" fill="#0F172A" />
          <circle cx="16" cy="16" r="6" fill="#F59E0B" />
        </svg>
        {showWordmark && (
          <span className="font-display font-bold text-lg tracking-widest text-slate-900 uppercase">
            MARCO
          </span>
        )}
      </div>
    );
  }

  // 8. TIMEMORE
  if (norm.includes('timemore')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="4" fill="#18181B" />
          <circle cx="16" cy="16" r="9" stroke="#E4E4E7" strokeWidth="2" />
          <path d="M16 11V16L19 19" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        {showWordmark && (
          <span className="font-display font-medium text-base tracking-widest text-zinc-900 uppercase">
            TIMEMORE
          </span>
        )}
      </div>
    );
  }

  // 9. MHW-3BOMBER
  if (norm.includes('bomber') || norm.includes('mhw')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="4" fill="#000000" />
          <polygon points="16,6 26,24 6,24" fill="#FF5722" />
          <circle cx="16" cy="18" r="3" fill="#000000" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-sm tracking-wider text-black uppercase">
            MHW-3BOMBER
          </span>
        )}
      </div>
    );
  }

  // 10. LA MARZOCCO
  if (norm.includes('marzocco')) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <circle cx="16" cy="16" r="15" fill="#991B1B" />
          {/* Florence Lion crown motif */}
          <path d="M10 20V12L13 15L16 10L19 15L22 12V20H10Z" fill="#FDE047" />
          <rect x="10" y="21" width="12" height="2" fill="#FFFFFF" />
        </svg>
        {showWordmark && (
          <span className="font-serif font-black text-base tracking-tight text-[#991B1B]">
            LA MARZOCCO
          </span>
        )}
      </div>
    );
  }

  // 11. LA CIMBALI
  if (norm.includes('cimbali')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="3" fill="#C2410C" />
          <path d="M22 10C20 8.5 17.5 8 15 8C10 8 7 11.5 7 16C7 20.5 10 24 15 24C17.5 24 20 23.5 22 22" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-lg tracking-tight text-[#C2410C] uppercase">
            LA CIMBALI
          </span>
        )}
      </div>
    );
  }

  // 12. FIAMMA
  if (norm.includes('fiamma')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <path d="M16 4C16 4 24 12 24 19C24 23.5 20.5 27 16 27C11.5 27 8 23.5 8 19C8 12 16 4 16 4Z" fill="#EA580C" />
          <path d="M16 13C16 13 20 17 20 20C20 22.2 18.2 24 16 24C13.8 24 12 22.2 12 20C12 17 16 13 16 13Z" fill="#FDE047" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-lg tracking-widest text-slate-900 uppercase">
            FIAMMA
          </span>
        )}
      </div>
    );
  }

  // 13. CUNILL
  if (norm.includes('cunill')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="3" fill="#047857" />
          <circle cx="16" cy="16" r="8" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-lg tracking-widest text-[#047857] uppercase">
            CUNILL
          </span>
        )}
      </div>
    );
  }

  // 14. TOASTMASTER
  if (norm.includes('toastmaster')) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg viewBox="0 0 32 32" className="h-full w-auto shrink-0" fill="none">
          <rect width="32" height="32" rx="3" fill="#D97706" />
          <path d="M7 11C7 9.3 8.3 8 10 8H22C23.7 8 25 9.3 25 11V22C25 23.7 23.7 25 22 25H10C8.3 25 7 23.7 7 22V11Z" fill="#FFFFFF" />
          <line x1="11" y1="12" x2="21" y2="12" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
          <line x1="11" y1="16" x2="21" y2="16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {showWordmark && (
          <span className="font-display font-black text-base tracking-tight text-amber-800 uppercase">
            TOASTMASTER
          </span>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold font-mono text-xs">
        {brand.slice(0, 3).toUpperCase()}
      </span>
      {showWordmark && (
        <span className="font-display font-bold text-sm tracking-wider text-slate-900 uppercase">
          {brand}
        </span>
      )}
    </div>
  );
};
