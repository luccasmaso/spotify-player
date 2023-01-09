import Track from "../Models/Track"
import TrackList from "../Models/TrackList"
import Player from "./Player"

export default class FakePlayer implements Player {
  
  state: "up" | "down"
  currentTrack?: Track | undefined
  audioElement: HTMLAudioElement

  constructor() {
    this.state = "down"
    this.audioElement = new Audio()
  }

  play(position: number, trackList: TrackList): void {
    this.state = "up"
    this.currentTrack = trackList.tracks[position - 1]
  }

  pause(): void {
    // Method not implemented.
  }

  skip(): void {
    // Method not implemented.
  }
  
  teardown(): void {
    this.state = "down"
    this.currentTrack = undefined
  }
  
}