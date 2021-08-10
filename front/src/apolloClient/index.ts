import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.APOLLO_SERVER_URI || 'http://127.0.0.1:8080/graphql/',
  cache: new InMemoryCache()
})
