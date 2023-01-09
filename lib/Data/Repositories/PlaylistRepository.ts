import Remote from "../DataSources/Remote"
import Database from "../Database/Database"
import Playlist from "../Models/DataPlaylist"

export type Response = {
  data?: Playlist,
  refreshData: () => Promise<Playlist>
}

export default class PlaylistRepository {

  database: Database
  remote: Remote

  constructor(database: Database, remote: Remote) {
    this.database = database
    this.remote = remote
  }

  async get(query: string): Promise<Response> {
    const data = await this.getFromLocal()
    
    return {
      data,
      refreshData: () => this.getFromRemote(query)
    }
  }

  private async getFromLocal(): Promise<Playlist | undefined> {
    const data = await this.database.getPlaylist(`${process.env.NEXT_PUBLIC_PLAYLIST_ID}`)
    if (data) return this.mapDataToModel(data)
  }

  private async getFromRemote(query: string): Promise<Playlist> {
    const data = await this.remote.getPlaylist(query)

    this.database.savePlaylist(data)
    return this.mapDataToModel(data)
  }

  private mapDataToModel(data: any): Playlist {
    return Playlist.fromJSON(data)
  }
}