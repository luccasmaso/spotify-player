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
    getLikeTracksIds()
  }

  const getLikeTracksIds = async () => {
    const ids = await useCases.getLikedTracksIds.call()
    store.setLikedTracksIds(new Set(ids))
  }

  return {
    likedTracks: store.likedTracks, 
    likedTracksIds: store.likedTracksIds,
    likeTracksCount: store.likedTracksIds.size,
    liked, like, unlike, getLikeTracks, getLikeTracksIds
  }
}