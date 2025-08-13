import React from 'react';
import { TrendingUp, Users, Calendar, Bookmark } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentUser: User;
  suggestedUsers: User[];
  onFollow: (userId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, suggestedUsers, onFollow }) => {
  const trendingTopics = [
    { name: '#Technology', posts: '125K posts' },
    { name: '#Photography', posts: '89K posts' },
    { name: '#Travel', posts: '67K posts' },
    { name: '#Fitness', posts: '45K posts' },
    { name: '#Food', posts: '34K posts' }
  ];

  const upcomingEvents = [
    { name: 'Tech Conference 2024', date: 'Mar 15', attendees: 234 },
    { name: 'Photography Workshop', date: 'Mar 20', attendees: 89 },
    { name: 'Community Meetup', date: 'Mar 25', attendees: 156 }
  ];

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{currentUser.fullName}</h3>
            <p className="text-gray-600 text-sm">@{currentUser.username}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-bold text-lg text-gray-900">{currentUser.posts}</div>
            <div className="text-xs text-gray-500">Posts</div>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">{currentUser.followers}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div>
            <div className="font-bold text-lg text-gray-900">{currentUser.following}</div>
            <div className="text-xs text-gray-500">Following</div>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Trending</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <div>
                <div className="font-medium text-gray-900">{topic.name}</div>
                <div className="text-xs text-gray-500">{topic.posts}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Suggested for you</h3>
        </div>
        <div className="space-y-4">
          {suggestedUsers.slice(0, 3).map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-gray-900 text-sm">{user.fullName}</div>
                  <div className="text-xs text-gray-500">@{user.username}</div>
                </div>
              </div>
              <button
                onClick={() => onFollow(user.id)}
                className="px-4 py-1 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200">
              <div className="font-medium text-gray-900 text-sm">{event.name}</div>
              <div className="text-xs text-gray-500 mt-1">{event.date} • {event.attendees} attending</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <Bookmark className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-700">Saved Posts</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <Users className="h-5 w-5 text-indigo-500" />
            <span className="text-sm text-gray-700">Find Friends</span>
          </button>
          <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <TrendingUp className="h-5 w-5 text-pink-500" />
            <span className="text-sm text-gray-700">Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;