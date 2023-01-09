import Track from '../../Domain/Models/Track'
import { useStore } from '../Providers/StoreProvider'
import { useUseCases } from '../Providers/UseCasesProvider'

export const useTrack = () => {
  const store = useStore()
  const useCases = useUseCases()

  const liked = async (id: string) => {
    return useCases.likedTrack.call(id)
  }

  const like = async (track: Track) => {
    await useCases.likeTrack.call(track)
    getLikeTracks()
  }

  const unlike = async (id: string) => {
    await useCases.unlikeTrack.call(id)
    getLikeTracks()
  }

  const getLikeTracks = async () => {
    const response = await useCases.getLikedTracks.call()
    store.setLikedTracks(response)
    store.setLikedTracksIds(new Set(response.tracks.map((track) => track.id)))
  }

  return {
    likedTracks: store.likedTracks, 
    likedTracksIds: store.likedTracksIds,
    liked, like, unlike, getLikeTracks
  }
}