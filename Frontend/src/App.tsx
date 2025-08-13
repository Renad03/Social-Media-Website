import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import NewsFeed from './components/NewsFeed';
import Profile from './components/Profile';
import Sidebar from './components/Sidebar';
import Messages from './components/Messages';
import { useAuth } from './hooks/useAuth';
import { Post, User, Notification } from './types';
import { mockPosts, mockUsers, mockNotifications, mockConversations } from './utils/mockData';

function App() {
  const { authState, login, signup, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Update document title based on auth state
  useEffect(() => {
    const title = document.querySelector('title');
    if (title) {
      title.textContent = authState.isAuthenticated ? 'SocialHub - Home' : 'SocialHub - Connect with Friends';
    }
  }, [authState.isAuthenticated]);

  const handleCreatePost = (content: string, image?: string) => {
    if (!authState.currentUser) return;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: authState.currentUser.id,
      user: authState.currentUser,
      content,
      image,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'now',
      liked: false
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleComment = (postId: string, content: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments + 1 }
          : post
      )
    );
  };

  const handleShare = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, shares: post.shares + 1 }
          : post
      )
    );
  };

  const handleFollow = (userId: string) => {
    console.log('Following user:', userId);
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    console.log('Sending message:', { conversationId, content });
    // In a real app, this would send the message to the backend
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  if (!authState.isAuthenticated) {
    return <Login onLogin={login} onSignup={signup} />;
  }

  const currentUser = authState.currentUser!;
  const suggestedUsers = mockUsers.filter(user => user.id !== currentUser.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentUser={currentUser}
        onLogout={logout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationAsRead}
        onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'messages' ? (
          <Messages
            conversations={mockConversations}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onBack={() => setActiveTab('home')}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'home' && (
                <NewsFeed
                  posts={posts}
                  currentUser={currentUser}
                  onCreatePost={handleCreatePost}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              )}
              
              {activeTab === 'profile' && (
                <Profile
                  user={currentUser}
                  currentUser={currentUser}
                  posts={posts}
                  isOwnProfile={true}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onFollow={handleFollow}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Sidebar
                  currentUser={currentUser}
                  suggestedUsers={suggestedUsers}
                  onFollow={handleFollow}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;