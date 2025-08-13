import React, { useState } from 'react';
import { Calendar, MapPin, Link as LinkIcon, Edit, Settings, MoreHorizontal } from 'lucide-react';
import { User, Post as PostType } from '../types';
import Post from './Post';

interface ProfileProps {
  user: User;
  currentUser: User;
  posts: PostType[];
  isOwnProfile: boolean;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
  onFollow?: (userId: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  user, 
  currentUser, 
  posts, 
  isOwnProfile,
  onLike,
  onComment,
  onShare,
  onFollow
}) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  const userPosts = posts.filter(post => post.userId === user.id);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (onFollow) {
      onFollow(user.id);
    }
  };

  const tabs = [
    { id: 'posts', label: 'Posts', count: user.posts },
    { id: 'media', label: 'Media', count: userPosts.filter(p => p.image).length },
    { id: 'likes', label: 'Likes', count: userPosts.reduce((acc, p) => acc + p.likes, 0) }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Photo */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl"></div>
        
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 right-6 flex space-x-3">
          {isOwnProfile ? (
            <>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
              <button className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Settings className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Message
              </button>
              <button className="p-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.fullName}</h1>
            </div>
            <p className="text-gray-600 mb-1">@{user.username}</p>
            <p className="text-gray-700 mb-4 max-w-md">{user.bio}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <LinkIcon className="h-4 w-4" />
                <a href="#" className="text-blue-600 hover:underline">website.com</a>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="font-bold text-gray-900">{user.following.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">{user.followers.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">{user.posts.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts yet</p>
                </div>
              ) : (
                userPosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onLike={onLike}
                    onComment={onComment}
                    onShare={onShare}
                  />
                ))
              )}
            </div>
          )}
          
          {activeTab === 'media' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userPosts
                .filter(post => post.image)
                .map((post) => (
                  <div key={post.id} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt="Media post"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                    />
                  </div>
                ))}
            </div>
          )}
          
          {activeTab === 'likes' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Liked posts would appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;