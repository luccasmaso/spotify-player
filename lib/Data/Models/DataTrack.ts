import DataAlbum from "./DataAlbum"
import DataArtist from "./DataArtist"

import Album from "../../Domain/Models/Album"
import Track from "../../Domain/Models/Track"
import Artist from "../../Domain/Models/Artist"

export default class DataTrack implements Track {

  id: string
  name: string
  preview_url: string
  duration_ms: number
  album: Album
  artists: [Artist]

	constructor(id: string, name: string, preview_url: string, duration_ms: number, album: Album, artists: [Artist]) {
    this.id = id
    this.name = name
    this.preview_url = preview_url
    this.duration_ms = duration_ms
    this.album = album
    this.artists = artists
	}

  get previewUrl() { return this.preview_url }
  get durationMs() { return this.duration_ms }

  static fromJSON(data: any): Track {
    return new DataTrack(
      data["id"],
      data["name"],
      data["preview_url"],
      data["duration_ms"],
      DataAlbum.fromJSON(data["album"]),
      data["artists"]?.map((data : any) => DataArtist.fromJSON(data)) || [],
    )
  }

}