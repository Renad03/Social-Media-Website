import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from 'lucide-react';
import { Post as PostType, User } from '../types';

interface PostProps {
  post: PostType;
  currentUser: User;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
}

const Post: React.FC<PostProps> = ({ post, currentUser, onLike, onComment, onShare }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike(post.id);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.user.avatar}
              alt={post.user.fullName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.user.fullName}</h3>
                {post.user.verified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">@{post.user.username} • {post.timestamp}</p>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="px-6 pb-4">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{likesCount} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                isLiked
                  ? 'text-red-500 bg-red-50 hover:bg-red-100'
                  : 'text-gray-600 hover:text-red-500 hover:bg-gray-100'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">Like</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-blue-500 hover:bg-gray-100 transition-all duration-200"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Comment</span>
            </button>
            
            <button
              onClick={() => onShare(post.id)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:text-green-500 hover:bg-gray-100 transition-all duration-200"
            >
              <Share className="h-5 w-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>
          
          <button className="p-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <form onSubmit={handleComment} className="flex items-start space-x-3 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>
          
          <div className="space-y-3">
            {/* Sample Comments */}
            <div className="flex items-start space-x-3">
              <img
                src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Commenter"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="bg-white px-4 py-2 rounded-2xl">
                  <p className="font-medium text-sm">Sarah Wilson</p>
                  <p className="text-gray-700 text-sm">Amazing shot! The colors are incredible. 📸</p>
                </div>
                <div className="flex items-center space-x-4 mt-1 px-4">
                  <button className="text-xs text-gray-500 hover:text-blue-500">Like</button>
                  <button className="text-xs text-gray-500 hover:text-blue-500">Reply</button>
                  <span className="text-xs text-gray-400">2h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;