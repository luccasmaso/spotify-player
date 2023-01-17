import React from 'react'
import { useQuery } from '@apollo/client'
import TrackListView from '../TrackList/TrackListView'
import ErrorView from './ErrorView'
import SkeletonView from './SkeletonView'
import { GET_LIKED_TRACKS } from '../../Apollo/cache'

export default function FavoritesView() {
  const { loading, error, data, refetch } = useQuery(GET_LIKED_TRACKS)

  if (loading && data == null) return <SkeletonView />
  if (error && data == null) return <ErrorView />

  return (
    <>
      <div className='px-2 md:px-0'>
        <div className='text-sm mb-4' onClick={() => refetch()}>Favorites</div>
        <div className='font-bold text-3xl md:text-4xl'>Liked Tracks</div>
      </div>

      <hr className='text-neutral-200 dark:text-neutral-700 mt-5 mb:6 md:mb-10' />

      <TrackListView trackList={data?.likedTracks.map((likedTrack) => likedTrack!) || []} />
    </>
  )
}