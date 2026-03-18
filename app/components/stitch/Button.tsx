'use client';

interface StitchButtonProps {
  variant?: 'filled' | 'outlined' | 'text' | 'tonal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function StitchButton({ 
  variant = 'filled', 
  size = 'md', 
  children, 
  onClick,
  disabled = false,
  className = ''
}: StitchButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  const variantClasses = {
    filled: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90',
    outlined: 'border-2 border-red-500 text-red-500 hover:bg-red-50',
    text: 'text-gray-600 hover:text-red-500',
    tonal: 'bg-red-100 text-red-600 hover:bg-red-200',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-[12px] 
        font-medium 
        transition-all 
        duration-200 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
