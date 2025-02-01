import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { environment } from '@/config/environment';

const httpLink = createHttpLink({
  uri: environment.apiUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ['userId'],
            merge(existing = [], incoming, { args = { offset: 0 } }) {
              // If it's a fresh load (offset: 0), just return incoming
              if (!args!.offset) {
                return incoming;
              }

              // Otherwise merge with existing data
              const merged = existing ? [...existing] : [];
              for (let i = 0; i < incoming.length; i++) {
                merged[args!.offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
      Post: {
        fields: {
          likes: {
            merge: false,
          },
          dislikes: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
