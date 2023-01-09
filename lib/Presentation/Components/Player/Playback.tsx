import { useContext, createContext, useEffect, useState } from 'react'

import Player from '../../../Domain/Services/Player'

type PlaybackState = 'playing'|'ended'|'paused'|'idle'|'error'

type ContextType = {
  playbackState: PlaybackState, 
  progress: number, 
  timeElapsed: number
}

type Props = {
  children?: JSX.Element,
  player: Player
}

export const Context = createContext<ContextType>({
  playbackState: 'idle', 
  progress: 0, 
  timeElapsed: 0
})

export function ContextProvider({ children, player } : Props) {

  const [progress, setProgress] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle')

  const tearDown = () => {
    player!.audioElement.onplay = null
    player!.audioElement.onended = null
    player!.audioElement.ontimeupdate = null
    player!.audioElement.onerror = null
    player!.audioElement.onpause = null
  }

  useEffect(() => {
    if (player) {
      player.audioElement.onpause = () => {
        setPlaybackState("paused")
      }

      player.audioElement.onerror = () => {
        setPlaybackState("error")
      }

      player.audioElement.ontimeupdate = () => {
        const currentTime = (player.audioElement.currentTime * 1000)

        setTimeElapsed(currentTime)
        setProgress(currentTime - timeElapsed)
      }

      player.audioElement.onended = () => {
        const currentTime = (player.audioElement.currentTime * 1000)
        const duration = (player.audioElement.currentTime * 1000)

        setPlaybackState("ended")
        setTimeElapsed(currentTime)
        setProgress(duration)
      }

      player.audioElement.onplay = () => playbackState !== 'paused' && setPlaybackState("idle")
      player.audioElement.onplaying = () => setPlaybackState("playing")

      return () => tearDown()
    }
  }, [player])
  
  useEffect(() => {
    () => tearDown()
  }, [])
  
  return (
    <Context.Provider value={{ playbackState, progress, timeElapsed }}>
      {children}
    </Context.Provider>
  )
}

export const usePlayback = () => useContext(Context)