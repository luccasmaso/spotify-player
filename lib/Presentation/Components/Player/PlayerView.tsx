import React from 'react'

import { ContextProvider as PlaybackProvider } from './Playback'
import { usePlayer } from '../../Hooks/PlayerHook'
import LargePlayerView from './PlayerVariants/LargePlayerView'
import MiniPlayerView from './PlayerVariants/MiniPlayerView'

export default function PlayerView() {

  const { player } = usePlayer()

  if (!player || player.state === 'down') return <></>

  return (
    <PlaybackProvider player={player}>
      <>
        <MiniPlayerView />
        <LargePlayerView />
      </>
    </PlaybackProvider>
  )
}