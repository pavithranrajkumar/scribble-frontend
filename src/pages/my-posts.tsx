import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PostList } from '@/components/posts/post-list';
import { useAuth } from '@/context/auth.context';

export default function MyPosts() {
  const { user } = useAuth();

  return (
    <div className='container py-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold'>My Posts</h1>
          <p className='text-muted-foreground'>Manage your posts</p>
        </div>
        <Link to='/create'>
          <Button>Create Post</Button>
        </Link>
      </div>

      <PostList userId={user?.id} />
    </div>
  );
}
