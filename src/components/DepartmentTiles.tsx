
import React from 'react';
import { Link } from 'react-router-dom';
import { FileCode, Layout, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const departments = [
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Product datasheets, assembly guides, firmware, and technical documentation',
    icon: FileCode,
    color: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-200',
    hoverColor: 'hover:bg-blue-50',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Product messaging, campaign assets, launch planning, and brand guidelines',
    icon: Layout,
    color: 'bg-purple-100 text-purple-700',
    borderColor: 'border-purple-200',
    hoverColor: 'hover:bg-purple-50',
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: 'FAQs, troubleshooting guides, ticket response playbooks, and RMA procedures',
    icon: MessageSquare,
    color: 'bg-green-100 text-green-700',
    borderColor: 'border-green-200',
    hoverColor: 'hover:bg-green-50',
  },
  {
    id: 'general',
    name: 'General',
    description: 'Onboarding checklists, company calendar, general SOPs, and request forms',
    icon: Users,
    color: 'bg-amber-100 text-amber-700',
    borderColor: 'border-amber-200',
    hoverColor: 'hover:bg-amber-50',
  }
];

const DepartmentTiles = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Department Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <Link to={`/departments/${dept.id}`} key={dept.id}>
              <Card className={`h-full transition-all duration-200 border-2 ${dept.borderColor} ${dept.hoverColor} hover:shadow-lg`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`${dept.color} p-4 rounded-full mb-4`}>
                    <dept.icon size={24} />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{dept.name}</h3>
                  <p className="text-gray-600">{dept.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentTiles;
