import Album from "../../Domain/Models/Album"
import Image from "../../Domain/Models/Image"

import DataImage from "./DataImage"

export default class DataAlbum implements Album {

  name: string
  images: [Image]

	constructor(name: string, images: [Image]) {
    this.name = name
    this.images = images
	}

  static fromJSON(data: any): Album {
    return new DataAlbum(
      data["name"],
      data["images"]?.map((data: any) => DataImage.fromJSON(data)) || []
    )
  }

}