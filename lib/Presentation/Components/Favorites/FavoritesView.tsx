import React from 'react'

import TrackListView from '../TrackList/TrackListView'
import ErrorView from './ErrorView'
import SkeletonView from './SkeletonView'

import { useQuery } from './FavoritesViewModel'

export default function FavoritesView() {
  const { likedTracks, loading, error } = useQuery()

  if (loading === 'none') return <></>
  if (loading === 'loading') return <SkeletonView />
  if (error) return <ErrorView />

  return (
    <>
      <div className='px-2 md:px-0'>
        <div className='text-sm mb-4'>Favorites</div>
        <div className='font-bold text-3xl md:text-4xl'>{likedTracks!.name}</div>
      </div>

      <hr className='text-neutral-200 dark:text-neutral-700 mt-5 mb:6 md:mb-10' />

      <TrackListView trackList={likedTracks!} />
    </>
  )
}