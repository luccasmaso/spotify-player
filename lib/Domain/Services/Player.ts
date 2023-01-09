import Track from "../Models/Track"
import Tracklist from "../Models/TrackList"

export default interface Player {
  
  state: 'up' | 'down'
  currentTrack?: Track
  audioElement: HTMLAudioElement

  play(position: number, trackList: Tracklist): void
  pause(toggle: boolean): void
  skip(direction: 'forward'|'backwards'): void
  teardown(): void
}