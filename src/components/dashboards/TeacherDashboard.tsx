import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/PostCard";
import { CreatePost } from "@/components/CreatePost";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { BookOpen, Users, Calendar, FileText, TrendingUp, Bell } from "lucide-react";

export function TeacherDashboard() {
  const { user } = useAuth();
  const { posts, getUserPosts, getUserEvents, addPost } = useData();
  const [filter, setFilter] = useState<'all' | 'my-posts'>('all');

  const userPosts = getUserPosts(user?.id || '');
  const userEvents = getUserEvents(user?.id || '');
  const recentPosts = posts.slice(0, 5);

  const displayPosts = filter === 'my-posts' ? userPosts : recentPosts;

  // Mock teacher data
  const courses = [
    { name: "Database Systems", students: 45, assignments: 8 },
    { name: "Web Development", students: 38, assignments: 12 },
    { name: "Software Engineering", students: 52, assignments: 6 }
  ];

  const recentSubmissions = [
    { student: "John Doe", assignment: "Database Design", course: "Database Systems", status: "pending" },
    { student: "Jane Smith", assignment: "React Portfolio", course: "Web Development", status: "graded" },
    { student: "Mike Johnson", assignment: "UML Diagrams", course: "Software Engineering", status: "pending" }
  ];

  const upcomingClasses = [
    { course: "Database Systems", time: "10:00 AM", room: "CS-101" },
    { course: "Web Development", time: "2:00 PM", room: "CS-205" },
    { course: "Software Engineering", time: "4:00 PM", room: "CS-301" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-edu-green to-edu-blue text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome, Professor {user?.name}!</h1>
        <p className="opacity-90">Manage your courses and connect with students</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-edu-green/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-edu-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
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
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{courses.reduce((sum, course) => sum + course.students, 0)}</p>
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
                <p className="text-sm text-muted-foreground">My Posts</p>
                <p className="text-2xl font-bold">{userPosts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="text-2xl font-bold">{userEvents.length}</p>
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
            authorRole: user?.role || 'teacher',
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
          {/* My Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {courses.map((course, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{course.name}</h4>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{course.students} students</span>
                    <span>{course.assignments} assignments</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Submissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{submission.student}</h4>
                      <p className="text-xs text-muted-foreground">{submission.assignment}</p>
                      <p className="text-xs text-muted-foreground">{submission.course}</p>
                    </div>
                    <Badge variant={submission.status === 'pending' ? 'destructive' : 'default'}>
                      {submission.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Classes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{class_.course}</h4>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{class_.time}</span>
                    <span>{class_.room}</span>
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