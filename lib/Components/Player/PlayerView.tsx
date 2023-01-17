import React from 'react'
import { usePlayer } from '../../Player/PlayerProvider'
import { PlaybackStateProvider } from './PlaybackStateProvider'
import LargePlayerView from './Layouts/LargePlayerView'
import MiniPlayerView from './Layouts/MiniPlayerView'

export default function PlayerView() {
  const player = usePlayer()

  if (!player.currentTrack) return <></>

  return (
    <PlaybackStateProvider audio={player.audio}>
      <MiniPlayerView />
      <LargePlayerView />
    </PlaybackStateProvider>
  )
}