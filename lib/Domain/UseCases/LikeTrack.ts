
import Track from "../Models/Track"
import TrackRepository from "../Repositories/ITrackRepository"

export default class LikeTrack {

  trackRepository: TrackRepository

  constructor(trackRepository: TrackRepository) {
    this.trackRepository = trackRepository
  }

  async call(track: Track): Promise<void> {
    await this.trackRepository.like(track)
  }
}