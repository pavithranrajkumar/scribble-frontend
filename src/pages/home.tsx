import { PostList } from '@/components/posts/post-list';

export default function Home() {
  return (
    <div className='container py-8'>
      <div className='mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Welcome to Scribble</h1>
        <PostList />
      </div>
    </div>
  );
}
