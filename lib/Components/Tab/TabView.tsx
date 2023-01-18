import React from 'react'
import { useQuery } from '@apollo/client'

import TabItemView from './TabItemView'
import { GET_LIKED_TRACKS } from '../../Apollo/Cache'

export default function TabView() {
  const { data } = useQuery(GET_LIKED_TRACKS)

  const favoritesCount = data?.likedTracks?.length ? `(${data?.likedTracks.length})` : ""

  return (
    <div className='flex justify-center md:sticky top-0 bg-white dark:bg-black p-6 z-10'>
      <div className='flex md:inline-flex text-sm'>
        <TabItemView name="Playlist" route="/" />
        <TabItemView name={`Favorites ${favoritesCount}`} route="/favorites" />
      </div>
    </div>
  )
}