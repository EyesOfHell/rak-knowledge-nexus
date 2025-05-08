
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { EventCalendar } from '@/components/calendar/event-calendar';

const CalendarPage = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="bg-card border-b sticky top-0 z-10 py-4 px-6">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold mb-4">Company Calendar</h1>
            </div>
          </header>
          <main className="flex-grow p-6">
            <div className="container mx-auto">
              <EventCalendar />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default CalendarPage;
