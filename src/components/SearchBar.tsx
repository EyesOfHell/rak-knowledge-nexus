
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app this would connect to a search API
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for documentation, products, SOPs..."
          className="w-full py-3 pl-12 pr-20 rounded-full shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          type="submit" 
          className="absolute right-1.5 top-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
