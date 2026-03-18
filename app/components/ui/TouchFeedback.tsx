'use client'

import { ReactNode, useState, useCallback } from 'react'

interface TouchFeedbackProps {
  children: ReactNode
  onTap?: () => void
  onDoubleTap?: () => void
  onLongPress?: () => void
  className?: string
  doubleTapDelay?: number
  longPressDelay?: number
}

export default function TouchFeedback({
  children,
  onTap,
  onDoubleTap,
  onLongPress,
  className = '',
  doubleTapDelay = 250,
  longPressDelay = 500,
}: TouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const handleTouchStart = useCallback(() => {
    setIsPressed(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsPressed(false)
    onTap?.()
    
    // 处理双击
    const newTapCount = tapCount + 1
    setTapCount(newTapCount)
    
    if (newTapCount === 2) {
      onDoubleTap?.()
      setTapCount(0)
    } else {
      setTimeout(() => setTapCount(0), doubleTapDelay)
    }
  }, [onTap, onDoubleTap, tapCount, doubleTapDelay])

  const handleLongPress = useCallback(() => {
    if (isPressed) {
      setIsPressed(false)
      onLongPress?.()
    }
  }, [isPressed, onLongPress])

  return (
    <div
      className={`${className} ${
        isPressed ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
      } transition-all duration-150 touch-manipulation cursor-pointer`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => setIsPressed(false)}
      onContextMenu={(e) => {
        e.preventDefault()
        handleLongPress()
      }}
    >
      {children}
    </div>
  )
}
