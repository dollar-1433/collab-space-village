
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PostCard } from "@/components/PostCard";
import { CreatePost } from "@/components/CreatePost";
import { Button } from "@/components/ui/button";
import { Post, UserRole } from "@/types";
import { BookOpen, CalendarDays, Lightbulb, Package, Users } from "lucide-react";

// Mock data
const mockPosts: Post[] = [
  {
    id: "1",
    title: "Advanced Data Structures: Understanding Graphs",
    content: "I've just completed a comprehensive study on graph algorithms. Here are my notes on DFS, BFS, and Dijkstra's algorithm. Let me know if you have any questions!",
    authorId: "2",
    authorName: "Prof. Sarah Johnson",
    authorRole: "teacher",
    authorAvatar: "",
    type: "note",
    createdAt: "2023-04-10T14:30:00Z",
    likes: 24,
    comments: [
      {
        id: "c1",
        content: "This is incredibly helpful, thank you!",
        authorId: "3",
        authorName: "Alex Smith",
        createdAt: "2023-04-10T15:45:00Z"
      }
    ]
  },
  {
    id: "2",
    title: "Looking for teammates - Mobile App Development Project",
    content: "I'm working on a mobile app for campus navigation and looking for 2-3 teammates with React Native experience. The project aims to help new students find their way around campus easily.",
    authorId: "3",
    authorName: "Alex Smith",
    authorRole: "student",
    authorAvatar: "",
    type: "project",
    createdAt: "2023-04-09T10:15:00Z",
    likes: 15,
    comments: []
  },
  {
    id: "3",
    title: "Idea for Improving Student Collaboration",
    content: "What if we created a virtual study room system where students could book online spaces for group projects? We could integrate video conferencing and collaborative documents.",
    authorId: "4",
    authorName: "Jamie Liu",
    authorRole: "student",
    authorAvatar: "",
    type: "idea",
    createdAt: "2023-04-08T09:20:00Z",
    likes: 32,
    comments: [
      {
        id: "c2",
        content: "This sounds amazing! I'd use this for my study group.",
        authorId: "3",
        authorName: "Alex Smith",
        createdAt: "2023-04-08T11:30:00Z"
      },
      {
        id: "c3",
        content: "The IT department has been considering something similar. Let's discuss this further.",
        authorId: "5",
        authorName: "Dr. Robert Chen",
        createdAt: "2023-04-08T14:15:00Z"
      }
    ]
  }
];

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [filter, setFilter] = useState<Post['type'] | 'all'>('all');
  
  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };
  
  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.type === filter);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="font-medium mb-3">Discover</h3>
              <div className="space-y-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setFilter('all')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  All Posts
                </Button>
                <Button 
                  variant={filter === 'note' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setFilter('note')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Notes
                </Button>
                <Button 
                  variant={filter === 'project' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setFilter('project')}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Projects
                </Button>
                <Button 
                  variant={filter === 'idea' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setFilter('idea')}
                >
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Ideas
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium mb-3">Quick Access</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  My Groups
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Upcoming Events
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <CreatePost onPostCreated={handlePostCreated} />
            
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No posts to display</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
