
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app this would navigate to search results
      console.log("Search for:", searchQuery);
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b sticky top-0 bg-white z-10">
      <div className="container px-4 mx-auto py-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">RAK Knowledge Hub</span>
          </Link>
          
          <Button variant="ghost" className="md:hidden" size="icon">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products/wisblock" className="text-gray-700 hover:text-rak-blue font-medium">
            WisBlock
          </Link>
          <Link to="/products/wisgate" className="text-gray-700 hover:text-rak-blue font-medium">
            WisGate
          </Link>
          <Link to="/products/wisnode" className="text-gray-700 hover:text-rak-blue font-medium">
            WisNode
          </Link>
          <Link to="/products/meshstastic" className="text-gray-700 hover:text-rak-blue font-medium">
            Meshtastic
          </Link>
          <Link to="/support" className="text-gray-700 hover:text-rak-blue font-medium">
            Support
          </Link>
        </nav>
      </div>
      
      <div className="container px-4 mx-auto py-4">
        <form onSubmit={handleSearch} className="search-bar-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, tutorials, or topics..."
              className="w-full py-3 pl-12 pr-5 rounded-full shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rak-blue focus:border-rak-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bg-rak-blue hover:bg-rak-blue/80 text-white rounded-full px-5"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
