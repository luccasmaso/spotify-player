import TrackRepository from "../Repositories/ITrackRepository"

export default class GetLikedTracksIds {

  trackRepository: TrackRepository

  constructor(trackRepository: TrackRepository) {
    this.trackRepository = trackRepository
  }

  async call(): Promise<[string]> {
    return this.trackRepository.likedTracksIds()
  }
}