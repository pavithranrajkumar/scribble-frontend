import { useParams, useNavigate } from 'react-router-dom';
import { PostForm } from '@/components/posts/post-form';
import { Spinner } from '@/components/ui/spinner';
import { usePost, useUpdatePost } from '@/hooks/use-posts';
import { useAuth } from '@/context/auth.context';
import type { PostInput } from '@/lib/validations/post';

export default function EditPost() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = usePost(id);
  const { updatePost, loading: updateLoading } = useUpdatePost();
  const { user } = useAuth();

  const onSubmit = async (formData: PostInput) => {
    const result = await updatePost({
      variables: {
        input: {
          id,
          ...formData,
        },
      },
    });
    if (result.data) {
      navigate(`/post/${id}`);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center py-8'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (error) {
    return <div className='text-center py-8 text-destructive'>Error loading post: {error.message}</div>;
  }

  if (!data?.post) {
    return <div className='text-center py-8 text-muted-foreground'>Post not found</div>;
  }

  if (user?.id !== data.post.author.id) {
    navigate('/');
    return null;
  }

  return (
    <div className='container max-w-2xl py-8'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold'>Edit Post</h1>
        <p className='text-muted-foreground'>Update your post details</p>
      </div>

      <PostForm
        defaultValues={{
          title: data.post.title,
          description: data.post.description,
        }}
        onSubmit={onSubmit}
        isLoading={updateLoading}
      />
    </div>
  );
}
