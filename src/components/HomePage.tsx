'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ThreeDCard from '@/components/3DCard';
import Footer from '@/components/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header transparent={true} />
      <Hero />
      <Features />

      {/* 3D Card Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience Your Card in 3D
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interact with your business card in an immersive 3D environment. Drag, rotate, and zoom to explore all angles.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ThreeDCard color="#3b82f6" />
          </div>

          <div className="text-center mt-12">
            <a
              href="/create"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
            >
              Create Your Own 3D Card
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their networking experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                title: "Marketing Director",
                image: "https://randomuser.me/api/portraits/women/32.jpg",
                quote: "NameCard has completely transformed how I network at events. The AR feature is a real conversation starter!"
              },
              {
                name: "Michael Chen",
                title: "Software Engineer",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                quote: "As someone in tech, I appreciate both the design and functionality. The analytics feature helps me track my networking effectiveness."
              },
              {
                name: "Priya Patel",
                title: "Startup Founder",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                quote: "My entire team uses NameCard now. It's professional, eco-friendly, and the CRM integration saves us so much time."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Networking Experience?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have already made the switch to digital business cards.
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

      <Footer />
    </div>
  );
};

export default HomePage;
