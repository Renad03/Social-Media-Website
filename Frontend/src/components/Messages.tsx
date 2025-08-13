import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreHorizontal, ArrowLeft, Smile, Paperclip } from 'lucide-react';
import { Conversation, Message, User } from '../types';

interface MessagesProps {
  conversations: Conversation[];
  currentUser: User;
  onSendMessage: (conversationId: string, content: string) => void;
  onBack: () => void;
}

const Messages: React.FC<MessagesProps> = ({ 
  conversations, 
  currentUser, 
  onSendMessage,
  onBack 
}) => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedConversation) {
      onSendMessage(selectedConversation.id, messageText);
      setMessageText('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p.id !== currentUser.id && 
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getOtherParticipant = (conversation: Conversation): User => {
    return conversation.participants.find(p => p.id !== currentUser.id) || conversation.participants[0];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Mock messages for the selected conversation
  const mockConversationMessages: Message[] = [
    {
      id: '1',
      senderId: selectedConversation ? getOtherParticipant(selectedConversation).id : '2',
      receiverId: currentUser.id,
      content: 'Hey! Love your latest photo. Where was it taken?',
      timestamp: '2024-01-15T10:30:00Z',
      read: true
    },
    {
      id: '2',
      senderId: currentUser.id,
      receiverId: selectedConversation ? getOtherParticipant(selectedConversation).id : '2',
      content: 'Thanks! It was taken at Golden Gate Bridge during sunset.',
      timestamp: '2024-01-15T10:35:00Z',
      read: true
    },
    {
      id: '3',
      senderId: selectedConversation ? getOtherParticipant(selectedConversation).id : '2',
      receiverId: currentUser.id,
      content: 'Amazing! I need to visit there soon. The colors in that shot are incredible!',
      timestamp: '2024-01-15T10:36:00Z',
      read: true
    },
    {
      id: '4',
      senderId: currentUser.id,
      receiverId: selectedConversation ? getOtherParticipant(selectedConversation).id : '2',
      content: 'You should definitely go! The best time is around 7 PM when the light is perfect.',
      timestamp: '2024-01-15T10:40:00Z',
      read: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden h-[600px] flex">
      {/* Conversations List */}
      <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : ''}`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Messages</h2>
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">No conversations found</p>
            </div>
          ) : (
            <div className="py-2">
              {filteredConversations.map((conversation) => {
                const otherUser = getOtherParticipant(conversation);
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={otherUser.avatar}
                          alt={otherUser.fullName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {otherUser.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedConversation ? 'hidden md:flex' : ''}`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <img
                  src={getOtherParticipant(selectedConversation).avatar}
                  alt={getOtherParticipant(selectedConversation).fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {getOtherParticipant(selectedConversation).fullName}
                  </h3>
                  <p className="text-sm text-green-500">Active now</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <Video className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mockConversationMessages.map((message) => {
                const isCurrentUser = message.senderId === currentUser.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    <Smile className="h-5 w-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;