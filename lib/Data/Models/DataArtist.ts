import Artist from "../../Domain/Models/Artist"

export default class DataArtist implements Artist {

  name: string

	constructor(name: string) {
    this.name = name
	}

  static fromJSON(data: any): Artist {
    return new DataArtist(data["name"])
  }

}