import React from 'react';

interface CategoryIconProps {
  slug: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ slug, className = 'w-5 h-5' }) => {
  const norm = slug.toLowerCase();

  // 1. QSR & COMMERCIAL FRYING
  if (norm.includes('qsr') || norm.includes('fry')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Fryer basket & thermal sizzle */}
        <path d="M4 11h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" />
        <path d="M4 15h16" />
        <path d="M8 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <line x1="8" y1="3" x2="8" y2="4" />
        <line x1="12" y1="2" x2="12" y2="3" />
        <line x1="16" y1="3" x2="16" y2="4" />
      </svg>
    );
  }

  // 2. COMMERCIAL REFRIGERATION & COLD CHAIN
  if (norm.includes('refrigeration') || norm.includes('freezer') || norm.includes('cold') || norm.includes('ice')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Upright reach-in chiller + frost element */}
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="8" y1="6" x2="8" y2="8" />
        <line x1="8" y1="16" x2="8" y2="18" />
        <circle cx="15" cy="7" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // 3. COMBI OVENS & RAPID COOKING
  if (norm.includes('cooking') || norm.includes('oven') || norm.includes('pizza')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Touchscreen Combi Convection Oven */}
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <rect x="6" y="6" width="9" height="12" rx="1" />
        <circle cx="18" cy="8" r="1.5" fill="currentColor" />
        <circle cx="18" cy="13" r="1.5" fill="currentColor" />
        <path d="M9 10c.8-.8 1.2-.8 2 0s1.2.8 2 0" />
        <path d="M9 14c.8-.8 1.2-.8 2 0s1.2.8 2 0" />
      </svg>
    );
  }

  // 4. ESPRESSO & COFFEE SYSTEMS
  if (norm.includes('espresso') || norm.includes('coffee') || norm.includes('beverage')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Commercial Portafilter & dual spout */}
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    );
  }

  // 5. BAKERY & FOOD PREP
  if (norm.includes('bakery') || norm.includes('prep') || norm.includes('mixer')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Industrial Spiral Mixer & Bowl */}
        <path d="M5 19a7 7 0 0 0 14 0V9H5v10Z" />
        <path d="M5 9V4h14v5" />
        <path d="M12 9v5a2 2 0 0 0 2 2" />
      </svg>
    );
  }

  // 6. COMMERCIAL WAREWASHING
  if (norm.includes('warewash') || norm.includes('wash') || norm.includes('dish')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {/* Hood-type pass-through dishwasher spray */}
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 11h18" />
        <path d="M12 5V2" />
        <path d="M8 15h.01M12 15h.01M16 15h.01M10 18h.01M14 18h.01" />
      </svg>
    );
  }

  // Fallback
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
};
