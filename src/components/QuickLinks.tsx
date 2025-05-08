
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  {
    id: 'product-catalog',
    title: 'Product Catalog',
    icon: Book,
    description: 'Browse complete RAK product lineup',
    link: '/products',
    color: 'text-blue-600'
  },
  {
    id: 'confluence',
    title: 'Confluence Master List',
    icon: FileText,
    description: 'Access all company documentation',
    link: '/confluence',
    color: 'text-green-600'
  },
  {
    id: 'request-form',
    title: 'Request Form',
    icon: Layout,
    description: 'Submit document or resource requests',
    link: '/request',
    color: 'text-purple-600'
  }
];

const QuickLinks = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map(link => (
            <div key={link.id} className="bg-white rounded-lg shadow p-6 flex items-start">
              <div className={`${link.color} p-3 rounded-full mr-4`}>
                <link.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{link.title}</h3>
                <p className="text-gray-600 mb-3">{link.description}</p>
                <Button asChild variant="outline">
                  <Link to={link.link}>Access</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
