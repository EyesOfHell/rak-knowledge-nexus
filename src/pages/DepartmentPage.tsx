
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';
import { FileCode, Layout, MessageSquare, Users, FileText, Github, Video, Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Department, DepartmentInfo } from '@/lib/types';

// Department data
const departments: Record<string, DepartmentInfo> = {
  engineering: {
    id: 'engineering',
    name: 'Engineering',
    description: 'Technical documentation, datasheets, assembly guides, and development resources',
    icon: '/lovable-uploads/e43e868c-8dd9-4574-a237-afcb55b36484.png',
    color: 'bg-blue-100 text-blue-700'
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    description: 'Product messaging, campaign assets, and branding resources',
    icon: '/lovable-uploads/31b98eaf-2450-4705-80e1-768f79202712.png',
    color: 'bg-purple-100 text-purple-700'
  },
  support: {
    id: 'support',
    name: 'Customer Support',
    description: 'Troubleshooting guides, FAQs, and customer service resources',
    icon: '/lovable-uploads/32777454-5104-45c1-9fc5-ce84b3a2bb33.png',
    color: 'bg-green-100 text-green-700'
  },
  general: {
    id: 'general',
    name: 'General Resources',
    description: 'Company-wide information, onboarding, and administrative resources',
    icon: '/lovable-uploads/d781af7e-db1a-44df-9b13-22c35ff65b05.png',
    color: 'bg-amber-100 text-amber-700'
  }
};

// Department-specific resource sections
const departmentSections: Record<Department, { title: string, icon: any, items: { title: string, description: string, link: string }[] }[]> = {
  engineering: [
    {
      title: 'Product Datasheets',
      icon: FileText,
      items: [
        { title: 'WisBlock Core RAK4631 Datasheet', description: 'Technical specifications and pinout for RAK4631', link: '#' },
        { title: 'WisGate Edge Pro Datasheet', description: 'Complete specifications for WisGate Edge Pro gateway', link: '#' },
        { title: 'RAK3172 Module Datasheet', description: 'Low-power LoRa module specifications', link: '#' },
      ]
    },
    {
      title: 'Assembly & Testing',
      icon: Book,
      items: [
        { title: 'WisBlock Assembly Guide', description: 'Step-by-step instructions for WisBlock module assembly', link: '#' },
        { title: 'Production Test Procedures', description: 'Quality assurance testing protocols', link: '#' },
        { title: 'Hardware Validation SOP', description: 'Standard procedures for hardware validation', link: '#' },
      ]
    },
    {
      title: 'GitHub & Firmware',
      icon: Github,
      items: [
        { title: 'WisGate Edge OS Source', description: 'Source code for WisGate Edge operating system', link: '#' },
        { title: 'WisBlock API', description: 'Developer API for WisBlock modules', link: '#' },
        { title: 'RAK Firmware Update Tool', description: 'Official firmware update utility', link: '#' },
      ]
    },
    {
      title: 'Instructional Videos',
      icon: Video,
      items: [
        { title: 'WisBlock Programming Tutorial', description: 'Learn how to program WisBlock modules', link: '#' },
        { title: 'Debugging Hardware Issues', description: 'Common hardware debugging techniques', link: '#' },
        { title: 'Gateway Configuration Guide', description: 'Setting up and configuring WisGate gateways', link: '#' },
      ]
    },
  ],
  marketing: [
    {
      title: 'Product Messaging',
      icon: FileText,
      items: [
        { title: 'WisBlock Product Brief', description: 'Official messaging and selling points for WisBlock', link: '#' },
        { title: 'WisGate Value Proposition', description: 'Key value propositions and target markets', link: '#' },
        { title: 'Competitor Analysis', description: 'Analysis of competing products and positioning', link: '#' },
      ]
    },
    {
      title: 'Campaign Assets',
      icon: Layout,
      items: [
        { title: 'Social Media Kit', description: 'Images and copy for social media campaigns', link: '#' },
        { title: 'Product Photography', description: 'High-resolution product images', link: '#' },
        { title: 'Banner Templates', description: 'Web and print banner templates', link: '#' },
      ]
    },
    {
      title: 'Launch Planning',
      icon: Book,
      items: [
        { title: 'Product Launch Checklist', description: 'Timeline and checklist for product launches', link: '#' },
        { title: 'Press Release Template', description: 'Template for product announcement press releases', link: '#' },
        { title: 'Channel Marketing Guide', description: 'Guidelines for marketing through partner channels', link: '#' },
      ]
    },
    {
      title: 'Videos',
      icon: Video,
      items: [
        { title: 'Product Demo Videos', description: 'Videos showcasing product features and benefits', link: '#' },
        { title: 'Unboxing Template', description: 'Guidelines for creating unboxing videos', link: '#' },
        { title: 'Customer Testimonials', description: 'Video testimonials from key customers', link: '#' },
      ]
    },
  ],
  support: [
    {
      title: 'FAQs & Troubleshooting',
      icon: FileText,
      items: [
        { title: 'Common Issues Guide', description: 'Solutions for frequently reported problems', link: '#' },
        { title: 'Connectivity Troubleshooting', description: 'Step-by-step guide for network issues', link: '#' },
        { title: 'Hardware Diagnostics', description: 'Procedures for diagnosing hardware problems', link: '#' },
      ]
    },
    {
      title: 'Playbooks & Workflows',
      icon: Book,
      items: [
        { title: 'Ticket Response Templates', description: 'Standard responses for common issues', link: '#' },
        { title: 'Escalation Process', description: 'When and how to escalate customer issues', link: '#' },
        { title: 'Customer Communication Guide', description: 'Best practices for customer communication', link: '#' },
      ]
    },
    {
      title: 'RMA & Returns',
      icon: Layout,
      items: [
        { title: 'RMA Process Documentation', description: 'Complete RMA handling procedures', link: '#' },
        { title: 'Return Evaluation Checklist', description: 'Checklist for evaluating returned products', link: '#' },
        { title: 'Warranty Information', description: 'Product warranty details and coverage', link: '#' },
      ]
    },
    {
      title: 'Known Issues',
      icon: MessageSquare,
      items: [
        { title: 'WisBlock Issue Tracking', description: 'Known issues and workarounds for WisBlock', link: '#' },
        { title: 'WisGate Firmware Issues', description: 'Known issues in WisGate firmware versions', link: '#' },
        { title: 'Customer Log Repository', description: 'Archive of relevant customer logs and reports', link: '#' },
      ]
    },
  ],
  general: [
    {
      title: 'Onboarding',
      icon: Users,
      items: [
        { title: 'New Employee Checklist', description: 'Step-by-step onboarding process', link: '#' },
        { title: 'Company Overview', description: 'Introduction to RAKwireless structure and departments', link: '#' },
        { title: 'Product Family Guide', description: 'Overview of all RAKwireless product families', link: '#' },
      ]
    },
    {
      title: 'Company Calendar',
      icon: Layout,
      items: [
        { title: 'Company Events', description: 'Upcoming company-wide events and meetings', link: '#' },
        { title: 'Product Release Schedule', description: 'Timeline of upcoming product releases', link: '#' },
        { title: 'Training Sessions', description: 'Schedule of upcoming training opportunities', link: '#' },
      ]
    },
    {
      title: 'General SOPs',
      icon: FileText,
      items: [
        { title: 'HR Policies & Procedures', description: 'Company policies and HR guidelines', link: '#' },
        { title: 'IT Support Guide', description: 'How to request IT support and common solutions', link: '#' },
        { title: 'Internal Tools Access', description: 'Guide to accessing and using internal tools', link: '#' },
      ]
    },
    {
      title: 'Resources',
      icon: Book,
      items: [
        { title: 'RAK Product Ecosystem Map', description: 'Visual map of all RAK products and how they connect', link: '#' },
        { title: 'Document Request Form', description: 'Form to request missing documentation', link: '#' },
        { title: 'Company Directory', description: 'Contact information for all departments', link: '#' },
      ]
    },
  ]
};

const DepartmentPage = () => {
  const { deptId } = useParams<{ deptId: Department }>();
  const department = departments[deptId || 'general'];
  
  if (!department) {
    return <div>Department not found</div>;
  }

  const sections = departmentSections[deptId as Department] || [];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b sticky top-0 z-10 py-4 px-6">
            <div className="container mx-auto">
              <div className="flex items-center mb-4">
                <Link to="/" className="text-blue-600 hover:text-blue-800 mr-2">
                  Home
                </Link>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-800">{department.name}</span>
              </div>
              <SearchBar />
            </div>
          </header>
          <main className="flex-grow py-6 px-6">
            <div className="container mx-auto">
              <div className="flex items-center mb-6">
                {department.icon && (
                  <img 
                    src={department.icon} 
                    alt={department.name} 
                    className="w-16 h-16 mr-4 object-contain"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{department.name}</h1>
                  <p className="text-gray-600">{department.description}</p>
                </div>
              </div>
              
              {sections.map((section, index) => (
                <div key={index} className="mb-10">
                  <div className="flex items-center mb-4">
                    <section.icon className="mr-2 text-blue-600" size={24} />
                    <h2 className="text-2xl font-semibold">{section.title}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((item, itemIndex) => (
                      <Card key={itemIndex} className="h-full hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          <Button asChild variant="outline">
                            <Link to={item.link}>View Resource</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DepartmentPage;
