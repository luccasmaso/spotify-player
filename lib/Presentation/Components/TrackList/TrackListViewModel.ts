import { useState } from 'react'

import Track from '../../../Domain/Models/Track'
import TrackList from '../../../Domain/Models/TrackList'

import { usePlayer } from '../../Hooks/PlayerHook'
import { useTrack } from '../../Hooks/TrackHook'

export default function TrackListViewModel(trackItem: Track) {
  const track = useTrack()
  const player = usePlayer()

  const [loading, setLoading] = useState<'none'|'loading'|'loaded'>('none')

  

  function play(position: number, trackList: TrackList) {
    player.play(position, trackList)
  }

  function liked() {
    return track.likedTracksIds.has(trackItem.id)
  }

  function isPlaying() {
    return player.player?.currentTrack ? player.currentTrack!.id === trackItem.id : false
  }

  async function like() {
    setLoading('loading')
    await track.like(trackItem)
    setLoading('loaded')
  }

  async function unlike() {
    setLoading('loading')
    await track.unlike(trackItem.id)
    setLoading('loaded')
  }

  return { play, like, unlike, liked, isPlaying, loading }
}