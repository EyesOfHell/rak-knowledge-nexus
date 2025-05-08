
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const LatestVideos = () => {
  const videos = [
    {
      id: 1,
      title: 'Getting Started with WisBlock',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      path: '/videos/getting-started-wisblock'
    },
    {
      id: 2,
      title: 'WisGate Edge Pro Setup Guide',
      duration: '10:22',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      path: '/videos/wisgate-edge-setup'
    },
    {
      id: 3,
      title: 'Building a Weather Station with RAK',
      duration: '15:30',
      thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      path: '/videos/weather-station-project'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="section-heading">Latest Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Link to={video.path} key={video.id}>
              <Card className="product-card overflow-hidden h-full">
                <div className="relative">
                  <img 
                    src={`${video.thumbnail}?w=600&h=400&fit=crop`} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-black/60 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="font-medium text-lg">{video.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideos;
