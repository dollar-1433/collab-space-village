
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, MessageCircle, Share2 } from "lucide-react";
import { Post } from "@/types";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Function to get badge color based on post type
  const getTypeBadgeColor = (type: Post['type']) => {
    switch(type) {
      case 'idea': return 'bg-edu-orange text-white';
      case 'project': return 'bg-edu-green text-white';
      case 'note': return 'bg-edu-blue text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback>{post.authorName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.authorName}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <span>{post.authorRole.charAt(0).toUpperCase() + post.authorRole.slice(1)}</span>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className={cn("text-xs px-2 py-1 rounded-full", getTypeBadgeColor(post.type))}>
            {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-muted-foreground">{post.content}</p>
        
        {post.attachments && post.attachments.length > 0 && (
          <div className="mt-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {post.attachments.length} attachment{post.attachments.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
