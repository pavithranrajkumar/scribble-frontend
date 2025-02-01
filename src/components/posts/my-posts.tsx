import { useAuth } from '@/context/auth.context';
import { PostList } from './post-list';

export function MyPosts() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold'>My Posts</h2>
        <p className='text-muted-foreground'>Manage your posts</p>
      </div>
      <PostList userId={user.id} />
    </div>
  );
}
