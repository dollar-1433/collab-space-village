
export type UserRole = 'student' | 'teacher' | 'organization';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  department?: string;
  yearOfStudy?: number; // For students
  subjects?: string[]; // For teachers
  followers?: string[];
  following?: string[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  type: 'idea' | 'project' | 'note' | 'general';
  createdAt: string;
  likes: number;
  comments: Comment[];
  attachments?: Attachment[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string;
  organizerName: string;
  location: string;
  date: string;
  time: string;
  attendees?: string[];
  image?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  avatar?: string;
  isStudyGroup: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  groupId: string;
  createdAt: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'doc' | 'other';
  size: number;
}
