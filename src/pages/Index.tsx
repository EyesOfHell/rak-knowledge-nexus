
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCategories from '@/components/ProductCategories';
import WhatsNew from '@/components/WhatsNew';
import TrendingTopics from '@/components/TrendingTopics';
import HotProducts from '@/components/HotProducts';
import LatestVideos from '@/components/LatestVideos';
import SupportResources from '@/components/SupportResources';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductCategories />
        <WhatsNew />
        <TrendingTopics />
        <HotProducts />
        <LatestVideos />
        <SupportResources />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
