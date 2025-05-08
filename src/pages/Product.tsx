
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Product = () => {
  const { familyId, productId } = useParams<{ familyId: string; productId: string }>();
  
  // This would come from an API or data store in a real app
  const productData = {
    id: productId,
    name: 'RAK4631 WisBlock Core',
    description: 'A powerful, versatile LoRa module based on Nordic nRF52840 SoC and Semtech SX1262, perfect for long-range, low-power IoT applications.',
    image: '/lovable-uploads/b38c8cbe-69ea-40f6-9049-7de8b1ea2809.png',
    specs: [
      { name: 'Processor', value: 'Nordic nRF52840' },
      { name: 'LoRa Chip', value: 'Semtech SX1262' },
      { name: 'Frequency', value: '868/915 MHz' },
      { name: 'Flash Memory', value: '1 MB' },
      { name: 'RAM', value: '256 KB' },
      { name: 'Interfaces', value: 'I2C, SPI, UART, GPIO' },
      { name: 'Dimensions', value: '10mm x 25mm' }
    ],
    datasheets: [
      { name: 'RAK4631 Datasheet', url: '/documentation/datasheets/rak4631' },
      { name: 'Hardware Design Files', url: '/documentation/hardware/rak4631' },
      { name: 'Certification Documents', url: '/documentation/certification/rak4631' }
    ],
    tutorials: [
      { title: 'Getting Started with RAK4631', difficulty: 'Beginner', duration: '15 min', url: '/tutorials/rak4631-getting-started' },
      { title: 'Building a LoRaWAN Sensor', difficulty: 'Intermediate', duration: '30 min', url: '/tutorials/lorawan-sensor-rak4631' },
      { title: 'Power Optimization Techniques', difficulty: 'Advanced', duration: '25 min', url: '/tutorials/rak4631-power-optimization' }
    ],
    faqs: [
      { question: 'What is the power consumption of the RAK4631?', answer: 'The RAK4631 has an sleep current of <10μA and active current of <50mA depending on the configuration and usage scenario.' },
      { question: 'Can the RAK4631 be used with other RAK modules?', answer: 'Yes, the RAK4631 is designed to be compatible with all WisBlock modules including sensors, IO expansion, and communication modules.' },
      { question: 'What programming environments are supported?', answer: 'The RAK4631 supports Arduino, PlatformIO, and Nordic nRF5 SDK programming environments.' }
    ]
  };
  
  // Maps familyId to its respective color class
  const familyColors = {
    wisblock: {
      bg: 'bg-wisblock-primary',
      text: 'text-wisblock-primary',
      border: 'border-wisblock-primary',
    },
    wisgate: {
      bg: 'bg-wisgate-primary',
      text: 'text-wisgate-primary',
      border: 'border-wisgate-primary',
    },
    wisnode: {
      bg: 'bg-wisnode-primary',
      text: 'text-wisnode-primary',
      border: 'border-wisnode-primary',
    },
    meshtastic: {
      bg: 'bg-meshstastic-primary',
      text: 'text-meshstastic-primary',
      border: 'border-meshstastic-primary',
    }
  };
  
  const familyColor = familyColors[familyId as keyof typeof familyColors] || {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="bg-gray-100 py-3">
        <div className="container px-4 mx-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to={`/products/${familyId}`} className="text-gray-700 hover:text-blue-600 text-sm">
                    {familyId && familyId.charAt(0).toUpperCase() + familyId.slice(1)}
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-gray-500 text-sm">{productData.name}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      
      <main className="flex-grow">
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="lg:w-2/5">
                <div className="bg-white p-8 rounded-lg shadow-sm border">
                  <img 
                    src={productData.image} 
                    alt={productData.name}
                    className="mx-auto max-h-80 object-contain"
                  />
                </div>
              </div>
              
              <div className="lg:w-3/5">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{productData.name}</h1>
                <p className="text-lg text-gray-700 mb-6">{productData.description}</p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
                  <h2 className="font-semibold text-xl mb-4">Key Specifications</h2>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {productData.specs.map((spec, index) => (
                      <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                        <dt className="font-medium text-gray-900">{spec.name}:</dt>
                        <dd className="text-gray-700">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button className={`${familyColor.bg} hover:bg-opacity-90 text-white`}>
                    Download Datasheet
                  </Button>
                  <Button variant="outline" className={`${familyColor.border} ${familyColor.text} hover:bg-opacity-10`}>
                    View Documentation
                  </Button>
                  <Button variant="outline" className={`${familyColor.border} ${familyColor.text} hover:bg-opacity-10`}>
                    Purchase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="pb-16">
          <div className="container px-4 mx-auto">
            <Tabs defaultValue="documentation">
              <TabsList className="mb-8 justify-center">
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="forum">Community Discussions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documentation">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6">Documentation & Resources</h2>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <ul className="divide-y">
                      {productData.datasheets.map((doc, index) => (
                        <li key={index} className="py-4 first:pt-0 last:pb-0">
                          <Link to={doc.url} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-md">
                            <span className="font-medium">{doc.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                
                  <h2 className="text-2xl font-semibold mt-12 mb-6">Assembly Instructions</h2>
                  <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">Step 1: Prepare the WisBlock Base</h3>
                        <p className="text-gray-700 mb-4">Ensure the WisBlock base board is clean and ready for assembly. Identify the core module slot for proper orientation.</p>
                        <div className="bg-gray-100 p-4 rounded-md">
                          <p className="text-sm text-gray-700">Note: The WisBlock Core RAK4631 is designed to be inserted into the Core slot on the WisBlock base board.</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Step 2: Orient the RAK4631 Module</h3>
                        <p className="text-gray-700 mb-4">Position the RAK4631 module with the connector pins aligned with the core slot on the base board. Note the orientation markers.</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-lg mb-3">Step 3: Insert and Secure</h3>
                        <p className="text-gray-700 mb-4">Gently press the RAK4631 into the slot until it clicks into place. Ensure it is fully seated.</p>
                        <p className="text-gray-700">Use the provided screws to secure the module to the standoffs on the base board.</p>
                      </div>
                      
                      <div className="flex justify-center mt-6">
                        <Link to="/guides/assembly-videos">
                          <Button variant="outline" className="text-gray-700">Watch Assembly Video</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tutorials">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6">Tutorials & Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productData.tutorials.map((tutorial, index) => (
                      <Link to={tutorial.url} key={index}>
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
                                <Button variant="link" className={`${familyColor.text} p-0 h-auto font-medium`}>
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
                    <Link to={`/tutorials?product=${productId}`}>
                      <Button className="bg-gray-900 hover:bg-gray-800">
                        View All Tutorials for {productData.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faqs">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {productData.faqs.map((faq, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                        <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-10">
                    <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
                    <p className="text-gray-700 mb-4">Our support team and community are ready to help you with any questions about {productData.name}.</p>
                    <div className="flex flex-wrap gap-4">
                      <Link to="/support/contact">
                        <Button className="bg-rak-blue hover:bg-rak-blue/90">
                          Contact Support
                        </Button>
                      </Link>
                      <Link to="/community/forum">
                        <Button variant="outline" className="border-rak-blue text-rak-blue hover:bg-rak-blue/10">
                          Visit Community Forum
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="forum">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6">Community Discussions</h2>
                  <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
                    <p className="text-gray-700 text-center mb-6">Connect with other users and explore community discussions about {productData.name}.</p>
                    <div className="flex justify-center">
                      <Link to="/community/forum">
                        <Button className="bg-rak-blue hover:bg-rak-blue/90">
                          Go to Community Forum
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-4">Recent Discussions</h2>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Battery life optimization on RAK4631</h3>
                        <span className="text-xs text-gray-500">3 days ago</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">I'm trying to optimize the battery life on my RAK4631 deployment. Has anyone achieved more than 6 months on a single battery charge?</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>12 replies</span>
                        <Link to="/community/forum/topic/123" className={`${familyColor.text} hover:underline`}>
                          Read more
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Connecting external antenna to RAK4631</h3>
                        <span className="text-xs text-gray-500">1 week ago</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">Has anyone had success connecting an external antenna to the RAK4631? What improvements in range did you observe?</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>8 replies</span>
                        <Link to="/community/forum/topic/456" className={`${familyColor.text} hover:underline`}>
                          Read more
                        </Link>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">Problems with deep sleep mode</h3>
                        <span className="text-xs text-gray-500">2 weeks ago</span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-2">My RAK4631 doesn't seem to enter deep sleep correctly. The current consumption is higher than expected. Any troubleshooting suggestions?</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>15 replies</span>
                        <Link to="/community/forum/topic/789" className={`${familyColor.text} hover:underline`}>
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
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

export default Product;
