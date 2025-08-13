import React from 'react';
import { Heart, MessageCircle, UserPlus, AtSign, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  if (!isOpen) return null;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-green-500" />;
      case 'mention':
        return <AtSign className="h-5 w-5 text-purple-500" />;
      default:
        return <Heart className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500">{unreadCount} new notifications</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No notifications yet</p>
            <p className="text-sm text-gray-400 mt-1">When you get notifications, they'll show up here</p>
          </div>
        ) : (
          <div className="py-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{notification.user.fullName}</span>
                        <span className="ml-1">{notification.message}</span>
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;