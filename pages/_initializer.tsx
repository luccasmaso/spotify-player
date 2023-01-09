import { useEffect, useState } from 'react'

// Database
import Database from '../lib/Data/Database/Database'

// Remote
import Remote from '../lib/Data/DataSources/Remote'

// Use Cases
import GetPlaylist from '../lib/Domain/UseCases/GetPlaylist'
import LikeTrack from '../lib/Domain/UseCases/LikeTrack'
import UnlikeTrack from '../lib/Domain/UseCases/UnlikeTrack'
import PlayTrack from '../lib/Domain/UseCases/PlayTrack'
import PauseTrack from '../lib/Domain/UseCases/PauseTrack'
import SkipTrack from '../lib/Domain/UseCases/SkipTrack'
import GetLikedTracks from '../lib/Domain/UseCases/GetLikedTracks'
import LikedTrack from '../lib/Domain/UseCases/LikedTrack'

// Repositories
import PlaylistRepository from '../lib/Data/Repositories/PlaylistRepository'
import TrackRepository from '../lib/Data/Repositories/TrackRepository'

// Services
import Player from '../lib/Domain/Services/StreamingPlayer'
  
type Response = {
  ready: boolean,
  useCases?: UseCases
}

export type UseCases = {
  getPlaylist: GetPlaylist,
  getLikedTracks: GetLikedTracks,
  likeTrack: LikeTrack,
  unlikeTrack: UnlikeTrack,
  likedTrack: LikedTrack,
  playTrack: PlayTrack,
  pauseTrack: PauseTrack,
  skipTrack: SkipTrack
}

export default function useInitializer(): Response {
  const [useCases, setUseCases] = useState<UseCases>()

  useEffect(() => {
    let player: Player | undefined = undefined

    const runInitializer = async () => {
      const data = await initialize()
      player = data.player
    }

    runInitializer()

    return () => player?.teardown()
  }, [])

  async function initialize() {
    const database = await startDatabase()

    const remote = new Remote()
    const playlistRepository = new PlaylistRepository(database!, remote)
    const trackRepository = new TrackRepository(database!)
    const player = new Player()

    setUseCases({
      getPlaylist: new GetPlaylist(playlistRepository),
      getLikedTracks: new GetLikedTracks(trackRepository),
      likeTrack: new LikeTrack(trackRepository),
      unlikeTrack: new UnlikeTrack(trackRepository),
      likedTrack: new LikedTrack(trackRepository),
      playTrack: new PlayTrack(player),
      pauseTrack: new PauseTrack(player),
      skipTrack: new SkipTrack(player)
    })

    return { player }
  }

  async function startDatabase() {
    const result = await import('../lib/Data/DataSources/IndexedDB')
    const database : Database = result.database
    
    await database.init()

    return database
  }

  return { ready: useCases != null, useCases }

}