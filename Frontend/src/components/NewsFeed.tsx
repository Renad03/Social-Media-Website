import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import { Post as PostType, User } from '../types';

interface NewsFeedProps {
  posts: PostType[];
  currentUser: User;
  onCreatePost: (content: string, image?: string) => void;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ 
  posts, 
  currentUser, 
  onCreatePost, 
  onLike, 
  onComment, 
  onShare 
}) => {
  return (
    <div className="max-w-2xl mx-auto">
      <PostCreator 
        currentUser={currentUser}
        onCreatePost={onCreatePost}
      />
      
      <div className="space-y-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;