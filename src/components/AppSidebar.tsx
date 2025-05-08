
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Book, Calendar, FileText, Home, HelpCircle, Users, Layout, FileCode, MessageSquare, Cog } from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string>(location.pathname);
  
  const isActive = (path: string) => activeMenu === path;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <div className="text-xl font-bold text-gray-900">
            RAK Knowledge Hub
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/')}
                onClick={() => setActiveMenu('/')}
                tooltip="Home"
              >
                <Link to="/">
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Departments</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/departments/engineering')}
                onClick={() => setActiveMenu('/departments/engineering')}
                tooltip="Engineering"
              >
                <Link to="/departments/engineering">
                  <FileCode />
                  <span>Engineering</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/departments/marketing')}
                onClick={() => setActiveMenu('/departments/marketing')}
                tooltip="Marketing"
              >
                <Link to="/departments/marketing">
                  <Layout />
                  <span>Marketing</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/departments/support')}
                onClick={() => setActiveMenu('/departments/support')}
                tooltip="Customer Support"
              >
                <Link to="/departments/support">
                  <MessageSquare />
                  <span>Customer Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/departments/general')}
                onClick={() => setActiveMenu('/departments/general')}
                tooltip="General"
              >
                <Link to="/departments/general">
                  <Users />
                  <span>General</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/products')}
                onClick={() => setActiveMenu('/products')}
                tooltip="Product Catalog"
              >
                <Link to="/products">
                  <Book />
                  <span>Product Catalog</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/confluence')}
                onClick={() => setActiveMenu('/confluence')}
                tooltip="Confluence"
              >
                <Link to="/confluence">
                  <FileText />
                  <span>Confluence</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                isActive={isActive('/calendar')}
                onClick={() => setActiveMenu('/calendar')}
                tooltip="Calendar"
              >
                <Link to="/calendar">
                  <Calendar />
                  <span>Calendar</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <Link to="/help" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <HelpCircle size={18} />
            <span>Help</span>
          </Link>
          <Link to="/settings" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <Cog size={18} />
            <span>Settings</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
