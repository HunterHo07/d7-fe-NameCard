'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// We'll use dynamic imports for GSAP to avoid SSR issues
let gsap: any;

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted: boolean;
  buttonText: string;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for individuals just getting started with digital business cards.',
    features: [
      'Digital business card',
      'Basic customization options',
      'QR code sharing',
      'Up to 5 social links',
      'Email and phone integration',
      'Basic analytics'
    ],
    highlighted: false,
    buttonText: 'Get Started',
    color: 'border-gray-200 bg-white'
  },
  {
    name: 'Professional',
    price: '$9.99/mo',
    description: 'Ideal for professionals who want to make a lasting impression.',
    features: [
      'Everything in Basic',
      'Advanced customization options',
      'Unlimited social links',
      'AR business card features',
      'Advanced analytics',
      'Remove NameCard branding',
      'Multiple card profiles',
      'Priority support'
    ],
    highlighted: true,
    buttonText: 'Start Free Trial',
    color: 'border-blue-500 bg-blue-50'
  },
  {
    name: 'Business',
    price: '$24.99/mo',
    description: 'For teams and businesses that need to manage multiple cards.',
    features: [
      'Everything in Professional',
      'Team management dashboard',
      'Branded card templates',
      'CRM integration',
      'Advanced analytics dashboard',
      'API access',
      'Dedicated account manager',
      'Custom domain',
      'SSO integration'
    ],
    highlighted: false,
    buttonText: 'Contact Sales',
    color: 'border-gray-200 bg-white'
  }
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How does the free plan work?',
    answer: 'The free plan gives you access to basic digital business card features. You can create one card with limited customization options and share it via QR code. There are no time limits on the free plan, but it does include NameCard branding.'
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you will be charged the prorated amount for the remainder of your billing cycle. If you downgrade, the changes will take effect at the end of your current billing cycle.'
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes, we offer a 20% discount when you choose annual billing instead of monthly billing. This discount is automatically applied when you select the annual billing option during signup or when changing your subscription.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and Apple Pay. For Business plans, we also offer invoice payment options.'
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, we offer a 14-day free trial for our Professional plan. No credit card is required to start the trial. For Business plans, please contact our sales team for a personalized demo and trial options.'
  },
  {
    question: 'Can I get a refund if I am not satisfied?',
    answer: 'We offer a 30-day money-back guarantee for all new subscriptions. If you are not satisfied with our service within the first 30 days, contact our support team for a full refund.'
  }
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const pricingCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const faqItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === 'undefined') return;

    // Set initial opacity to 0 for elements we want to animate
    if (headerRef.current) headerRef.current.style.opacity = '0';
    if (pricingRef.current) pricingRef.current.style.opacity = '0';
    if (faqRef.current) faqRef.current.style.opacity = '0';

    pricingCardRefs.current.forEach(card => {
      if (card) card.style.opacity = '0';
    });

    faqItemRefs.current.forEach(item => {
      if (item) item.style.opacity = '0';
    });

    // Dynamically import GSAP
    import('gsap').then((module) => {
      gsap = module.gsap;

      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }
        );
      }

      // Pricing section animation
      if (pricingRef.current) {
        gsap.fromTo(
          pricingRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.3
          }
        );
      }

      // Pricing cards animation
      pricingCardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.5 + (index * 0.2),
              ease: 'power2.out'
            }
          );
        }
      });

      // FAQ section animation
      if (faqRef.current) {
        gsap.fromTo(
          faqRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.8
          }
        );
      }

      // FAQ items animation
      faqItemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 1 + (index * 0.1),
              ease: 'power2.out'
            }
          );
        }
      });
    });
  }, []);

  const getAdjustedPrice = (price: string): string => {
    if (price === 'Free') return 'Free';

    const numericPrice = parseFloat(price.replace('$', '').replace('/mo', ''));
    if (billingPeriod === 'annual') {
      const annualPrice = (numericPrice * 0.8).toFixed(2); // 20% discount
      return `$${annualPrice}/mo`;
    }

    return price;
  };

  return (
    <div ref={pageRef} className="min-h-screen">
      <Header transparent={false} />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div ref={headerRef} className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Choose the plan that's right for you and start creating impressive digital business cards today.
              </p>

              {/* Billing toggle */}
              <div className="flex items-center justify-center mb-8">
                <span className={`mr-3 ${billingPeriod === 'monthly' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
                >
                  <span className="sr-only">Toggle billing period</span>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`ml-3 flex items-center ${billingPeriod === 'annual' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  Annual
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Save 20%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div ref={pricingRef} className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <div
                  key={index}
                  ref={el => (pricingCardRefs.current[index] = el)}
                  className={`rounded-xl border-2 ${tier.color} p-8 shadow-lg ${
                    tier.highlighted ? 'transform md:-translate-y-4' : ''
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{getAdjustedPrice(tier.price)}</span>
                    {tier.price !== 'Free' && (
                      <span className="text-gray-500 ml-1">
                        {billingPeriod === 'annual' ? 'billed annually' : ''}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium ${
                      tier.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div ref={faqRef} className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about our pricing? Find answers to common questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    ref={el => (faqItemRefs.current[index] = el)}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Choose the plan that works for you and start creating your digital business card today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/create"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
              >
                Create Your Card
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
