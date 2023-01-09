import Playlist from "../Models/Playlist"

export type Response = {
  data?: Playlist,
  refreshData: () => Promise<Playlist>
}

export default interface IPlaylistRepository {
  get(query: string): Promise<Response>
}