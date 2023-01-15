import React from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '../../../gql'
import TrackListView from '../TrackList/TrackListView'
import ErrorView from './ErrorView'
import SkeletonView from './SkeletonView'

const GET_PLAYLIST = graphql(`
  query GetPlaylist {
    playlist {
      id
      name
      tracks {
        track {
          ...TrackItem
        }
      }
    } 
  }
`)

export default function PlaylistView() {
  const { error, data, loading } = useQuery(GET_PLAYLIST, {
    fetchPolicy: 'cache-and-network'
  })

  if (loading && data == null) return <SkeletonView />
  if (error && data == null) return <ErrorView />

  const trackList = data!.playlist.tracks ? data!.playlist.tracks!.map((track) => track!.track) : []

  return (
    <>
      <div className='px-2 md:px-0'>
        <div className='text-sm mb-4'>Playlist</div>
        <div className='font-bold text-3xl md:text-4xl'>{data!.playlist.name}</div>
      </div>

      <hr className='text-neutral-200 dark:text-neutral-700 mt-5 mb:6 md:mb-10' />

      <TrackListView trackList={trackList} />
    </>
  )
}