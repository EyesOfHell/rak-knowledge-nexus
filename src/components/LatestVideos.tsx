
import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const latestVideos = [
  {
    id: '1',
    title: 'WisBlock Core Setup and Programming',
    duration: '12:34',
    department: 'Engineering',
    thumbnail: '/lovable-uploads/fee77e6a-4719-4442-8c31-7c91322e6d10.png',
    link: '#'
  },
  {
    id: '2',
    title: 'Product Messaging Workshop Recording',
    duration: '45:18',
    department: 'Marketing',
    thumbnail: '/lovable-uploads/79e49bf5-d57c-4df9-b186-0451599fb733.png',
    link: '#'
  },
  {
    id: '3',
    title: 'Troubleshooting WisGate Network Issues',
    duration: '28:05',
    department: 'Support',
    thumbnail: '/lovable-uploads/9215f6f4-e6ab-422c-b622-3dd238cb47e0.png',
    link: '#'
  }
];

const LatestVideosSection = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Latest Internal Videos</h2>
          <Link to="/videos" className="text-blue-600 hover:text-blue-800 font-medium">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestVideos.map(video => (
            <Card key={video.id} className="h-full hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {video.department}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                  <Link 
                    to={video.link} 
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                  >
                    <Video size={16} />
                    <span>Watch video</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestVideosSection;
