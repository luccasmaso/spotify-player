import { useStore } from '../Providers/StoreProvider'
import { useUseCases } from '../Providers/UseCasesProvider'
import { useTrack } from './TrackHook'

export const usePlaylist = () => {
  const store = useStore()
  const useCases = useUseCases()
  const track = useTrack()

  /* 
    (fetch policy: "cache-and-network")
    If cached data is present, the remote data will be refreshed asynchronously in the background. 
    If not, it will be performed synchronously.
  */
  const fetchAndRefreshPlaylist = async (query: string) => {
    const { data, refreshData } = await useCases.getPlaylist.call(query)

    if (data) {
      store.setPlaylist(data)
      refreshData().then((newData) => store.setPlaylist(newData))
    } else {
      const newData = await refreshData()
      store.setPlaylist(newData)
    }
    
    track.getLikeTracksIds()
  }

  return {
    playlist: store.playlist,
    fetchAndRefreshPlaylist
  }
}