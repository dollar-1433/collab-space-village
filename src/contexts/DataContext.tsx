import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post, Event, Group, Message } from '@/types';
import { useAuth } from './AuthContext';

interface DataContextType {
  posts: Post[];
  events: Event[];
  groups: Group[];
  messages: Message[];
  addPost: (post: Omit<Post, 'id' | 'createdAt'>) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  addGroup: (group: Omit<Group, 'id'>) => void;
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getUserPosts: (userId: string) => Post[];
  getUserEvents: (userId: string) => Event[];
  getUserGroups: (userId: string) => Group[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Load data from localStorage on mount
    const storedPosts = localStorage.getItem('educollab_posts');
    const storedEvents = localStorage.getItem('educollab_events');
    const storedGroups = localStorage.getItem('educollab_groups');
    const storedMessages = localStorage.getItem('educollab_messages');

    if (storedPosts) setPosts(JSON.parse(storedPosts));
    if (storedEvents) setEvents(JSON.parse(storedEvents));
    if (storedGroups) setGroups(JSON.parse(storedGroups));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, []);

  const addPost = (postData: Omit<Post, 'id' | 'createdAt'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('educollab_posts', JSON.stringify(updatedPosts));
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    localStorage.setItem('educollab_events', JSON.stringify(updatedEvents));
  };

  const addGroup = (groupData: Omit<Group, 'id'>) => {
    const newGroup: Group = {
      ...groupData,
      id: Date.now().toString(),
    };
    
    const updatedGroups = [newGroup, ...groups];
    setGroups(updatedGroups);
    localStorage.setItem('educollab_groups', JSON.stringify(updatedGroups));
  };

  const addMessage = (messageData: Omit<Message, 'id' | 'createdAt'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('educollab_messages', JSON.stringify(updatedMessages));
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, ...updates } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('educollab_posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('educollab_posts', JSON.stringify(updatedPosts));
  };

  const getUserPosts = (userId: string) => {
    return posts.filter(post => post.authorId === userId);
  };

  const getUserEvents = (userId: string) => {
    return events.filter(event => event.organizerId === userId);
  };

  const getUserGroups = (userId: string) => {
    return groups.filter(group => 
      group.createdBy === userId || group.members.includes(userId)
    );
  };

  return (
    <DataContext.Provider value={{
      posts,
      events,
      groups,
      messages,
      addPost,
      addEvent,
      addGroup,
      addMessage,
      updatePost,
      deletePost,
      getUserPosts,
      getUserEvents,
      getUserGroups
    }}>
      {children}
    </DataContext.Provider>
  );
};