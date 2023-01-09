import TrackRepository from "../Repositories/ITrackRepository"

export default class UnlikeTrack {

  trackRepository: TrackRepository

  constructor(trackRepository: TrackRepository) {
    this.trackRepository = trackRepository
  }

  async call(id: string): Promise<void> {
    return this.trackRepository.unlike(id)
  }
}