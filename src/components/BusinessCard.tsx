'use client';

import React, { useRef, useEffect, useState } from 'react';
import { createCardTiltEffect } from '@/lib/animations';
import { CardData } from './CardForm';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;

interface BusinessCardProps {
  data: CardData;
  className?: string;
  animated?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  data,
  className = '',
  animated = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Dynamically import GSAP
    import('gsap').then((module) => {
      gsap = module.gsap;

      if (animated && cardRef.current && gsap) {
        const cleanup = createCardTiltEffect(cardRef as React.MutableRefObject<HTMLElement | null>, 10);

        // Add entrance animation
        gsap.fromTo(
          cardRef.current,
          {
            y: 30,
            opacity: 0,
            rotateY: -15
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'power3.out'
          }
        );

        return cleanup;
      }
    });
  }, [animated]);

  // Generate QR code URL (in a real app, you would use a QR code library)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
    `BEGIN:VCARD
VERSION:3.0
FN:${data.name || 'Your Name'}
TITLE:${data.title || 'Job Title'}
ORG:${data.company || 'Company Name'}
TEL:${data.phone || ''}
EMAIL:${data.email || ''}
URL:${data.website || ''}
END:VCARD`
  )}`;

  // Determine text color based on background color brightness
  const getTextColor = () => {
    // Default to white if no color is provided
    if (!data.color) return 'text-white';

    // Simple brightness calculation (R*0.299 + G*0.587 + B*0.114)
    const hex = data.color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

    // Use white text for dark backgrounds, black text for light backgrounds
    return brightness < 160 ? 'text-white' : 'text-gray-900';
  };

  const textColorClass = getTextColor();
  const textOpacityClass = textColorClass === 'text-white' ? 'text-white/90' : 'text-gray-700';

  return (
    <div
      ref={cardRef}
      className={`relative w-full max-w-md aspect-[1.7/1] rounded-xl overflow-hidden shadow-xl ${className}`}
      style={{
        backgroundColor: data.color || '#3b82f6',
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)',
        boxShadow: `0 15px 35px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)`
      }}
    >
      {/* Card content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-2xl font-bold ${textColorClass} drop-shadow-md transform translate-z-10`} style={{ transform: 'translateZ(20px)' }}>
              {data.name || 'Your Name'}
            </h2>
            <p className={`${textOpacityClass} mt-1 transform translate-z-5`} style={{ transform: 'translateZ(15px)' }}>
              {data.title || 'Job Title'}
            </p>
            <p className={`${textOpacityClass} font-medium transform translate-z-5`} style={{ transform: 'translateZ(15px)' }}>
              {data.company || 'Company Name'}
            </p>
          </div>

          {/* Logo placeholder */}
          <div
            className={`w-16 h-16 rounded-full ${textColorClass === 'text-white' ? 'bg-white/20' : 'bg-gray-900/10'} backdrop-blur-sm flex items-center justify-center transform translate-z-20`}
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className={`text-2xl font-bold ${textColorClass}`}>
              {data.name ? data.name.charAt(0) : 'N'}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1 transform translate-z-10" style={{ transform: 'translateZ(20px)' }}>
            {data.email && (
              <p className={`${textOpacityClass} text-sm flex items-center`}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {data.email}
              </p>
            )}

            {data.phone && (
              <p className={`${textOpacityClass} text-sm flex items-center`}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {data.phone}
              </p>
            )}

            {data.website && (
              <p className={`${textOpacityClass} text-sm flex items-center`}>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                {data.website ? data.website.replace(/^https?:\/\//, '') : 'website.com'}
              </p>
            )}
          </div>

          {/* QR Code */}
          <div
            className="w-16 h-16 bg-white rounded-lg p-1 transform translate-z-15"
            style={{ transform: 'translateZ(25px)' }}
          >
            <img
              src={qrCodeUrl}
              alt="Contact QR Code"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2"
        style={{ transform: 'translateZ(5px) translateX(50%) translateY(-50%)' }}
      />

      <div
        className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2"
        style={{ transform: 'translateZ(5px) translateX(-50%) translateY(50%)' }}
      />
    </div>
  );
};

export default BusinessCard;
