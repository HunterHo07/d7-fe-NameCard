'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CardForm, { CardData } from '@/components/CardForm';
import BusinessCard from '@/components/BusinessCard';
import ThreeDCard from '@/components/3DCard';
import { gsap } from 'gsap';

const defaultCardData: CardData = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  color: '#3b82f6'
};

export default function CreatePage() {
  const [cardData, setCardData] = useState<CardData>(defaultCardData);
  const [showPreview, setShowPreview] = useState(false);
  const [view3D, setView3D] = useState(false);
  
  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const handleFormSubmit = (data: CardData) => {
    setCardData(data);
    setShowPreview(true);
    
    // Scroll to preview section
    if (previewRef.current) {
      window.scrollTo({
        top: previewRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };
  
  const handleReset = () => {
    setShowPreview(false);
    setView3D(false);
    
    // Scroll back to form
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    // Page entrance animation
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current.children,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.2,
          ease: 'power2.out'
        }
      );
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div ref={pageRef} className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Digital Business Card
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill out the form below to create your personalized digital business card.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={formRef} className="w-full">
            <CardForm 
              onSubmit={handleFormSubmit} 
              initialData={cardData}
            />
          </div>
          
          <div ref={previewRef} className="w-full flex flex-col items-center">
            {showPreview ? (
              <>
                <div className="bg-white p-6 rounded-lg shadow-lg w-full mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Your Card Preview
                  </h2>
                  
                  <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                      <button
                        type="button"
                        onClick={() => setView3D(false)}
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                          !view3D 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        2D View
                      </button>
                      <button
                        type="button"
                        onClick={() => setView3D(true)}
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                          view3D 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        3D View
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    {view3D ? (
                      <ThreeDCard color={cardData.color} />
                    ) : (
                      <BusinessCard data={cardData} />
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-center space-x-4">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Edit Card
                    </button>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Download Card
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Share Card
                    </button>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Next Steps
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Your digital business card is ready! Here's what you can do next:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
                    <li>Download your card as a QR code to print or share</li>
                    <li>Share your card directly via email or messaging apps</li>
                    <li>Upgrade to a premium account for more features</li>
                    <li>Create multiple cards for different purposes</li>
                  </ul>
                  <div className="flex justify-center">
                    <button
                      className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-center items-center">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Your Card Preview
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form to see your card preview here.
                  </p>
                </div>
                <div className="w-full max-w-md aspect-[1.7/1] rounded-xl bg-gray-200 flex items-center justify-center">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
