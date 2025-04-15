
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FileUp, Image, Lightbulb, NotebookPen, Package } from "lucide-react";
import { Post } from "@/types";

// Mock user data - in a real app, this would come from auth context
const currentUser = {
  id: "1",
  name: "John Doe",
  avatar: "/placeholder.svg",
  role: "student" as const
};

interface CreatePostProps {
  onPostCreated?: (post: Post) => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<Post["type"]>("general");
  
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      type: postType,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    onPostCreated?.(newPost);
    
    // Reset form
    setTitle("");
    setContent("");
    setPostType("general");
  };
  
  const getPostTypeLabel = (type: Post["type"]) => {
    switch(type) {
      case "idea": return "Share an Idea";
      case "project": return "Share a Project";
      case "note": return "Share Notes";
      default: return "Create Post";
    }
  };
  
  const getPostTypeIcon = (type: Post["type"]) => {
    switch(type) {
      case "idea": return <Lightbulb className="h-4 w-4" />;
      case "project": return <Package className="h-4 w-4" />;
      case "note": return <NotebookPen className="h-4 w-4" />;
      default: return null;
    }
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{currentUser.name}</div>
        </div>
        
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
        />
        
        <Textarea
          placeholder="What would you like to share?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] mb-2"
        />
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <Image className="h-4 w-4 mr-2" />
            Photo
          </Button>
          <Button variant="outline" size="sm" className="text-muted-foreground">
            <FileUp className="h-4 w-4 mr-2" />
            Attachment
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-muted-foreground">
                {getPostTypeIcon(postType)}
                <span className="ml-2">{postType !== "general" ? postType.charAt(0).toUpperCase() + postType.slice(1) : "Type"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPostType("general")}>
                General
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPostType("idea")}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Idea
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPostType("project")}>
                <Package className="h-4 w-4 mr-2" />
                Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPostType("note")}>
                <NotebookPen className="h-4 w-4 mr-2" />
                Note
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!title.trim() || !content.trim()}
          className="bg-edu-blue hover:bg-edu-blue/90"
        >
          {getPostTypeLabel(postType)}
        </Button>
      </CardFooter>
    </Card>
  );
}
