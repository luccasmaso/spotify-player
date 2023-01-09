import Track from "../Models/Track"
import TrackList from "../Models/TrackList"
import Player from "./Player"

export default class StreamingPlayer implements Player {

  public state: 'up' | 'down'
  trackList?: TrackList
  currentTrack?: Track
  position?: number
  audioElement: HTMLAudioElement
  intervals?: [NodeJS.Timer]

  constructor() {
    this.state = 'down'
    this.audioElement = new Audio()
  }

  async play(position: number, trackList: TrackList): Promise<void> {
    this.state = 'up'
    this.position = position
    this.currentTrack = trackList.tracks[position - 1]
    this.trackList = trackList
    this.audioElement.src = this.currentTrack.previewUrl

    await this.audioElement.play()
  }

  async pause(toggle: boolean): Promise<void> {
    if (this.state === 'down') return
    
    if (!toggle) {
      await this.audioElement.play()
    } else {
      this.audioElement.pause()
    }
  }
  
  skip(direction: 'forward'|'backwards'): void {
    if (this.state === 'down') return

    let nextPosition
    
    if (direction === 'forward') {
      nextPosition = this.position === this.trackList!.tracks.length ? 1 : this.position! + 1
    } else {
      nextPosition = this.position === 1 ? this.trackList!.tracks.length : this.position! - 1
    }
    
    this.play(nextPosition, this.trackList!)
  }

  teardown(): void {
    this.cleanIntervals()
    this.stopAudio()
  }

  private cleanIntervals() {
    this.intervals?.forEach((interval : NodeJS.Timer) => clearInterval(interval))
    this.intervals = undefined
  }

  private stopAudio() {
    this.audioElement.ontimeupdate = null
    this.audioElement.pause()
    this.audioElement.src = ""
  }

}