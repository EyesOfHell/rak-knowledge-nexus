
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
}

interface Tutorial {
  id: number;
  title: string;
  difficulty: string;
  duration: string;
  path: string;
}

const ProductFamily = () => {
  const { familyId } = useParams<{ familyId: string }>();
  
  // This would come from an API or data store in a real app
  const families = {
    wisblock: {
      title: 'WisBlock',
      description: 'Modular IoT solution that accelerates the development of custom electronic systems with a building block approach',
      image: '/lovable-uploads/344e5994-5016-493f-9db4-d0c36f697fd8.png',
      color: 'bg-wisblock-primary',
      textColor: 'text-wisblock-primary'
    },
    wisgate: {
      title: 'WisGate',
      description: 'LoRaWAN gateways for indoor and outdoor IoT connectivity applications',
      image: '/lovable-uploads/695ac682-2694-443f-ace0-d6f4cff4e8c0.png',
      color: 'bg-wisgate-primary',
      textColor: 'text-wisgate-primary'
    },
    wisnode: {
      title: 'WisNode',
      description: 'End devices with built-in sensors and connectivity for various IoT applications',
      image: '/lovable-uploads/f1396294-7746-4a38-b3cb-7e7d4cb78568.png',
      color: 'bg-wisnode-primary',
      textColor: 'text-wisnode-primary'
    },
    meshtastic: {
      title: 'Meshtastic',
      description: 'Open-source, off-grid communication platform using long-range radio mesh networking',
      image: '/lovable-uploads/7d5e7d81-3ef6-4488-94da-40d08b37006f.png',
      color: 'bg-meshstastic-primary',
      textColor: 'text-meshstastic-primary'
    }
  };
  
  // Sample product data
  const products: Product[] = [
    {
      id: 'rak4631',
      name: 'RAK4631 WisBlock Core',
      description: 'LoRa/LoRaWAN module based on Nordic nRF52840 and SX1262',
      image: '/lovable-uploads/b38c8cbe-69ea-40f6-9049-7de8b1ea2809.png',
      path: `/products/${familyId}/rak4631`
    },
    {
      id: 'rak5010',
      name: 'RAK5010 WisBlock Base Board',
      description: 'Carrier board for WisBlock modules with multiple interfaces',
      image: '/lovable-uploads/010756bd-b0cc-4981-afdd-a4e3df091493.png',
      path: `/products/${familyId}/rak5010`
    },
    {
      id: 'rak1901',
      name: 'RAK1901 Temperature & Humidity Sensor',
      description: 'WisBlock temperature and humidity sensor module',
      image: '/lovable-uploads/3f8666b4-ce1a-4657-9377-f2eabdd3cc94.png',
      path: `/products/${familyId}/rak1901`
    },
    {
      id: 'rak1906',
      name: 'RAK1906 Environmental Sensor',
      description: 'Environment monitoring sensor for temperature, humidity, pressure and gas',
      image: '/lovable-uploads/3f8666b4-ce1a-4657-9377-f2eabdd3cc94.png',
      path: `/products/${familyId}/rak1906`
    }
  ];
  
  // Sample tutorial data
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: 'Getting Started with WisBlock',
      difficulty: 'Beginner',
      duration: '15 min',
      path: '/tutorials/wisblock-getting-started'
    },
    {
      id: 2,
      title: 'Building a Weather Station',
      difficulty: 'Intermediate',
      duration: '45 min',
      path: '/tutorials/wisblock-weather-station'
    },
    {
      id: 3,
      title: 'Low Power Optimization',
      difficulty: 'Advanced',
      duration: '30 min',
      path: '/tutorials/wisblock-power-optimization'
    }
  ];
  
  const family = families[familyId as keyof typeof families];
  
  if (!family) {
    return <div>Product family not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <section className={`${family.color} py-16`}>
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src={family.image} 
                  alt={family.title}
                  className="max-h-64 object-contain"
                />
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{family.title}</h1>
                <p className="text-xl text-white/90 mb-6">{family.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Button className="bg-white text-gray-900 px-6 py-5 rounded-lg text-lg hover:bg-white/90">
                    Getting Started
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-5 rounded-lg text-lg">
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product listing section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="products">
              <TabsList className="mb-8 justify-center">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products">
                <h2 className="section-heading mb-8">Available Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <Link to={product.path} key={product.id}>
                      <Card className="product-card h-full">
                        <div className="p-6 flex justify-center bg-white">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-40 object-contain"
                          />
                        </div>
                        <CardContent className="pt-6">
                          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600">{product.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="getting-started">
                <div className="max-w-3xl mx-auto">
                  <h2 className="section-heading mb-8">Getting Started with {family.title}</h2>
                  <div className="bg-white p-8 rounded-lg shadow-sm border">
                    <ol className="space-y-8">
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Choose Your Components</h3>
                          <p className="text-gray-700 mb-4">Select the appropriate core, sensor, and base modules for your application needs.</p>
                          <Link to="/products/selection-guide" className={`${family.textColor} font-medium hover:underline`}>
                            View Selection Guide
                          </Link>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Assemble Your Modules</h3>
                          <p className="text-gray-700 mb-4">Connect your modules to the base board according to the assembly instructions.</p>
                          <Link to="/guides/assembly" className={`${family.textColor} font-medium hover:underline`}>
                            Assembly Guide
                          </Link>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">3</div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Configure Your Device</h3>
                          <p className="text-gray-700 mb-4">Install the necessary software and configure your device for your application.</p>
                          <Link to="/guides/configuration" className={`${family.textColor} font-medium hover:underline`}>
                            Configuration Guide
                          </Link>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">4</div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Deploy</h3>
                          <p className="text-gray-700 mb-4">Deploy your device and begin collecting data.</p>
                          <Link to="/guides/deployment" className={`${family.textColor} font-medium hover:underline`}>
                            Deployment Best Practices
                          </Link>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tutorials">
                <h2 className="section-heading mb-8">Tutorials & Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {tutorials.map((tutorial) => (
                    <Link to={tutorial.path} key={tutorial.id}>
                      <Card className="hover:shadow-md transition-shadow h-full">
                        <CardContent className="p-6">
                          <div className="flex flex-col h-full">
                            <div>
                              <div className="flex justify-between items-center mb-3">
                                <span className={`px-2 py-1 rounded text-xs ${tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                  {tutorial.difficulty}
                                </span>
                                <span className="text-xs text-gray-500">{tutorial.duration}</span>
                              </div>
                              <h3 className="font-medium text-lg mb-2">{tutorial.title}</h3>
                            </div>
                            <div className="mt-auto pt-4">
                              <Button variant="link" className={`${family.textColor} p-0 h-auto font-medium`}>
                                View Tutorial
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <Link to="/tutorials">
                    <Button className="bg-gray-900 hover:bg-gray-800">
                      View All Tutorials
                    </Button>
                  </Link>
                </div>
              </TabsContent>
              
              <TabsContent value="support">
                <h2 className="section-heading mb-8">Support Resources</h2>
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-bold text-lg mb-4">Documentation</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/documentation/datasheets" className={`${family.textColor} hover:underline`}>
                                Datasheets
                              </Link>
                            </li>
                            <li>
                              <Link to="/documentation/user-manuals" className={`${family.textColor} hover:underline`}>
                                User Manuals
                              </Link>
                            </li>
                            <li>
                              <Link to="/documentation/technical-reference" className={`${family.textColor} hover:underline`}>
                                Technical Reference
                              </Link>
                            </li>
                            <li>
                              <Link to="/documentation/api-reference" className={`${family.textColor} hover:underline`}>
                                API Reference
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-4">Troubleshooting</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/support/faqs" className={`${family.textColor} hover:underline`}>
                                Frequently Asked Questions
                              </Link>
                            </li>
                            <li>
                              <Link to="/support/troubleshooting-guide" className={`${family.textColor} hover:underline`}>
                                Troubleshooting Guide
                              </Link>
                            </li>
                            <li>
                              <Link to="/community/forum" className={`${family.textColor} hover:underline`}>
                                Community Forum
                              </Link>
                            </li>
                            <li>
                              <Link to="/support/contact" className={`${family.textColor} hover:underline`}>
                                Contact Support
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductFamily;
