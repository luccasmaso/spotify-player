import Track from './Track'
import TrackList from './TrackList'

export default interface LikedTracks extends TrackList {
  id: string
  name: string
  tracks: [Track]
}