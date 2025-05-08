
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const WhatsNew = () => {
  const newItems = [
    {
      id: 1,
      title: 'RAK3172 Low Power Module',
      description: 'New module with ultra-low power consumption for battery-powered IoT devices',
      date: 'May 1, 2025',
      tag: 'New Product',
      image: '/lovable-uploads/3f8666b4-ce1a-4657-9377-f2eabdd3cc94.png'
    },
    {
      id: 2,
      title: 'WisGate Edge 2 OS Upgrade',
      description: 'Latest firmware update with advanced security features and performance improvements',
      date: 'April 28, 2025',
      tag: 'Firmware',
      image: '/lovable-uploads/eb7e93b3-c056-4ec5-9f13-f085bf1cbfaa.png'
    },
    {
      id: 3,
      title: 'WisBlock IoT Sensor Kit',
      description: 'All-in-one starter kit for environmental monitoring and data collection',
      date: 'April 22, 2025',
      tag: 'New Kit',
      image: '/lovable-uploads/010756bd-b0cc-4981-afdd-a4e3df091493.png'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="section-heading">What's New</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newItems.map((item) => (
            <Card key={item.id} className="product-card">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-rak-blue text-white border-none">
                  {item.tag}
                </Badge>
              </div>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsNew;
