import { InMemoryCache } from '@apollo/client'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'
import { graphql } from '../../gql'

export const cache = new InMemoryCache()

export const initCache = (): Promise<void> => {
  return persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage)
  })
}

export const GET_LIKED_TRACKS = graphql(`
  query GetLikedTracks {
    likedTracks @client {
      ...TrackItem
    }
  }
`)