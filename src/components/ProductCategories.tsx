
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const ProductCategories = () => {
  const categories = [
    {
      id: 'wisblock',
      title: 'WisBlock',
      description: 'Modular IoT solutions with building blocks for sensor data acquisition',
      image: '/lovable-uploads/344e5994-5016-493f-9db4-d0c36f697fd8.png',
      color: 'bg-wisblock-primary'
    },
    {
      id: 'wisgate',
      title: 'WisGate',
      description: 'LoRaWAN gateways for indoor and outdoor connectivity',
      image: '/lovable-uploads/695ac682-2694-443f-ace0-d6f4cff4e8c0.png',
      color: 'bg-wisgate-primary'
    },
    {
      id: 'wisnode',
      title: 'WisNode',
      description: 'End devices with sensors and connectivity for IoT applications',
      image: '/lovable-uploads/f1396294-7746-4a38-b3cb-7e7d4cb78568.png',
      color: 'bg-wisnode-primary'
    },
    {
      id: 'meshtastic',
      title: 'Meshtastic',
      description: 'Off-grid communication platform using mesh networking',
      image: '/lovable-uploads/7d5e7d81-3ef6-4488-94da-40d08b37006f.png',
      color: 'bg-meshstastic-primary'
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="section-heading text-center mb-10">Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link to={`/products/${category.id}`} key={category.id}>
              <Card className="product-card h-full flex flex-col">
                <div className={`${category.color} p-4 flex justify-center`}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="h-32 object-contain"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
