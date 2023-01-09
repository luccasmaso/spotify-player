import TrackList from "../Models/TrackList"
import Player from "../Services/Player"

export default class PlayTrack {

  player: Player

  constructor(player: Player) {
    this.player = player
  }

  call(position: number, trackList: TrackList): Player {
    this.player.play(position, trackList)
    return this.player
  }
}