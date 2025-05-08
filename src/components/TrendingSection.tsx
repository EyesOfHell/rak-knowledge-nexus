
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const trendingItems = [
  {
    id: '1',
    title: 'Troubleshooting WisGate Connection Issues',
    type: 'Support Guide',
    views: '243 views',
    link: '#'
  },
  {
    id: '2',
    title: 'WisBlock Quick Start Guide',
    type: 'Tutorial',
    views: '198 views',
    link: '#'
  },
  {
    id: '3',
    title: 'LoRaWAN Network Server Configuration',
    type: 'Technical Doc',
    views: '176 views',
    link: '#'
  },
  {
    id: '4',
    title: 'Meshtastic Device Setup',
    type: 'Tutorial',
    views: '152 views',
    link: '#'
  }
];

const TrendingSection = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Hot & Trending</h2>
          <Link to="/trending" className="text-blue-600 hover:text-blue-800 font-medium">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {trendingItems.map(item => (
            <Card key={item.id} className="h-full hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center text-red-500 mb-2">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm">{item.views}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.type}</p>
                <Link 
                  to={item.link} 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  View resource
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
