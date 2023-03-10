import { ApolloClient } from '@apollo/client'
import { cache } from './Cache'

export const client = new ApolloClient({
  cache: cache,
  uri: process.env.NEXT_PUBLIC_API_URL
})