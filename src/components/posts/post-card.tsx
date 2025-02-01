import { Link, useNavigate } from 'react-router-dom';
import { FiThumbsUp, FiThumbsDown, FiTrash2, FiEdit } from 'react-icons/fi';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth.context';
import { useLikePost, useDislikePost, useDeletePost } from '@/hooks/use-posts';
import type { Post } from '@/types/graphql';
import moment from 'moment';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  console.log(post);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { deletePost, loading: deleteLoading } = useDeletePost();
  const { likePost, loading: likeLoading } = useLikePost();
  const { dislikePost, loading: dislikeLoading } = useDislikePost();

  const isAuthor = user?.id === post.author.id;
  const loading = likeLoading || dislikeLoading || deleteLoading;

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost({
        variables: { id: post.id },
        optimisticResponse: {
          deletePost: post.id,
        },
        update(cache) {
          // Immediately remove from UI
          cache.modify({
            fields: {
              posts(existingPosts = [], { readField }) {
                return existingPosts.filter((postRef: any) => post.id !== readField('id', postRef));
              },
            },
          });
        },
      });

      // Navigate if on post detail page
      if (window.location.pathname.includes('/post/')) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLike = () => {
    if (!isAuthenticated) return;
    likePost({ variables: { id: post.id } });
  };

  const handleDislike = () => {
    if (!isAuthenticated) return;
    dislikePost({ variables: { id: post.id } });
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <Link to={`/post/${post.id}`} className='text-lg font-semibold hover:underline'>
            {post.title}
          </Link>
          {isAuthor && (
            <div className='flex items-center gap-2'>
              <Button variant='ghost' size='sm' onClick={() => navigate(`/edit/${post.id}`)}>
                <FiEdit className='mr-1' />
                Edit
              </Button>
              <Button variant='ghost' size='sm' onClick={handleDelete} disabled={deleteLoading}>
                <FiTrash2 className='mr-1' />
                Delete
              </Button>
            </div>
          )}
        </div>
        <p className='text-sm text-muted-foreground'>by {post.author.username}</p>
      </CardHeader>

      <CardContent>
        <p className='line-clamp-3'>{post.description}</p>
      </CardContent>

      <CardFooter>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'
            className={post.isLiked ? 'text-primary' : ''}
            onClick={handleLike}
            disabled={loading || !isAuthenticated}
          >
            <FiThumbsUp className='mr-1' />
            {post.likeCount}
          </Button>

          <Button
            variant='ghost'
            size='sm'
            className={post.isDisliked ? 'text-destructive' : ''}
            onClick={handleDislike}
            disabled={loading || !isAuthenticated}
          >
            <FiThumbsDown className='mr-1' />
            {post.dislikeCount}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
