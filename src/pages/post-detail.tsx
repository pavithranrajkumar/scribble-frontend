import { useParams, useNavigate } from 'react-router-dom';
import { FiThumbsUp, FiThumbsDown, FiTrash2 } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { usePost, useDeletePost, useLikePost, useDislikePost } from '@/hooks/use-posts';
import { useAuth } from '@/context/auth.context';

export default function PostDetail() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = usePost(id);
  const { isAuthenticated, user } = useAuth();
  const { deletePost, loading: deleteLoading } = useDeletePost();
  const { likePost, loading: likeLoading } = useLikePost();
  const { dislikePost, loading: dislikeLoading } = useDislikePost();

  const isAuthor = user?.id === data?.post.author.id;
  const actionLoading = likeLoading || dislikeLoading || deleteLoading;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    await deletePost({
      variables: { id },
    });
    navigate('/');
  };

  const handleLike = () => {
    if (!isAuthenticated) return;
    likePost({ variables: { id } });
  };

  const handleDislike = () => {
    if (!isAuthenticated) return;
    dislikePost({ variables: { id } });
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

  const { post } = data;

  return (
    <div className='container max-w-2xl py-8'>
      <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-3xl font-bold'>{post.title}</h1>
          {isAuthor && (
            <div className='flex items-center gap-2'>
              <Button variant='outline' onClick={() => navigate(`/edit/${post.id}`)}>
                Edit
              </Button>
              <Button variant='destructive' onClick={handleDelete} isLoading={deleteLoading}>
                <FiTrash2 className='mr-2' />
                Delete
              </Button>
            </div>
          )}
        </div>
        <p className='text-muted-foreground'>
          by {post.author.username} • {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className='prose max-w-none mb-8'>{post.description}</div>

      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='sm'
          className={post.isLiked ? 'text-primary' : ''}
          onClick={handleLike}
          disabled={actionLoading || !isAuthenticated}
        >
          <FiThumbsUp className='mr-1' />
          {post.likeCount}
        </Button>

        <Button
          variant='ghost'
          size='sm'
          className={post.isDisliked ? 'text-destructive' : ''}
          onClick={handleDislike}
          disabled={actionLoading || !isAuthenticated}
        >
          <FiThumbsDown className='mr-1' />
          {post.dislikeCount}
        </Button>
      </div>
    </div>
  );
}
