
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Filter, Plus, Search } from "lucide-react";
import { Event } from "@/types";

// Mock events data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Computer Science Department Orientation",
    description: "Welcome session for new CS students. Learn about department resources, meet professors, and get to know your peers.",
    organizerId: "5",
    organizerName: "Computer Science Department",
    location: "Main Auditorium",
    date: "April 25, 2023",
    time: "10:00 AM - 12:00 PM",
    attendees: ["1", "2", "3", "4", "5", "6", "7", "8"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "AI Research Symposium",
    description: "Research presentations on the latest developments in artificial intelligence and machine learning by faculty and graduate students.",
    organizerId: "6",
    organizerName: "AI Research Group",
    location: "Science Building, Room 305",
    date: "May 3, 2023",
    time: "2:00 PM - 5:00 PM",
    attendees: ["2", "5", "8", "9"],
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Campus Hackathon",
    description: "24-hour coding competition. Form teams and build innovative projects. Prizes for the top three teams!",
    organizerId: "7",
    organizerName: "Student Coding Club",
    location: "Innovation Hub",
    date: "May 10-11, 2023",
    time: "Starts at 6:00 PM",
    attendees: ["1", "3", "4", "7", "10", "11", "12"],
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Events() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredEvents = searchQuery 
    ? events.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : events;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Campus Events</h1>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              My Calendar
            </Button>
            
            <Button className="bg-edu-blue hover:bg-edu-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center py-8 col-span-full">
              <p className="text-muted-foreground">No events found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
