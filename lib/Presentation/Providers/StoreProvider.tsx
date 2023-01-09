import React, { useContext, createContext, useState } from 'react'

import TrackList from '../../Domain/Models/TrackList'
import Track from '../../Domain/Models/Track'
import Player from '../../Domain/Services/Player'

type ContextType = {
  playlist?: TrackList,
  player?: Player,
  likedTracks?: TrackList,
  likedTracksIds: Set<string>
  currentTrack?: Track
  setLikedTracksIds: any,
  setPlaylist: any,
  setPlayer: any,
  setLikedTracks: any,
  setCurrentTrack: any
}

type Props = {
  children: JSX.Element
}

export const Context = createContext<ContextType>({ likedTracksIds: new Set<string>() } as ContextType)

export function ContextProvider({ children } : Props) {
  const [likedTracksIds, setLikedTracksIds] = useState<Set<string>>(new Set())
  const [likedTracks, setLikedTracks] = useState<TrackList>()
  const [playlist, setPlaylist] = useState<TrackList>()
  const [player, setPlayer] = useState<Player>()
  const [currentTrack, setCurrentTrack] = useState<Track>()
  
  return (
    <Context.Provider value={{ 
      playlist, setPlaylist, 
      player, setPlayer, 
      likedTracks, setLikedTracks, 
      likedTracksIds, setLikedTracksIds, 
      currentTrack, setCurrentTrack
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStore = () => useContext(Context)