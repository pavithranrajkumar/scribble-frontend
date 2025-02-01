import React from 'react';
import { PostCard } from './post-card';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/hooks/use-posts';

const POSTS_PER_PAGE = 10;

interface PostListProps {
  userId?: string;
}

export function PostList({ userId }: PostListProps) {
  const [page, setPage] = React.useState(1);

  const { data, loading, error, fetchMore } = usePosts({
    limit: POSTS_PER_PAGE,
    offset: (page - 1) * POSTS_PER_PAGE,
    userId: userId || undefined,
  });

  const loadMore = () => {
    setPage((prev) => prev + 1);
    fetchMore({
      variables: {
        offset: page * POSTS_PER_PAGE,
        userId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          posts: [...prev.posts, ...fetchMoreResult.posts],
        };
      },
    });
  };

  if (error) {
    return <div className='text-center py-8 text-destructive'>Error loading posts: {error.message}</div>;
  }

  const showEmpty = !loading && !data?.posts.length;
  const showLoadMore = !loading && data?.posts.length! >= POSTS_PER_PAGE * page;

  return (
    <div className='space-y-6'>
      {showEmpty ? (
        <div className='text-center py-8 text-muted-foreground'>{userId ? `You haven't created any posts yet` : 'No posts found'}</div>
      ) : (
        <>
          <div className='space-y-6'>
            {data?.posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {loading && (
            <div className='flex justify-center py-8'>
              <Spinner size='lg' />
            </div>
          )}

          {showLoadMore && (
            <div className='flex justify-center'>
              <Button variant='outline' onClick={loadMore} disabled={loading}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
