import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-8 py-3 rounded-full text-lg font-medium transition'
  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-800 shadow-lg',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
