import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { resolvers } from './resolvers';
import { useMemo } from 'react';
import { useAPIKey } from '../APIKeyProvider';
import React from 'react';

const cache = new InMemoryCache();

// await before instantiating ApolloClient, else queries might run before the cache is persisted
await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage)
});

function useClient() {
  const { apiKey } = useAPIKey();
  const client = useMemo(
    () =>
      new ApolloClient({
        defaultContext: {
          apiKey
        },
        link: ApolloLink.from([
          setContext((_, prev) => ({
            ...prev,
            apiKey
          }))
        ]),
        cache,
        resolvers
      }),
    [apiKey]
  );
  return client;
}

export function GraphQLProvider(props: React.PropsWithChildren<object>) {
  const { children } = props;
  const client = useClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
