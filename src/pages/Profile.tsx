import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard } from "@/components/PostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { BookOpen, Building, Calendar, Edit, Mail, MapPin, Save, X } from "lucide-react";
import { Navigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function Profile() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { getUserPosts } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    department: user?.department || '',
    yearOfStudy: user?.yearOfStudy || 1,
    subjects: user?.subjects?.join(', ') || ''
  });

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const userPosts = getUserPosts(user?.id || '');

  const handleSave = () => {
    const updates: any = {
      name: editData.name,
      bio: editData.bio,
      department: editData.department,
    };

    if (user?.role === 'student') {
      updates.yearOfStudy = editData.yearOfStudy;
    } else if (user?.role === 'teacher') {
      updates.subjects = editData.subjects.split(',').map(s => s.trim()).filter(s => s);
    }

    updateUser(updates);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      bio: user?.bio || '',
      department: user?.department || '',
      yearOfStudy: user?.yearOfStudy || 1,
      subjects: user?.subjects?.join(', ') || ''
    });
    setIsEditing(false);
  };

  const getRoleSpecificDetails = () => {
    switch (user?.role) {
      case "student":
        return (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Year {user.yearOfStudy}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{user.department}</span>
            </div>
          </>
        );
      case "teacher":
        return (
          <>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{user.department}</span>
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
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    {isEditing ? (
                      <Input
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="text-2xl font-bold mb-2"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold">{user?.name}</h1>
                    )}
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mt-1">
                      <Badge variant="outline" className="md:mb-0 mb-2 w-fit">
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </Badge>
                      {getRoleSpecificDetails()}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex gap-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={handleCancel} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Left Column: User Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({...editData, bio: e.target.value})}
                        placeholder="Tell us about yourself..."
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-muted-foreground text-sm">{user?.bio}</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={editData.department}
                            onChange={(e) => setEditData({...editData, department: e.target.value})}
                            placeholder="Department"
                          />
                        </div>
                        
                        {user?.role === 'student' && (
                          <div className="space-y-2">
                            <Label htmlFor="yearOfStudy">Year of Study</Label>
                            <Input
                              id="yearOfStudy"
                              type="number"
                              min="1"
                              max="6"
                              value={editData.yearOfStudy}
                              onChange={(e) => setEditData({...editData, yearOfStudy: parseInt(e.target.value)})}
                            />
                          </div>
                        )}
                        
                        {user?.role === 'teacher' && (
                          <div className="space-y-2">
                            <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                            <Input
                              id="subjects"
                              value={editData.subjects}
                              onChange={(e) => setEditData({...editData, subjects: e.target.value})}
                              placeholder="Computer Science, Mathematics"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{user?.department || 'Not specified'}</span>
                        </div>
                        {user?.role === 'teacher' && user?.subjects && (
                          <div className="flex items-center gap-2 text-sm">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span>{user.subjects.join(', ')}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Joined EduCollab</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div>
                        <div className="font-medium">{user?.followers?.length || 0}</div>
                        <div className="text-sm text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="font-medium">{user?.following?.length || 0}</div>
                        <div className="text-sm text-muted-foreground">Following</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column: User Content */}
              <div className="md:col-span-2">
                <Tabs defaultValue="posts">
                  <TabsList className="mb-4">
                    <TabsTrigger value="posts">Posts ({userPosts.length})</TabsTrigger>
                    <TabsTrigger value="projects">Projects ({userPosts.filter(p => p.type === 'project').length})</TabsTrigger>
                    <TabsTrigger value="notes">Notes ({userPosts.filter(p => p.type === 'note').length})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="posts" className="space-y-4">
                    {userPosts.length > 0 ? (
                      userPosts.map(post => (
                        <PostCard key={post.id} post={post} />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No posts yet.</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="projects" className="space-y-4">
                    {userPosts.filter(post => post.type === "project").length > 0 ? (
                      userPosts.filter(post => post.type === "project").map(post => (
                        <PostCard key={post.id} post={post} />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No projects yet.</p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="notes" className="space-y-4">
                    {userPosts.filter(post => post.type === "note").length > 0 ? (
                      userPosts.filter(post => post.type === "note").map(post => (
                        <PostCard key={post.id} post={post} />
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No notes yet.</p>
                    )}
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