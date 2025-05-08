
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HotProducts = () => {
  const products = [
    {
      id: 1,
      name: 'WisBlock Core RAK4631',
      description: 'Low-power WisBlock Core module with LoRa and BLE',
      image: '/lovable-uploads/b38c8cbe-69ea-40f6-9049-7de8b1ea2809.png',
      category: 'WisBlock',
      rating: 4.9,
      path: '/products/wisblock/rak4631'
    },
    {
      id: 2,
      name: 'WisGate Edge Pro',
      description: 'Enterprise-grade indoor LoRaWAN gateway',
      image: '/lovable-uploads/eb7e93b3-c056-4ec5-9f13-f085bf1cbfaa.png',
      category: 'WisGate',
      rating: 4.8,
      path: '/products/wisgate/edge-pro'
    },
    {
      id: 3,
      name: 'WisNode Track Pro',
      description: 'Asset tracking device with GPS and LoRaWAN',
      image: '/lovable-uploads/805bbf68-222c-47f0-8ddb-3774e114947a.png',
      category: 'WisNode',
      badge: 'Best Seller',
      rating: 4.7,
      path: '/products/wisnode/track-pro'
    },
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="section-heading">Hot Selling Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link to={product.path} key={product.id}>
              <Card className="product-card h-full">
                <div className="relative p-6 flex justify-center bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-48 object-contain"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 bg-rak-red text-white border-none">
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-6">
                  <div className="text-sm font-medium text-rak-blue mb-2">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">{product.rating}/5</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotProducts;
