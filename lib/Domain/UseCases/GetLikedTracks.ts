import LikedTracks from "../Models/LikedTracks"
import TrackRepository from "../Repositories/ITrackRepository"

export default class GetLikedTracks {

  trackRepository: TrackRepository

  constructor(trackRepository: TrackRepository) {
    this.trackRepository = trackRepository
  }

  async call(): Promise<LikedTracks> {
    return this.trackRepository.likedTracks()
  }
}