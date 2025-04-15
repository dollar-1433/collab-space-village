
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GroupCard } from "@/components/GroupCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Search, Users } from "lucide-react";
import { Group } from "@/types";

// Mock groups data
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Database Systems Study Group",
    description: "A group for students taking Database Systems this semester. We meet weekly to discuss assignments and prepare for exams.",
    members: ["1", "3", "5", "7", "9"],
    createdBy: "3",
    isStudyGroup: true
  },
  {
    id: "2",
    name: "Web Development Club",
    description: "Learn and collaborate on web projects. All skill levels welcome!",
    members: ["1", "2", "4", "6", "8", "10", "12"],
    createdBy: "4",
    isStudyGroup: false
  },
  {
    id: "3",
    name: "AI Research Group",
    description: "Discussion and collaboration on artificial intelligence topics and research papers.",
    members: ["2", "5", "7", "11"],
    createdBy: "5",
    isStudyGroup: false
  },
  {
    id: "4",
    name: "Mobile App Development",
    description: "Study group focusing on mobile app development using React Native and Flutter.",
    members: ["1", "4", "8", "9"],
    createdBy: "1",
    isStudyGroup: true
  }
];

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredGroups = searchQuery 
    ? groups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : groups;
  
  const studyGroups = filteredGroups.filter(group => group.isStudyGroup);
  const regularGroups = filteredGroups.filter(group => !group.isStudyGroup);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Groups</h1>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                className="pl-8 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button>
              <Users className="mr-2 h-4 w-4" />
              My Groups
            </Button>
            
            <Button className="bg-edu-blue hover:bg-edu-blue/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Groups</TabsTrigger>
            <TabsTrigger value="study">Study Groups</TabsTrigger>
            <TabsTrigger value="regular">Communities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No groups found matching your search</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="study">
            {studyGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyGroups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No study groups found matching your search</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="regular">
            {regularGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularGroups.map(group => (
                  <GroupCard key={group.id} group={group} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No communities found matching your search</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
