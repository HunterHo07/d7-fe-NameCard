'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Player } from '@lottiefiles/react-lottie-player';
import BusinessCard from './BusinessCard';
import { CardData } from './CardForm';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;

const sampleCardData: CardData = {
  name: 'Hunter Ho',
  title: 'Founder & CEO',
  company: 'NameCard',
  email: 'hunter@namecard.io',
  phone: '+1 (555) 123-4567',
  website: 'https://namecard.io',
  color: '#3b82f6'
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === 'undefined') return;

    // Set initial opacity to 0 for elements we want to animate
    if (headingRef.current) headingRef.current.style.opacity = '0';
    if (subheadingRef.current) subheadingRef.current.style.opacity = '0';
    if (ctaRef.current) ctaRef.current.style.opacity = '0';
    if (cardRef.current) cardRef.current.style.opacity = '0';

    // Dynamically import GSAP
    import('gsap').then((module) => {
      gsap = module.gsap;

      if (headingRef.current && subheadingRef.current && ctaRef.current && cardRef.current && gsap) {
        // Simple animations that don't manipulate DOM directly
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        );

        // Animate subheading
        gsap.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.3 }
        );

        // Animate CTA buttons
        gsap.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 0.5 }
        );

        // Animate card with a bounce effect
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotation: -5
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: 0.7,
            ease: 'back.out(1.7)'
          }
        );

        // Parallax effect on scroll
        if (heroRef.current && cardRef.current) {
          const handleScroll = () => {
            const scrollY = window.scrollY;
            const parallaxValue = scrollY * 0.2;

            if (cardRef.current) {
              gsap.to(cardRef.current, {
                y: parallaxValue,
                rotation: parallaxValue * 0.05,
                duration: 0.3,
                ease: 'power1.out'
              });
            }
          };

          window.addEventListener('scroll', handleScroll);
          return () => window.removeEventListener('scroll', handleScroll);
        }
      }
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-30 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-purple-400 opacity-30 blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-float"></div>
        <div className="absolute bottom-1/3 left-2/3 w-48 h-48 rounded-full bg-yellow-300 opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full border-4 border-blue-200 opacity-20 animate-rotate"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/70 to-transparent"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJoNnptLTYgNmMwIDYuNjI3LTUuMzczIDEyLTEyIDEycy0xMi01LjM3My0xMi0xMiA1LjM3My0xMiAxMi0xMiAxMiA1LjM3MyAxMiAxMnoiIGZpbGw9IiNlZWUiLz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 pt-8">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Reinvent Your Professional Identity
            </h1>

            <p
              ref={subheadingRef}
              className="mt-6 text-xl text-gray-700 max-w-xl"
            >
              Create stunning digital business cards that stand out with interactive AR experiences, seamless sharing, and real-time updates.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/create"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105 duration-200"
              >
                Create Your Card
              </Link>

              <Link
                href="/features"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              >
                Explore Features
              </Link>
            </div>

            <div className="mt-12 flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">2,500+</span> professionals joined this week
              </p>
            </div>
          </div>

          <div ref={cardRef} className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <BusinessCard data={sampleCardData} className="z-10" />

              {/* Decorative elements around the card */}
              <div className="absolute top-1/2 left-1/2 w-72 h-72 -z-10 transform -translate-x-1/2 -translate-y-1/2">
                <Player
                  autoplay
                  loop
                  src="https://assets10.lottiefiles.com/packages/lf20_xvmprung.json"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-yellow-400 rounded-xl opacity-80 -z-10 transform rotate-12"></div>
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500 rounded-full opacity-80 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
