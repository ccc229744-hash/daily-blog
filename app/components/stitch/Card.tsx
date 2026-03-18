'use client';

interface StitchCardProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3;
  className?: string;
}

export default function StitchCard({ 
  children, 
  elevation = 1,
  className = '' 
}: StitchCardProps) {
  const elevationClasses = {
    0: 'shadow-none',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
  };

  return (
    <div className={`
      bg-white 
      rounded-[18px] 
      p-6 
      transition-shadow 
      duration-300 
      hover:shadow-lg
      ${elevationClasses[elevation]}
      ${className}
    `}>
      {children}
    </div>
  );
}
