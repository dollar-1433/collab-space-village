
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard } from "@/components/PostCard";
import { UserRole, Post } from "@/types";
import { BookOpen, Building, Calendar, Edit, Mail, MapPin, Pencil, User as UserIcon } from "lucide-react";

// Mock user data
const userData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@university.edu",
  role: "student" as UserRole,
  avatar: "/placeholder.svg",
  bio: "Computer Science student passionate about web development and AI. Looking for project collaborations.",
  department: "Computer Science",
  yearOfStudy: 3,
  location: "University Campus, Building A",
  joinedDate: "September 2021",
  followers: ["2", "3", "4"],
  following: ["2", "5", "6"],
};

// Mock posts
const userPosts: Post[] = [
  {
    id: "1",
    title: "My React Project Roadmap",
    content: "I'm working on a new React project for my web development course. Here's my plan for the next two weeks...",
    authorId: "1",
    authorName: "John Doe",
    authorRole: "student",
    authorAvatar: "/placeholder.svg",
    type: "project",
    createdAt: "2023-04-02T10:30:00Z",
    likes: 12,
    comments: []
  },
  {
    id: "2",
    title: "Notes from Database Management Systems",
    content: "Here are my notes from today's lecture on relational database design and normalization...",
    authorId: "1",
    authorName: "John Doe",
    authorRole: "student",
    authorAvatar: "/placeholder.svg",
    type: "note",
    createdAt: "2023-03-28T14:15:00Z",
    likes: 8,
    comments: [
      {
        id: "c1",
        content: "Thanks for sharing these notes!",
        authorId: "3",
        authorName: "Alex Smith",
        createdAt: "2023-03-28T16:20:00Z"
      }
    ]
  }
];

export default function Profile() {
  // Get role-specific details
  const getRoleSpecificDetails = () => {
    switch (userData.role) {
      case "student":
        return (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Year {userData.yearOfStudy}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{userData.department}</span>
            </div>
          </>
        );
      case "teacher":
        return (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{userData.department}</span>
            </div>
            <Badge>Professor</Badge>
          </>
        );
      case "organization":
        return (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>Organization</span>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Cover Photo */}
          <div className="h-40 bg-gradient-to-r from-edu-blue to-edu-green w-full"></div>
          
          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16 md:mb-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mt-1">
                      <Badge variant="outline" className="md:mb-0 mb-2 w-fit">
                        {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                      </Badge>
                      {getRoleSpecificDetails()}
                    </div>
                  </div>
                  
                  <Button className="mt-4 md:mt-0">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Left Column: User Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-muted-foreground text-sm">{userData.bio}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div>
                    <div className="font-medium">{userData.followers.length}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="font-medium">{userData.following.length}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: User Content */}
              <div className="md:col-span-2">
                <Tabs defaultValue="posts">
                  <TabsList className="mb-4">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="posts" className="space-y-4">
                    {userPosts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="projects" className="space-y-4">
                    {userPosts.filter(post => post.type === "project").map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="notes" className="space-y-4">
                    {userPosts.filter(post => post.type === "note").map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
