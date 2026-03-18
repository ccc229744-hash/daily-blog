'use client'

import { useState, forwardRef } from 'react'

interface ToggleButtonProps {
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (checked: boolean) => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
  className?: string
  disabled?: boolean
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      defaultChecked,
      checked: controlledChecked,
      onChange,
      leftIcon,
      rightIcon,
      size = 'md',
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked || false)
    
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked : uncontrolledChecked

    const handleToggle = () => {
      if (isControlled) {
        onChange?.(!isChecked)
      } else {
        setUncontrolledChecked(!isChecked)
        onChange?.(!isChecked)
      }
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    }

    return (
      <button
        ref={ref}
        onClick={handleToggle}
        className={`
          inline-flex items-center justify-center gap-2
          ${sizes[size]}
          ${isChecked 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }
          rounded-full font-medium
          transition-all duration-300
          ${className}
        `}
        {...props}
      >
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

ToggleButton.displayName = 'ToggleButton'

export default ToggleButton
