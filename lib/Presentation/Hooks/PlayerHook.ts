import TrackList from '../../Domain/Models/TrackList'
import { useStore } from '../Providers/StoreProvider'
import { useUseCases } from '../Providers/UseCasesProvider'

export const usePlayer = () => {
  const useCases = useUseCases()
  const store = useStore()

  const play = (position: number, trackList: TrackList) => {
    const player = useCases.playTrack.call(position, trackList)

    if (!store.player) store.setPlayer(player)

    store!.setCurrentTrack(player.currentTrack)
  }

  const pause = (toggle: boolean) => {
    useCases.pauseTrack.call(toggle)
  }

  const skipForward = () => {
    useCases.skipTrack.call('forward')
    store.setCurrentTrack(store.player!.currentTrack)
  }

  const skipBackwards = () => {
    useCases.skipTrack.call('backwards')
    store.setCurrentTrack(store.player!.currentTrack)
  }

  return { 
    player: store.player, 
    currentTrack: store.currentTrack, 
    play, pause, skipForward, skipBackwards
  }
}