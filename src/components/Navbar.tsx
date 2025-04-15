
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Calendar, Home, MessageCircle, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock authentication - in a real app, this would come from auth context
const isAuthenticated = false;
const currentUser = {
  name: "John Doe",
  avatar: "/placeholder.svg",
  role: "student"
};

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-edu-blue text-white grid place-items-center font-bold">E</div>
          <span className="font-bold text-xl">EduCollab</span>
        </Link>
        
        {isAuthenticated && (
          <div className="flex items-center md:w-1/3 mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full bg-muted"
              />
            </div>
          </div>
        )}
        
        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" aria-label="Dashboard">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="ghost" size="icon" aria-label="Events">
                  <Calendar className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/groups">
                <Button variant="ghost" size="icon" aria-label="Groups">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth?type=login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/auth?type=signup">
                <Button className="bg-edu-blue hover:bg-edu-blue/90">Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
