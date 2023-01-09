import Album from "./Album"
import Artist from "./Artist"

export default interface Track {
  id: string
  name: string
  preview_url: string
  duration_ms: number
  album: Album
  artists: [Artist]

  get previewUrl(): string
  get durationMs(): number
}