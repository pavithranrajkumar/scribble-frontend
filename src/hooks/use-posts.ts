import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { GET_POSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, DISLIKE_POST } from '@/lib/graphql/posts';
import type { Post } from '@/types/graphql';

interface PostsData {
  posts: Post[];
}

interface PostsVars {
  offset?: number;
  limit?: number;
  userId?: string;
}

export function usePosts(variables: PostsVars = {}) {
  return useQuery<PostsData, PostsVars>(GET_POSTS, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });
}

export function useUserPosts(userId: string) {
  return useQuery<PostsData, PostsVars>(GET_POSTS, {
    variables: { userId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });
}

export function usePost(id: string) {
  return useQuery<{ post: Post }>(GET_POST, {
    variables: { id },
    skip: !id,
  });
}

export function useCreatePost() {
  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: createPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  title
                  description
                }
              `,
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
    onCompleted: () => {
      toast.success('Post created successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createPost, loading };
}

export function useUpdatePost() {
  const [updatePost, { loading }] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      toast.success('Post updated successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatePost, loading };
}

export function useDeletePost() {
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    update(cache, { data }) {
      const deletedId = data?.deletePost;

      // Remove from all posts queries
      const queries = cache.extract();
      Object.keys(queries).forEach((key) => {
        if (key.includes('posts')) {
          const queryData = cache.readQuery<PostsData>({
            query: GET_POSTS,
            variables: {
              offset: 0,
              limit: 10,
              ...(key.includes('me') ? { userId: 'me' } : {}),
            },
          });

          if (queryData?.posts) {
            cache.writeQuery<PostsData>({
              query: GET_POSTS,
              variables: {
                offset: 0,
                limit: 10,
                ...(key.includes('me') ? { userId: 'me' } : {}),
              },
              data: {
                posts: queryData.posts.filter((post) => post.id !== deletedId),
              },
            });
          }
        }
      });

      // Remove the deleted post from cache
      cache.evict({ id: `Post:${deletedId}` });
      cache.gc();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Post deleted successfully');
    },
  });

  return { deletePost, loading };
}

export function useLikePost() {
  const [likePost, { loading }] = useMutation(LIKE_POST, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { likePost, loading };
}

export function useDislikePost() {
  const [dislikePost, { loading }] = useMutation(DISLIKE_POST, {
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { dislikePost, loading };
}
