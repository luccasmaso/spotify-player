import Player from "../Services/Player"

export default class PauseTrack {

  player: Player

  constructor(player: Player) {
    this.player = player
  }

  call(toggle: boolean): void {
    this.player.pause(toggle)
  }
}