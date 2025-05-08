
import { useState } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { Department } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  department: Department;
}

const eventSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(5, 'Description is required'),
  date: z.date(),
  department: z.enum(['engineering', 'marketing', 'support', 'general'] as const),
});

type EventFormValues = z.infer<typeof eventSchema>;

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Engineering Team Meeting',
      description: 'Weekly sync for engineering team',
      date: new Date(2025, 4, 10),
      department: 'engineering',
    },
    {
      id: '2',
      title: 'Marketing Campaign Launch',
      description: 'New product launch campaign kickoff',
      date: new Date(2025, 4, 15),
      department: 'marketing',
    },
    {
      id: '3',
      title: 'Customer Support Training',
      description: 'Training for new support procedures',
      date: new Date(2025, 4, 20),
      department: 'support',
    },
  ]);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(['engineering', 'marketing', 'support', 'general']);

  const { user } = useAuth();
  const isAdmin = user?.department === 'general'; // In a real app, this would be a proper role check

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      department: 'general',
    },
  });

  const onSubmit = (data: EventFormValues) => {
    const newEvent: Event = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
    };

    setEvents([...events, newEvent]);
    setIsDialogOpen(false);
    form.reset();
  };

  const toggleDepartmentFilter = (department: Department) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    );
  };

  const filteredEvents = events.filter(event => 
    selectedDepartments.includes(event.department)
  );

  const eventsForSelectedDate = selectedDate 
    ? filteredEvents.filter(
        event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      )
    : [];

  const eventDates = filteredEvents.map(event => format(event.date, 'yyyy-MM-dd'));

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Company Calendar</h1>
          <p className="text-muted-foreground mb-6">
            View and manage company events and important dates
          </p>
        </div>
        
        {isAdmin && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="animated-button">Add New Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company Event</DialogTitle>
                <DialogDescription>
                  Create a new event for the company calendar.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Team Meeting" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe the event" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="support">Customer Support</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit" className="animated-button">Save Event</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasEvent: (date) => 
                    eventDates.includes(format(date, 'yyyy-MM-dd')),
                }}
                modifiersStyles={{
                  hasEvent: { 
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)' 
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Department Filters</CardTitle>
              <CardDescription>
                Filter events by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                {(['engineering', 'marketing', 'support', 'general'] as Department[]).map((dept) => (
                  <div key={dept} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${dept}`} 
                      checked={selectedDepartments.includes(dept)}
                      onCheckedChange={() => toggleDepartmentFilter(dept)}
                      className={`${dept === 'engineering' ? 'border-rak-blue' : dept === 'marketing' ? 'border-rak-orange' : dept === 'support' ? 'border-rak-red' : 'border-rak-gray'}`}
                    />
                    <label 
                      htmlFor={`filter-${dept}`}
                      className="text-sm font-medium capitalize"
                    >
                      {dept}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}` : 'Select a date'}
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length === 0 ? 'No events scheduled' : `${eventsForSelectedDate.length} event(s) scheduled`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => (
                    <div 
                      key={event.id} 
                      className={`p-4 rounded-lg border ${
                        event.department === 'engineering' ? 'border-rak-blue' : 
                        event.department === 'marketing' ? 'border-rak-orange' : 
                        event.department === 'support' ? 'border-rak-red' : 
                        'border-rak-gray'
                      }`}
                    >
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs uppercase font-semibold bg-secondary px-2 py-0.5 rounded">
                          {event.department}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">No events for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
