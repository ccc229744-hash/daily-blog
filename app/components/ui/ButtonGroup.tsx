'use client'

import { ReactNode } from 'react'

interface ButtonGroupProps {
  children: ReactNode
  variant?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ButtonGroup({
  children,
  variant = 'horizontal',
  size = 'md',
  className = '',
}: ButtonGroupProps) {
  const directionStyles = {
    horizontal: 'flex-row space-x-0',
    vertical: 'flex-col space-y-0',
  }

  const sizeStyles = {
    sm: '[&>button]:px-3 [&>button]:py-1 [&>button]:text-xs',
    md: '[&>button]:px-4 [&>button]:py-2 [&>button]:text-sm',
    lg: '[&>button]:px-6 [&>button]:py-3 [&>button]:text-base',
  }

  return (
    <div className={`inline-flex ${directionStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  )
}
