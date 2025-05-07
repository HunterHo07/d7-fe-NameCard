'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface CardFormProps {
  onSubmit: (data: CardData) => void;
  initialData?: CardData;
  className?: string;
}

export interface CardData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  color: string;
}

const defaultData: CardData = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  color: '#0088ff'
};

const CardForm: React.FC<CardFormProps> = ({
  onSubmit,
  initialData = defaultData,
  className = ''
}) => {
  const [formData, setFormData] = useState<CardData>(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = React.useRef<HTMLFormElement>(null);

  const steps = [
    { fields: ['name', 'title', 'company'], title: 'Personal Information' },
    { fields: ['email', 'phone', 'website'], title: 'Contact Details' },
    { fields: ['color'], title: 'Appearance' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      nextStep();
    } else {
      onSubmit(formData);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Animate out current step
      gsap.to('.form-step', {
        opacity: 0,
        x: -50,
        duration: 0.3,
        onComplete: () => {
          setCurrentStep(prev => prev + 1);
          // Animate in next step
          gsap.fromTo('.form-step',
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.3 }
          );
        }
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // Animate out current step
      gsap.to('.form-step', {
        opacity: 0,
        x: 50,
        duration: 0.3,
        onComplete: () => {
          setCurrentStep(prev => prev - 1);
          // Animate in previous step
          gsap.fromTo('.form-step',
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.3 }
          );
        }
      });
    }
  };

  useEffect(() => {
    // Animate form in on mount
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const renderFields = () => {
    const currentFields = steps[currentStep].fields;

    return (
      <div className="form-step space-y-4">
        <h2 className="text-xl font-bold mb-6">{steps[currentStep].title}</h2>

        {currentFields.includes('name') && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              required
            />
          </div>
        )}

        {currentFields.includes('title') && (
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Manager"
            />
          </div>
        )}

        {currentFields.includes('company') && (
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Acme Inc."
            />
          </div>
        )}

        {currentFields.includes('email') && (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com"
              required
            />
          </div>
        )}

        {currentFields.includes('phone') && (
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        )}

        {currentFields.includes('website') && (
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
          </div>
        )}

        {currentFields.includes('color') && (
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Card Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-12 h-12 border-0 p-0 cursor-pointer"
              />
              <span className="text-sm text-gray-500">
                Choose a color for your business card
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`bg-white p-6 rounded-lg shadow-lg ${className}`}
    >
      {renderFields()}

      <div className="mt-8 flex justify-between">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ml-auto"
        >
          {currentStep < steps.length - 1 ? 'Next' : 'Create Card'}
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </form>
  );
};

export default CardForm;
