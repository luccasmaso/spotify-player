import Image from "../../Domain/Models/Image"

export default class DataImage implements Image {

  url: string

	constructor(url: string) {
    this.url = url
	}

  static fromJSON(data: any): Image {
    return new DataImage(data["url"])
  }

}