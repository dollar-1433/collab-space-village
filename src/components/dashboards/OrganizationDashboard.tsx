import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/PostCard";
import { CreatePost } from "@/components/CreatePost";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Building, Users, Calendar, TrendingUp, FileText, Target } from "lucide-react";

export function OrganizationDashboard() {
  const { user } = useAuth();
  const { posts, getUserPosts, getUserEvents, addPost } = useData();
  const [filter, setFilter] = useState<'all' | 'my-posts'>('all');

  const userPosts = getUserPosts(user?.id || '');
  const userEvents = getUserEvents(user?.id || '');
  const recentPosts = posts.slice(0, 5);

  const displayPosts = filter === 'my-posts' ? userPosts : recentPosts;

  // Mock organization data
  const programs = [
    { name: "Summer Internship Program", participants: 120, status: "active" },
    { name: "Tech Workshop Series", participants: 85, status: "upcoming" },
    { name: "Career Fair 2024", participants: 300, status: "completed" }
  ];

  const metrics = [
    { label: "Total Reach", value: "2.5K", change: "+12%" },
    { label: "Engagement Rate", value: "8.4%", change: "+3.2%" },
    { label: "Event Attendance", value: "89%", change: "+5%" }
  ];

  const upcomingEvents = [
    { title: "Tech Career Fair", date: "Apr 25", attendees: 150 },
    { title: "AI Workshop", date: "May 2", attendees: 45 },
    { title: "Networking Mixer", date: "May 8", attendees: 80 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-edu-blue text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="opacity-90">Manage your programs and connect with the community</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Programs</p>
                <p className="text-2xl font-bold">{programs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-edu-blue/10 rounded-lg">
                <Users className="h-5 w-5 text-edu-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Participants</p>
                <p className="text-2xl font-bold">{programs.reduce((sum, program) => sum + program.participants, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-edu-green/10 rounded-lg">
                <Calendar className="h-5 w-5 text-edu-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="text-2xl font-bold">{userEvents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-edu-orange/10 rounded-lg">
                <FileText className="h-5 w-5 text-edu-orange" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Posts</p>
                <p className="text-2xl font-bold">{userPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Creation */}
          <CreatePost onPostCreated={(post) => addPost({
            ...post,
            authorId: user?.id || '',
            authorName: user?.name || '',
            authorRole: user?.role || 'organization',
            authorAvatar: user?.avatar
          })} />

          {/* Posts Feed */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activity</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={filter === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    All Posts
                  </Button>
                  <Button 
                    variant={filter === 'my-posts' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setFilter('my-posts')}
                  >
                    My Posts
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {displayPosts.length > 0 ? (
                displayPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {filter === 'my-posts' ? 'You haven\'t created any posts yet.' : 'No posts available.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Programs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {programs.map((program, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{program.name}</h4>
                    <Badge variant={
                      program.status === 'active' ? 'default' : 
                      program.status === 'upcoming' ? 'secondary' : 'outline'
                    }>
                      {program.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{program.participants} participants</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.change}</p>
                  </div>
                  <p className="text-lg font-bold">{metric.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{event.date}</span>
                    <span>{event.attendees} registered</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}