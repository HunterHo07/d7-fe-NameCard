import { MutableRefObject } from 'react';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;
let ScrollTrigger: any;

// Initialize GSAP only on the client side
if (typeof window !== 'undefined') {
  // Dynamic import
  import('gsap').then((module) => {
    gsap = module.gsap;

    // Import ScrollTrigger
    import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
      ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
    });
  });
}

/**
 * Animation utility functions for the NameCard application
 */

/**
 * Animate an element into view with a fade and slide up effect
 */
export const fadeInUp = (element: HTMLElement | null, delay: number = 0, duration: number = 0.6) => {
  if (!element || !gsap) return;

  gsap.fromTo(
    element,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out'
    }
  );
};

/**
 * Animate an element into view with a fade and slide down effect
 */
export const fadeInDown = (element: HTMLElement | null, delay: number = 0, duration: number = 0.6) => {
  if (!element || !gsap) return;

  gsap.fromTo(
    element,
    {
      y: -50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out'
    }
  );
};

/**
 * Create a staggered animation for multiple elements
 */
export const staggerElements = (elements: HTMLElement[] | NodeListOf<Element>, staggerAmount: number = 0.1, duration: number = 0.6) => {
  if (!elements || elements.length === 0 || !gsap) return;

  gsap.fromTo(
    elements,
    {
      y: 30,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger: staggerAmount,
      ease: 'power2.out'
    }
  );
};

/**
 * Create a scroll-triggered animation
 */
export const createScrollAnimation = (
  trigger: string | HTMLElement,
  element: string | HTMLElement,
  animation: { [key: string]: any },
  options: { [key: string]: any } = {}
) => {
  if (typeof window === 'undefined' || !gsap || !ScrollTrigger) return;

  return ScrollTrigger.create({
    trigger,
    start: options.start || 'top 80%',
    end: options.end || 'bottom 20%',
    animation: gsap.to(element, animation),
    toggleActions: options.toggleActions || 'play none none reverse',
    markers: options.markers || false,
    scrub: options.scrub || false,
  });
};

/**
 * Create a 3D card tilt effect
 */
export const createCardTiltEffect = (cardRef: MutableRefObject<HTMLElement | null>, intensity: number = 15) => {
  if (!cardRef.current || typeof window === 'undefined' || !gsap) return;

  const card = cardRef.current;

  const handleMouseMove = (e: MouseEvent) => {
    if (!gsap) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * -intensity;
    const rotateY = (x - centerX) / centerX * intensity;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    if (!gsap) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Create a floating animation
 */
export const createFloatingAnimation = (element: HTMLElement | null, options = {}) => {
  if (!element || !gsap) return;

  const defaults = {
    y: 15,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  };

  const config = { ...defaults, ...options };

  return gsap.to(element, config);
};

/**
 * Create a reveal text animation
 */
export const revealText = (element: HTMLElement | null, delay: number = 0) => {
  if (!element || !gsap || typeof document === 'undefined') return;

  // Split text into words
  const text = element.textContent || '';
  element.textContent = '';

  const words = text.split(' ');

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word + ' ';
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    element.appendChild(span);

    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: delay + (index * 0.1),
      ease: 'power2.out'
    });
  });
};
