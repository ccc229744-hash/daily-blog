'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StitchNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      transition-all duration-300
      ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-[12px]" />
            <span className="text-xl font-bold text-gray-900">每日博客</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">
              关于
            </Link>
            <Link href="/archive" className="text-gray-600 hover:text-gray-900 transition">
              归档
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900 transition">
              分类
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-gray-900 transition">
              搜索
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
