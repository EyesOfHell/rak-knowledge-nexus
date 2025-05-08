
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  department: string;
  organizer: string;
}

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    description: '',
    date: new Date(),
    department: 'all',
    organizer: '',
  });
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Load events from localStorage on mount
  React.useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        // Convert string dates back to Date objects
        const eventsWithDates = parsedEvents.map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }));
        setEvents(eventsWithDates);
      } catch (error) {
        console.error('Failed to parse stored events:', error);
      }
    }
  }, []);

  // Save events to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: 'Missing information',
        description: 'Please provide at least a title and date for the event.',
        variant: 'destructive',
      });
      return;
    }

    const eventToAdd = {
      ...newEvent,
      id: crypto.randomUUID(),
      organizer: user?.email || 'Unknown',
    };

    setEvents([...events, eventToAdd]);
    setIsAddingEvent(false);
    
    // Reset form
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      department: 'all',
      organizer: '',
    });

    toast({
      title: 'Event added',
      description: `"${eventToAdd.title}" has been added to the calendar.`,
    });
  };

  const eventsOnSelectedDate = events.filter(
    (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'support', label: 'Customer Support' },
    { value: 'general', label: 'General' },
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/2 shadow-md">
          <CardHeader>
            <CardTitle>Company Calendar</CardTitle>
            <CardDescription>View and manage company events</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border shadow p-4"
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
              <DialogTrigger asChild>
                <Button 
                  className="transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Add New Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                  <DialogDescription>
                    Create a new event for the RAKwireless team calendar.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Team meeting, Training, etc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Details about the event"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="border rounded-md p-2">
                      <CalendarComponent
                        mode="single"
                        selected={newEvent.date}
                        onSelect={(newDate) => newDate && setNewEvent({ ...newEvent, date: newDate })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={newEvent.department}
                      onValueChange={(value) => setNewEvent({ ...newEvent, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    onClick={handleAddEvent}
                    className="transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Add Event
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="md:w-1/2 shadow-md">
          <CardHeader>
            <CardTitle>Events for {format(date, 'MMMM d, yyyy')}</CardTitle>
            <CardDescription>
              {eventsOnSelectedDate.length
                ? `${eventsOnSelectedDate.length} event(s) scheduled`
                : 'No events scheduled for this day'}
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[500px] overflow-y-auto">
            {eventsOnSelectedDate.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No events scheduled for this day.
              </div>
            ) : (
              <div className="space-y-4">
                {eventsOnSelectedDate.map((event) => (
                  <Card key={event.id} className="transition-all duration-300 hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          {event.department === 'all' ? 'All Departments' : event.department.charAt(0).toUpperCase() + event.department.slice(1)}
                        </span>
                      </div>
                      <CardDescription className="text-xs">
                        Added by: {event.organizer}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
