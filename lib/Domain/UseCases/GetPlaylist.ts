import PlaylistRepository, { Response } from "../Repositories/IPlaylistRepository"

export default class GetPlaylist {

  playlistRepository: PlaylistRepository

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository
  }

  async call(query: string): Promise<Response> {
    return this.playlistRepository.get(query)
  }
}