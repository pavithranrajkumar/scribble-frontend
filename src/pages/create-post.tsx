import { useNavigate } from 'react-router-dom';
import { PostForm } from '@/components/posts/post-form';
import { useCreatePost } from '@/hooks/use-posts';
import type { PostInput } from '@/lib/validations/post';

export default function CreatePost() {
  const navigate = useNavigate();
  const { createPost, loading } = useCreatePost();

  const onSubmit = async (data: PostInput) => {
    const result = await createPost({
      variables: {
        input: data,
      },
    });
    if (result.data) {
      navigate(`/post/${result.data.createPost.id}`);
    }
  };

  return (
    <div className='container max-w-2xl py-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Create Post</h1>
        <p className='text-muted-foreground'>Share your thoughts with the world</p>
      </div>

      <PostForm onSubmit={onSubmit} isLoading={loading} />
    </div>
  );
}
