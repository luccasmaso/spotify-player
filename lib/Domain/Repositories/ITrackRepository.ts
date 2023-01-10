import Track from "../Models/Track"
import LikedTracks from "../Models/LikedTracks"

export default interface ITrackRepository {
  like(track: Track): Promise<Track>
  unlike(id: string): Promise<void>
  liked(id: string): Promise<boolean>
  likedTracks(): Promise<LikedTracks>
  likedTracksIds(): Promise<[string]>
}