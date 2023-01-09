import Track from './Track'
import TrackList from './TrackList'

export default interface Playlist extends TrackList {
  id: string
  name: string
  tracks: [Track]
}