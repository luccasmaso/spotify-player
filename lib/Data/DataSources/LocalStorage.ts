import Database from "../Database/Database"

export default class LocalStorage implements Database {
  
  init(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getPlaylist(id: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  savePlaylist(playlist: any): void {
    throw new Error('Method not implemented.')
  }

  getLikedTracks(): Promise<any> {
    throw new Error('Method not implemented.')
  }

  getLikedTracksIds(): Promise<any> {
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