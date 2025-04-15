
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, User } from "@/types";
import { FileUp, Image, Send } from "lucide-react";

interface GroupChatProps {
  groupId: string;
  groupName: string;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

export function GroupChat({ groupId, groupName, messages, currentUser, onSendMessage }: GroupChatProps) {
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b py-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{groupName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{groupName}</div>
            <div className="text-xs text-muted-foreground">
              {messages.length} messages
            </div>
          </div>
        </div>
      </CardHeader>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex max-w-[80%]">
                {message.senderId !== currentUser.id && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src={message.senderAvatar} />
                    <AvatarFallback>{message.senderName.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`rounded-lg px-3 py-2 ${
                  message.senderId === currentUser.id 
                    ? 'bg-edu-blue text-white' 
                    : 'bg-gray-100'
                }`}>
                  {message.senderId !== currentUser.id && (
                    <div className="font-medium text-xs mb-1">
                      {message.senderName}
                    </div>
                  )}
                  <div>{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.senderId === currentUser.id 
                      ? 'text-white/70' 
                      : 'text-gray-500'
                  }`}>
                    {formatTime(message.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <CardContent className="border-t p-3">
        <div className="flex gap-2">
          <Textarea 
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Image className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <FileUp className="h-4 w-4" />
            </Button>
            <Button size="icon" className="rounded-full bg-edu-blue hover:bg-edu-blue/90" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
