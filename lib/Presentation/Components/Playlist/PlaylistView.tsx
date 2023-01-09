import React from 'react'

import TrackListView from '../TrackList/TrackListView'
import ErrorView from './ErrorView'
import SkeletonView from './SkeletonView'

import { useQuery } from './PlaylistViewModel'

export default function PlaylistView() {
  const { loading, playlist, error } = useQuery()

  if (loading === 'none') return <></>
  if (loading === 'loading') return <SkeletonView />
  if (error) return <ErrorView />

  return (
    <>
      <div>
        <div className='text-sm mb-4'>Playlist</div>
        <div className='font-bold text-3xl md:text-4xl'>{playlist!.name}</div>
      </div>

      <hr className='text-neutral-200 mt-5 mb:6 md:mb-10' />

      <TrackListView trackList={playlist!} />
    </>
  )
}