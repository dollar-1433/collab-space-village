
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";
import { BookOpen, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className={cn(group.isStudyGroup ? "bg-edu-green" : "bg-edu-blue")}>
            <AvatarImage src={group.avatar} alt={group.name} />
            <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold flex items-center gap-2">
              {group.name}
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                group.isStudyGroup ? "bg-edu-green/10 text-edu-green" : "bg-edu-blue/10 text-edu-blue"
              )}>
                {group.isStudyGroup ? "Study Group" : "Group"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <Users className="h-3 w-3" />
              <span>{group.members.length} members</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground text-sm">{group.description}</p>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full">
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
}
