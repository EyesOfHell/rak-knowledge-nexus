
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const TrendingTopics = () => {
  const topics = [
    {
      id: 1,
      title: 'Setting up LoRaWAN Gateway',
      views: '2.4k',
      difficulty: 'Beginner',
      category: 'Tutorial',
      path: '/tutorials/lorawan-gateway-setup'
    },
    {
      id: 2,
      title: 'Connecting Sensors to WisBlock',
      views: '1.8k',
      difficulty: 'Intermediate',
      category: 'Tutorial',
      path: '/tutorials/wisblock-sensors'
    },
    {
      id: 3,
      title: 'Battery Optimization for WisNode',
      views: '1.5k',
      difficulty: 'Advanced',
      category: 'Guide',
      path: '/guides/wisnode-battery-optimization'
    },
    {
      id: 4,
      title: 'Meshtastic Network Configuration',
      views: '1.3k',
      difficulty: 'Intermediate',
      category: 'Tutorial',
      path: '/tutorials/meshtastic-network'
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <h2 className="section-heading">Trending Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic) => (
            <Link to={topic.path} key={topic.id}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className={`px-2 py-1 rounded text-xs ${topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {topic.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">{topic.views} views</span>
                      </div>
                      <h3 className="font-medium mb-2">{topic.title}</h3>
                    </div>
                    <div className="mt-auto pt-4">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {topic.category}
                      </span>
                    </div>
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

export default TrendingTopics;
