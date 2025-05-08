
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from './theme/theme-toggle';
import { useAuth } from '@/hooks/use-auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.fullName) return 'U';
    return user.fullName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="border-b sticky top-0 bg-white dark:bg-gray-900 z-10 transition-colors duration-300">
      <div className="container px-4 mx-auto py-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight transition-colors duration-300 dark:text-white">RAK Knowledge Hub</span>
          </Link>
          
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              className="ml-2" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        <div className={`md:flex items-center md:gap-6 ${mobileMenuOpen ? 'flex flex-col gap-4' : 'hidden'}`}>
          <Link to="/products/wisblock" className="text-gray-700 dark:text-gray-300 hover:text-rak-blue dark:hover:text-rak-blue font-medium transition-colors duration-200">
            WisBlock
          </Link>
          <Link to="/products/wisgate" className="text-gray-700 dark:text-gray-300 hover:text-rak-blue dark:hover:text-rak-blue font-medium transition-colors duration-200">
            WisGate
          </Link>
          <Link to="/products/wisnode" className="text-gray-700 dark:text-gray-300 hover:text-rak-blue dark:hover:text-rak-blue font-medium transition-colors duration-200">
            WisNode
          </Link>
          <Link to="/products/meshstastic" className="text-gray-700 dark:text-gray-300 hover:text-rak-blue dark:hover:text-rak-blue font-medium transition-colors duration-200">
            Meshtastic
          </Link>
          <Link to="/calendar" className="text-gray-700 dark:text-gray-300 hover:text-rak-blue dark:hover:text-rak-blue font-medium transition-colors duration-200">
            Calendar
          </Link>
          <Link to="/support" className="text-gray-700 dark:text-gray-300 hover:text-rak-blue dark:hover:text-rak-blue font-medium transition-colors duration-200">
            Support
          </Link>
          
          <div className="hidden md:flex items-center ml-4">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full ml-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  Dept: {user?.department ? user.department.charAt(0).toUpperCase() + user.department.slice(1) : 'Unknown'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Mobile logout button */}
        {mobileMenuOpen && (
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="w-full mt-4 text-destructive md:hidden"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
      
      <div className="container px-4 mx-auto py-4">
        <form onSubmit={handleSearch} className="search-bar-container">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, tutorials, or topics..."
              className="w-full py-3 pl-12 pr-5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-rak-blue focus:border-rak-blue transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1.5 bg-rak-blue hover:bg-rak-blue/80 text-white rounded-full px-5 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
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
