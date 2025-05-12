
import { useState, useEffect } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { CalendarPlus, Trash2, Edit } from "lucide-react";
import Header from "@/components/Header";

// Define the Event type
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  department: "engineering" | "marketing" | "support" | "general";
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState<"engineering" | "marketing" | "support" | "general">("general");

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("rak-calendar-events");
    if (savedEvents) {
      // Convert string dates back to Date objects
      const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        date: new Date(event.date),
      }));
      setEvents(parsedEvents);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("rak-calendar-events", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    setCurrentEvent(null);
    setTitle("");
    setDescription("");
    setDepartment("general");
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setCurrentEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDepartment(event.department);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = (event: Event) => {
    setCurrentEvent(event);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (currentEvent) {
      const updatedEvents = events.filter((e) => e.id !== currentEvent.id);
      setEvents(updatedEvents);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Event deleted",
        description: `"${currentEvent.title}" has been removed from the calendar.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for the event",
        variant: "destructive",
      });
      return;
    }

    if (currentEvent) {
      // Update existing event
      const updatedEvents = events.map((event) =>
        event.id === currentEvent.id
          ? {
              ...event,
              title,
              description,
              department,
              date: date,
            }
          : event
      );
      setEvents(updatedEvents);
      toast({
        title: "Event updated",
        description: `"${title}" has been updated.`,
      });
    } else {
      // Add new event
      const newEvent: Event = {
        id: crypto.randomUUID(),
        title,
        description,
        department,
        date: date,
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Event added",
        description: `"${title}" has been added to the calendar.`,
      });
    }

    setIsDialogOpen(false);
  };

  // Filter events by department if a filter is selected
  const filteredEvents = selectedDepartment
    ? events.filter((event) => event.department === selectedDepartment)
    : events;

  // Get events for the selected date
  const selectedDateEvents = filteredEvents.filter(
    (event) => date && new Date(event.date).toDateString() === date.toDateString()
  );

  // Check if the user is an admin (for demo purposes: engineering department users are admins)
  const isAdmin = user?.department === "engineering";

  // Dates that have events (for highlighting in the calendar)
  const eventDates = filteredEvents.map((event) => new Date(event.date));
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      
      <main className="container px-4 mx-auto py-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-2/3 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Company Calendar</h1>
              <div className="flex gap-2">
                <Select value={selectedDepartment || ""} onValueChange={(value) => setSelectedDepartment(value || null)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="support">Customer Support</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                
                {isAdmin && (
                  <Button onClick={handleAddEvent} className="transition-all duration-200 hover:scale-105">
                    <CalendarPlus className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                )}
              </div>
            </div>
            
            <Card className="border shadow-md">
              <CardContent className="p-6">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="bg-card text-card-foreground rounded-md shadow"
                  modifiers={{
                    hasEvent: (date) =>
                      eventDates.some(
                        (eventDate) => eventDate.toDateString() === date.toDateString()
                      ),
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-primary/20 font-bold",
                  }}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="w-full md:w-1/3 space-y-4 mt-6 md:mt-0">
            <h2 className="text-xl font-semibold border-b pb-2">
              {date ? `Events for ${date.toLocaleDateString()}` : "Select a date"}
            </h2>
            
            {selectedDateEvents.length === 0 ? (
              <p className="text-muted-foreground italic">No events scheduled for this day.</p>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden border transition-all duration-200 hover:shadow-md">
                    <CardContent className="p-4 relative">
                      <div className={`absolute top-0 left-0 w-1 h-full 
                        ${event.department === "engineering" ? "bg-blue-500" : 
                          event.department === "marketing" ? "bg-orange-500" : 
                          event.department === "support" ? "bg-purple-500" : "bg-green-500"}
                      `} />
                      
                      <div className="ml-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{event.title}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{event.department}</p>
                          </div>
                          
                          {isAdmin && (
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditEvent(event)}
                                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteEvent(event)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <p className="mt-2 text-sm">{event.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentEvent ? "Edit Event" : "Add New Event"}</DialogTitle>
            <DialogDescription>
              {currentEvent 
                ? "Update the details of this event." 
                : "Fill in the details for the new event."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Team meeting, Product launch, etc."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details about the event..."
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={(v: any) => setDepartment(v)}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="support">Customer Support</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Date</Label>
              <div className="border rounded-md p-2">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </div>
            </div>
            
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="transition-all duration-200 hover:scale-105"
              >
                {currentEvent ? "Update Event" : "Add Event"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentEvent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDeleteEvent}
              className="transition-all duration-200 hover:scale-105"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
