import Database from "../Database/Database"
import LikedTracks from "../Models/DataLikedTracks"
import Track from "../Models/DataTrack"
import ITrackRepository from "../../Domain/Repositories/ITrackRepository"

export default class TrackRepository implements ITrackRepository {

  database: Database

  constructor(database: Database) {
    this.database = database
  }

  async like(track: Track): Promise<Track> {
    return this.database.likeTrack(track)
  }

  async unlike(id: string): Promise<void> {
    return this.database.unlikeTrack(id)
  }

  async liked(id: string): Promise<boolean> {
    return this.database.likedTrack(id)
  }

  async likedTracks(): Promise<LikedTracks> {
    const tracks = await this.database.getLikedTracks()
    return this.mapDataToModel(tracks)
  }

  async likedTracksIds(): Promise<[string]> {
    return this.database.getLikedTracksIds()
  }

  private mapDataToModel(data: any): LikedTracks {
    return LikedTracks.fromJSON(data)
  }

}