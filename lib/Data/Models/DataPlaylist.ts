import Track from "../../Domain/Models/Track"
import TrackList from "../../Domain/Models/TrackList"
import Playlist from "../../Domain/Models/Playlist"

import DataTrack from "./DataTrack"

export default class DataPlaylist implements TrackList {

  id: string
  name: string
  tracks: [Track]
	
	constructor(id: string, name: string, tracks: [Track]) {
    this.id = id
    this.name = name
    this.tracks = tracks
	}

  static fromJSON(data: any): Playlist {
    return new DataPlaylist(
      data["id"],
      data["name"],
      data["tracks"]?.map((track: any) => DataTrack.fromJSON(track["track"])) || []
    )
  }

}