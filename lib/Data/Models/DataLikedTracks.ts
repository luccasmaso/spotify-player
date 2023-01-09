import Track from "../../Domain/Models/Track"
import TrackList from "../../Domain/Models/TrackList"
import LikedTracks from "../../Domain/Models/LikedTracks"

import DataTrack from "./DataTrack"

export default class DataLikedTracks implements TrackList {

  id: string
  name: string
  tracks: [Track]
	
	constructor(id: string, name: string, tracks: [Track]) {
    this.id = id
    this.name = name
    this.tracks = tracks
	}

  static fromJSON(data : any) : LikedTracks {
    return new DataLikedTracks(
      "id",
      "Liked Tracks",
      data ? data.map((data : any) => DataTrack.fromJSON(data)) : []
    )
  }

}