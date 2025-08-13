export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  joinedDate: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  userId: string;
  user: User;
  postId?: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}