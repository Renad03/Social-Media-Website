import React, { useState } from 'react';
import { Image, Smile, MapPin, Send } from 'lucide-react';
import { User } from '../types';

interface PostCreatorProps {
  currentUser: User;
  onCreatePost: (content: string, image?: string) => void;
}

const PostCreator: React.FC<PostCreatorProps> = ({ currentUser, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content, imageUrl || undefined);
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const sampleImages = [
    'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1496372/pexels-photo-1496372.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`What's on your mind, ${currentUser.fullName.split(' ')[0]}?`}
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows={3}
            />

            {showImageInput && (
              <div className="mt-4 space-y-3">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-4 gap-2">
                  {sampleImages.map((url, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setImageUrl(url)}
                      className="relative overflow-hidden rounded-lg hover:scale-105 transition-transform duration-200"
                    >
                      <img
                        src={url}
                        alt={`Sample ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
                {imageUrl && (
                  <div className="mt-3">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    showImageInput
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Image className="h-5 w-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <Smile className="h-5 w-5" />
                  <span className="text-sm font-medium">Emoji</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">Location</span>
                </button>
              </div>
              
              <button
                type="submit"
                disabled={!content.trim()}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
                <span className="font-medium">Post</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;