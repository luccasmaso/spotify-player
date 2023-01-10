import React from 'react'
import { useTrack } from '../../Hooks/TrackHook'

import TabItemView from './TabItemView'

export default function TabView() {
  const track = useTrack()

  const favoritesCount = !track.likeTracksCount ? '···' : `(${track.likeTracksCount})`

  return (
    <div className='flex justify-center md:sticky top-0 bg-white p-6 z-10'>
      <div className='flex md:inline-flex text-sm'>
        <TabItemView name="Playlist" route="/playlist" reference="/" />
        <TabItemView name={`Favorites ${favoritesCount}`} route="/favorites" />
      </div>
    </div>
  )
}