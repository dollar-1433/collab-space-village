
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="mb-4 overflow-hidden">
      {event.image && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <div className="text-sm text-muted-foreground">
              Organized by {event.organizerName}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-edu-blue" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-edu-blue" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-edu-blue" />
            <span>{event.location}</span>
          </div>
          
          {event.attendees && (
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-edu-blue" />
              <span>{event.attendees.length} attending</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button className="w-full bg-edu-blue hover:bg-edu-blue/90">
          RSVP
        </Button>
      </CardFooter>
    </Card>
  );
}
