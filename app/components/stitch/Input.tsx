'use client';

import { useEffect, useRef } from 'react';

interface StitchInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'search';
  disabled?: boolean;
  className?: string;
}

export default function StitchInput({
  label = '',
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  className = ''
}: StitchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-[12px] focus:border-red-500 focus:outline-none transition-colors disabled:bg-gray-100"
      />
    </div>
  );
}
