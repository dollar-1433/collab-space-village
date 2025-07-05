import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/PostCard";
import { CreatePost } from "@/components/CreatePost";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { BookOpen, Calendar, Users, TrendingUp, Clock, Target } from "lucide-react";

export function StudentDashboard() {
  const { user } = useAuth();
  const { posts, getUserPosts, getUserGroups, addPost } = useData();
  const [filter, setFilter] = useState<'all' | 'my-posts'>('all');

  const userPosts = getUserPosts(user?.id || '');
  const userGroups = getUserGroups(user?.id || '');
  const recentPosts = posts.slice(0, 5);

  const displayPosts = filter === 'my-posts' ? userPosts : recentPosts;

  // Mock student progress data
  const courseProgress = [
    { name: "Database Systems", progress: 75, grade: "A-" },
    { name: "Web Development", progress: 90, grade: "A" },
    { name: "Data Structures", progress: 60, grade: "B+" },
    { name: "Software Engineering", progress: 85, grade: "A-" }
  ];

  const upcomingAssignments = [
    { title: "Database Design Project", dueDate: "Apr 25", course: "Database Systems" },
    { title: "React Portfolio", dueDate: "Apr 28", course: "Web Development" },
    { title: "Algorithm Analysis", dueDate: "May 2", course: "Data Structures" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-edu-blue to-edu-green text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="opacity-90">Ready to continue your learning journey?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-edu-blue/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-edu-blue" />
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
              <div className="p-2 bg-edu-green/10 rounded-lg">
                <Users className="h-5 w-5 text-edu-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Groups</p>
                <p className="text-2xl font-bold">{userGroups.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-edu-orange/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-edu-orange" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GPA</p>
                <p className="text-2xl font-bold">3.7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="text-2xl font-bold">{user?.yearOfStudy || 'N/A'}</p>
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
            authorRole: user?.role || 'student',
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
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Course Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{course.name}</span>
                    <Badge variant="outline">{course.grade}</Badge>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{assignment.title}</h4>
                  <p className="text-xs text-muted-foreground">{assignment.course}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3 text-edu-orange" />
                    <span className="text-xs text-edu-orange font-medium">Due {assignment.dueDate}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Study Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userGroups.length > 0 ? (
                <div className="space-y-2">
                  {userGroups.slice(0, 3).map(group => (
                    <div key={group.id} className="p-2 border rounded">
                      <p className="font-medium text-sm">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members.length} members</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No study groups joined yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}