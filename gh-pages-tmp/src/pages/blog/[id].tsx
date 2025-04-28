import { useParams } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts';
import { BlogPostContent } from '../../components/BlogPostContent';

export default function BlogPostPage() {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === id);

  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <BlogPostContent post={post} />
    </div>
  );
} 