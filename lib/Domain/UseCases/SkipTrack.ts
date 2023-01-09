import Player from "../Services/Player"

export default class SkipTrack {

  player: Player

  constructor(player: Player) {
    this.player = player
  }

  call(direction: 'forward'|'backwards'): void {
    this.player.skip(direction)
  }
}