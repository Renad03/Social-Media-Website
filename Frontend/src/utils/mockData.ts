import { User, Post } from '../types';
import { Notification, Message, Conversation } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    fullName: 'John Doe',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Digital creator & photographer 📸 | Sharing life moments',
    followers: 1240,
    following: 432,
    posts: 87,
    verified: true,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    username: 'sarahwilson',
    email: 'sarah@example.com',
    fullName: 'Sarah Wilson',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Travel blogger ✈️ | Coffee enthusiast ☕ | Adventure seeker',
    followers: 2340,
    following: 234,
    posts: 156,
    verified: true,
    joinedDate: '2022-08-20'
  },
  {
    id: '3',
    username: 'mikechen',
    email: 'mike@example.com',
    fullName: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Tech entrepreneur | Building the future 🚀',
    followers: 5670,
    following: 123,
    posts: 234,
    verified: true,
    joinedDate: '2021-12-10'
  },
  {
    id: '4',
    username: 'emmadavis',
    email: 'emma@example.com',
    fullName: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Fitness coach 💪 | Nutrition expert | Living my best life',
    followers: 3450,
    following: 567,
    posts: 342,
    verified: false,
    joinedDate: '2023-03-22'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    user: mockUsers[0],
    content: 'Just captured this amazing sunset! Sometimes the best moments happen when you least expect them. Nature never fails to amaze me 🌅✨',
    image: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: '2 hours ago',
    liked: false
  },
  {
    id: '2',
    userId: '2',
    user: mockUsers[1],
    content: 'Exploring the beautiful streets of Paris today! The architecture here is absolutely stunning. Can\'t wait to share more photos from this incredible trip ✈️🗼',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 456,
    comments: 67,
    shares: 23,
    timestamp: '4 hours ago',
    liked: true
  },
  {
    id: '3',
    userId: '3',
    user: mockUsers[2],
    content: 'Excited to announce our latest product launch! We\'ve been working on this for months and can\'t wait for everyone to try it. Innovation never stops! 🚀💻',
    likes: 789,
    comments: 123,
    shares: 45,
    timestamp: '6 hours ago',
    liked: false
  },
  {
    id: '4',
    userId: '4',
    user: mockUsers[3],
    content: 'Morning workout complete! ✅ Remember, consistency is key. Small daily improvements lead to big results over time. What\'s your fitness goal for this week? 💪',
    image: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 321,
    comments: 89,
    shares: 34,
    timestamp: '8 hours ago',
    liked: true
  },
  {
    id: '5',
    userId: '1',
    user: mockUsers[0],
    content: 'Behind the scenes of today\'s photoshoot! The creative process is just as important as the final result. Always learning, always growing 📷🎨',
    likes: 167,
    comments: 23,
    shares: 8,
    timestamp: '12 hours ago',
    liked: false
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    userId: '2',
    user: mockUsers[1],
    postId: '1',
    message: 'liked your photo',
    timestamp: '5 minutes ago',
    read: false
  },
  {
    id: '2',
    type: 'comment',
    userId: '3',
    user: mockUsers[2],
    postId: '1',
    message: 'commented on your post',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: '3',
    type: 'follow',
    userId: '4',
    user: mockUsers[3],
    message: 'started following you',
    timestamp: '2 hours ago',
    read: true
  },
  {
    id: '4',
    type: 'mention',
    userId: '2',
    user: mockUsers[1],
    postId: '3',
    message: 'mentioned you in a post',
    timestamp: '1 day ago',
    read: true
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Hey! Love your latest photo. Where was it taken?',
    timestamp: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    content: 'Thanks! It was taken at Golden Gate Bridge during sunset.',
    timestamp: '2024-01-15T10:35:00Z',
    read: true
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    content: 'Amazing! I need to visit there soon.',
    timestamp: '2024-01-15T10:36:00Z',
    read: false
  },
  {
    id: '4',
    senderId: '3',
    receiverId: '1',
    content: 'Are you attending the tech conference next week?',
    timestamp: '2024-01-14T15:20:00Z',
    read: true
  },
  {
    id: '5',
    senderId: '1',
    receiverId: '3',
    content: 'Yes! Looking forward to it. Are you speaking there?',
    timestamp: '2024-01-14T15:25:00Z',
    read: true
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[2],
    unreadCount: 2
  },
  {
    id: '2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: mockMessages[4],
    unreadCount: 0
  },
  {
    id: '3',
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      id: '6',
      senderId: '4',
      receiverId: '1',
      content: 'Great workout tips! Thanks for sharing.',
      timestamp: '2024-01-13T09:15:00Z',
      read: true
    },
    unreadCount: 0
  }
];