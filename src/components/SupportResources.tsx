
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Video, Search } from 'lucide-react';

const SupportResources = () => {
  const resources = [
    {
      id: 1,
      title: 'Documentation',
      description: 'Comprehensive documentation for all RAK products',
      icon: Book,
      path: '/documentation',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      id: 2,
      title: 'FAQs',
      description: 'Answers to commonly asked questions',
      icon: Search,
      path: '/faqs',
      color: 'bg-green-50 text-green-700'
    },
    {
      id: 3,
      title: 'Tutorial Videos',
      description: 'Visual guides for setup and troubleshooting',
      icon: Video,
      path: '/videos',
      color: 'bg-orange-50 text-orange-700'
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="section-heading">Support & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Link to={resource.path} key={resource.id}>
              <Card className="product-card h-full">
                <CardContent className="pt-6 pb-8">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${resource.color} p-4 rounded-full mb-4`}>
                      <resource.icon size={24} />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{resource.title}</h3>
                    <p className="text-gray-600">{resource.description}</p>
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

export default SupportResources;
