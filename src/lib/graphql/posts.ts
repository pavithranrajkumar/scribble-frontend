import { gql } from '@apollo/client';

const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    title
    description
    author {
      id
      username
    }
    likeCount
    dislikeCount
    isLiked
    isDisliked
    createdAt
  }
`;

export const GET_POSTS = gql`
  query GetPosts($offset: Int, $limit: Int, $userId: ID) {
    posts(offset: $offset, limit: $limit, userId: $userId) {
      id
      title
      description
      createdAt
      updatedAt
      likeCount
      dislikeCount
      isLiked
      isDisliked
      author {
        id
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

export const DISLIKE_POST = gql`
  mutation DislikePost($id: ID!) {
    dislikePost(id: $id) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;
