import Database from "../Database/Database"

export default class LocalStorage implements Database {
  
  async init(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getPlaylist(id: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  savePlaylist(playlist: any): void {
    throw new Error('Method not implemented.')
  }

  async getLikedTracks(): Promise<any> {
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

export const database = new LocalStorage()