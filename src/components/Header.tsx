
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app this would navigate to search results
      console.log("Search for:", searchQuery);
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10 transition-colors duration-300">
      <div className="container px-4 mx-auto py-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight">RAK Knowledge Hub</span>
          </Link>
          
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Toggle menu</span>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 pt-10">
                  <Link to="/products/wisblock" className="text-foreground hover:text-primary font-medium py-2">
                    WisBlock
                  </Link>
                  <Link to="/products/wisgate" className="text-foreground hover:text-primary font-medium py-2">
                    WisGate
                  </Link>
                  <Link to="/products/wisnode" className="text-foreground hover:text-primary font-medium py-2">
                    WisNode
                  </Link>
                  <Link to="/products/meshstastic" className="text-foreground hover:text-primary font-medium py-2">
                    Meshtastic
                  </Link>
                  <Link to="/calendar" className="text-foreground hover:text-primary font-medium py-2">
                    Calendar
                  </Link>
                  <Link to="/support" className="text-foreground hover:text-primary font-medium py-2">
                    Support
                  </Link>
                  {user && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products/wisblock" className="text-foreground hover:text-primary font-medium">
            WisBlock
          </Link>
          <Link to="/products/wisgate" className="text-foreground hover:text-primary font-medium">
            WisGate
          </Link>
          <Link to="/products/wisnode" className="text-foreground hover:text-primary font-medium">
            WisNode
          </Link>
          <Link to="/products/meshstastic" className="text-foreground hover:text-primary font-medium">
            Meshtastic
          </Link>
          <Link to="/calendar" className="text-foreground hover:text-primary font-medium">
            <Calendar className="h-4 w-4 inline-block mr-1" />
            Calendar
          </Link>
          <Link to="/support" className="text-foreground hover:text-primary font-medium">
            Support
          </Link>
          <ThemeToggle />
          {user && (
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="transition-all duration-200 hover:scale-105"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </nav>
      </div>
      
      <div className="container px-4 mx-auto py-4">
        <form onSubmit={handleSearch} className="search-bar-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, tutorials, or topics..."
              className="w-full py-3 pl-12 pr-5 rounded-full shadow-sm border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bg-primary hover:bg-primary/80 text-white rounded-full px-5 transition-all duration-200 hover:scale-105"
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
