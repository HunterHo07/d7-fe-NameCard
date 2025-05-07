'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;

interface HeaderProps {
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === 'undefined') return;

    // Set initial opacity to 0 for elements we want to animate
    if (logoRef.current) logoRef.current.style.opacity = '0';
    if (navItemsRef.current) {
      Array.from(navItemsRef.current.children).forEach(child => {
        (child as HTMLElement).style.opacity = '0';
      });
    }

    // Dynamically import GSAP
    import('gsap').then((module) => {
      gsap = module.gsap;

      // Initial animation
      if (logoRef.current && navItemsRef.current && gsap) {
        const tl = gsap.timeline();

        tl.fromTo(
          logoRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
        );

        tl.fromTo(
          navItemsRef.current.children,
          { opacity: 0, y: -10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'power2.out'
          },
          '-=0.3'
        );
      }

      // Scroll effect for transparent header
      if (transparent && headerRef.current) {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          const opacity = Math.min(scrollY / 200, 1);

          if (headerRef.current) {
            // Add shadow as user scrolls down
            if (opacity > 0.8) {
              headerRef.current.classList.add('shadow-md');
            } else {
              headerRef.current.classList.remove('shadow-md');
            }
          }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    });
  }, [transparent]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        transparent ? 'bg-white/80 backdrop-blur-sm' : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div ref={logoRef} className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-2">
            N
          </div>
          <span className="font-bold text-xl text-gray-800">
            NameCard
          </span>
        </div>

        <nav>
          <ul ref={navItemsRef} className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="font-medium transition-colors hover:text-blue-600 text-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/features"
                className="font-medium transition-colors hover:text-blue-600 text-gray-700"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="font-medium transition-colors hover:text-blue-600 text-gray-700"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Card
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
