import React, { useContext, createContext, useState, useEffect, useRef } from 'react'
import { TrackItemFragment } from '../../gql/graphql'

type DirectionType = 'forward'|'backwards'

type ContextType = {
  currentTrack?: TrackItemFragment,
  skip: (direction: DirectionType) => Promise<void>,
  play: (position: number, trackList: TrackItemFragment[]) => Promise<void>,
  pause: (toggle: boolean) => Promise<void>,
  audio: HTMLAudioElement,
}

export const Context = createContext<ContextType>({} as ContextType)

export function PlayerProvider(props: { children: JSX.Element }) {
  const [currentTrack, setCurrentTrack] = useState<TrackItemFragment>()
  const [position, setPosition] = useState<number>()
  const [trackList, setTrackList] = useState<TrackItemFragment[]>([])
  const audio = useRef<HTMLAudioElement>()

  useEffect(() => {
    audio.current = new Audio()
    return () => teardown()
  }, [])

  async function play(position: number, trackList: TrackItemFragment[]): Promise<void> {
    const track = trackList[position - 1]

    setPosition(position)
    setTrackList(trackList)
    setCurrentTrack(track)
    
    audio.current!.src = track.previewUrl || ''

    return audio.current!.play().catch(() => {})
  }

  async function pause(toggle: boolean): Promise<void> {
    if (!toggle) {
      return audio.current!.play().catch(() => {})
    } else {
      return audio.current!.pause()
    }
  }
  
  function skip(direction: DirectionType): Promise<void> {
    if (direction === 'forward') {
      return play(position === trackList.length ? 1 : position! + 1, trackList)
    } else {
      return play(position === 1 ? trackList.length : position! - 1, trackList)
    }
  }

  function teardown(): void {
    stopAudio()
  }

  function stopAudio() {
    audio.current!.pause()
    audio.current!.src = ''
  }
  
  return (
    <Context.Provider value={{ currentTrack, skip, play, pause, audio: audio.current! }}>
      {props.children}
    </Context.Provider>
  )
}

export const usePlayer = () => useContext(Context)