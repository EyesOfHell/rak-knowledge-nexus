
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to the RAKwireless Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your centralized resource for exploring, learning, and mastering RAKwireless products and technologies
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-rak-blue hover:bg-rak-blue/80 text-white px-6 py-5 rounded-lg text-lg">
              Browse Products
            </Button>
            <Button variant="outline" className="border-rak-blue text-rak-blue hover:bg-rak-blue/10 px-6 py-5 rounded-lg text-lg">
              Getting Started Guides
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
