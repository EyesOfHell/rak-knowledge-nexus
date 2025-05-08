
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const newItems = [
  {
    id: '1',
    title: 'WisGate Edge Pro 2 Firmware Update',
    description: 'Latest firmware v2.3.5 for WisGate Edge Pro 2 with improved stability and new features.',
    date: '2 days ago',
    link: '#'
  },
  {
    id: '2',
    title: 'New WisBlock Sensor Module',
    description: 'Introducing RAK12500, a new high-precision temperature and humidity sensor module.',
    date: '5 days ago',
    link: '#'
  },
  {
    id: '3',
    title: 'Updated Assembly Guide',
    description: 'The WisBlock Core assembly guide has been updated with clearer instructions and new diagrams.',
    date: '1 week ago',
    link: '#'
  },
  {
    id: '4',
    title: 'Meshtastic Integration Guide',
    description: 'New documentation for Meshtastic integration with RAK products.',
    date: '2 weeks ago',
    link: '#'
  }
];

const WhatsNewSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">What's New</h2>
          <Link to="/whats-new" className="text-blue-600 hover:text-blue-800 font-medium">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {newItems.map(item => (
            <Card key={item.id} className="h-full hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center text-gray-500 mb-2">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{item.date}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link 
                  to={item.link} 
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
