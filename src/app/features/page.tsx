'use client';

import React, { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Player } from '@lottiefiles/react-lottie-player';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;
let ScrollTrigger: any;

interface FeatureDetail {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  color: string;
}

const featureDetails: FeatureDetail[] = [
  {
    title: 'Digital Business Cards',
    description: 'Create stunning digital cards with your personal branding, contact details, and social links.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>`,
    benefits: [
      'Customize with your brand colors and logo',
      'Add all your contact information in one place',
      'Include links to your social media profiles',
      'Update your information anytime, anywhere',
      'Environmentally friendly alternative to paper cards'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Augmented Reality',
    description: 'Stand out with immersive AR experiences that showcase your work and personality.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>`,
    benefits: [
      'Create interactive 3D models of your products',
      'Showcase your portfolio in an immersive way',
      'Add animations and interactive elements',
      'Make a memorable first impression',
      'Stand out from traditional business cards'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Easy Sharing',
    description: 'Share your card via QR code, NFC, email, or any messaging platform with a single tap.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>`,
    benefits: [
      'Generate QR codes for easy scanning',
      'Enable NFC tap-to-share functionality',
      'Share directly via email or messaging apps',
      'Create multiple sharing methods for different contexts',
      'Track when and how your card is shared'
    ],
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Real-time Updates',
    description: 'Update your information anytime and it instantly reflects across all shared cards.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>`,
    benefits: [
      'Change job titles or company information instantly',
      'Update contact details without reprinting cards',
      'Add new social profiles as they become relevant',
      'Ensure contacts always have your latest information',
      'Schedule updates for future changes'
    ],
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Analytics & Insights',
    description: 'Track when your card is viewed and which links are clicked for better networking.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>`,
    benefits: [
      'See who viewed your card and when',
      'Track which links get the most engagement',
      'Understand which sharing methods are most effective',
      'Measure the ROI of your networking efforts',
      'Optimize your card based on real data'
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'CRM Integration',
    description: 'Seamlessly integrate with your favorite CRM systems to manage connections.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>`,
    benefits: [
      'Connect with popular CRM platforms like Salesforce, HubSpot, etc.',
      'Automatically add new contacts to your CRM',
      'Sync contact information across platforms',
      'Add notes and follow-up reminders',
      'Categorize and tag contacts for better organization'
    ],
    color: 'from-teal-500 to-teal-600'
  }
];

export default function FeaturesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === 'undefined') return;

    // Set initial opacity to 0 for elements we want to animate
    if (headerRef.current) headerRef.current.style.opacity = '0';
    featureRefs.current.forEach(feature => {
      if (feature) feature.style.opacity = '0';
    });

    // Dynamically import GSAP and ScrollTrigger
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      gsap = gsapModule.gsap;
      ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Heading animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Feature cards animation
      featureRefs.current.forEach((feature, index) => {
        if (feature) {
          gsap.fromTo(
            feature,
            {
              opacity: 0,
              y: 50,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: feature,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Cleanup
      return () => {
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
      };
    });
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header transparent={false} />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div ref={headerRef} className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Features That Transform Your Networking
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Discover how NameCard's innovative features can elevate your professional presence and make networking more effective.
              </p>
              <a
                href="/create"
                className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
              >
                Create Your Card
              </a>
            </div>
          </div>
        </section>

        {/* Features Detail Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-16">
              {featureDetails.map((feature, index) => (
                <div
                  key={index}
                  ref={el => (featureRefs.current[index] = el)}
                  className="flex flex-col md:flex-row gap-8 items-center"
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className={`h-64 md:h-80 rounded-xl bg-gradient-to-r ${feature.color} p-8 flex items-center justify-center shadow-lg`}>
                      <div className="w-32 h-32 text-white">
                        <div dangerouslySetInnerHTML={{ __html: feature.icon }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Create your digital business card today and start leveraging all these powerful features.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/create"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Create Your Card
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
