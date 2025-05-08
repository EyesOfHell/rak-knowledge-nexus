
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WelcomeVideo = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Welcome to RAKwireless</h2>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4">
                <div className="text-center p-6">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Welcome Video Coming Soon</h3>
                  <p className="text-gray-500">This is a placeholder for the new employee welcome video</p>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Getting Started at RAKwireless</h3>
              <p className="text-gray-600">
                This welcome video provides an overview of RAKwireless, our mission, and how to navigate the resources available to you. 
                As a new employee, this will help you understand our products, company culture, and where to find the information you need.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WelcomeVideo;
