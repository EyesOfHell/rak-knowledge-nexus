
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import DepartmentTiles from '@/components/DepartmentTiles';
import WelcomeVideo from '@/components/WelcomeVideo';
import WhatsNewSection from '@/components/WhatsNewSection';
import TrendingSection from '@/components/TrendingSection';
import LatestVideosSection from '@/components/LatestVideos';
import QuickLinks from '@/components/QuickLinks';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-grow">
            <div className="py-6 px-6">
              <DepartmentTiles />
              <WelcomeVideo />
              <WhatsNewSection />
              <TrendingSection />
              <LatestVideosSection />
              <QuickLinks />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
