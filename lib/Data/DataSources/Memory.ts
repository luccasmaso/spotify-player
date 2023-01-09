import Database from "../Database/Database"

export default class Memory implements Database {

  likedTracks: Set<string>
	
	constructor() {
    this.likedTracks = new Set()
	}

  init(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getPlaylist(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  savePlaylist(playlist: any): void {
    throw new Error('Method not implemented.')
  }

  getLikedTracks(): Promise<any> {
    throw new Error('Method not implemented.')
  }

  likeTrack(track: any) {
    throw new Error('Method not implemented.')
  }

  unlikeTrack(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  likedTrack(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

export const database = new Memory()
