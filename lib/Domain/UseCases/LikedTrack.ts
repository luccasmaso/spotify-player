import TrackRepository from "../Repositories/ITrackRepository"

export default class LikedTrack {

  trackRepository: TrackRepository

  constructor(trackRepository: TrackRepository) {
    this.trackRepository = trackRepository
  }

  async call(id: string): Promise<boolean> {
    return this.trackRepository.liked(id)
  }
}