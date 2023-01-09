import Database from "../Database/Database"

const dbName = "app"
const dbVersion = 1

export default class IndexedDB implements Database {

  db?: IDBDatabase

  async init(): Promise<void> {
    return new Promise((resolve) => {
      const request = window.indexedDB.open(dbName, dbVersion)
    
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = () => {
        const db = request.result
        db.createObjectStore('likedTracks', { keyPath: 'trackId' })
        db.createObjectStore('playlist', { keyPath: 'playlistId' })
      }
    })
  }

  async getPlaylist(id: any): Promise<any> {
    return new Promise((resolve) => {
      const request = this.db!
        .transaction('playlist')
        .objectStore('playlist')
        .get(id)

      request.onsuccess = () => resolve(request.result)
    })
  }

  savePlaylist(playlist: any): void {
    this.db!
      .transaction('playlist', 'readwrite')
      .objectStore('playlist')
      .put({ playlistId: playlist.id, ...playlist })
  }

  async getLikedTracks(): Promise<any> {
    return new Promise((resolve) => {
      const request = this.db!
        .transaction('likedTracks')
        .objectStore('likedTracks')
        .getAll()

      request.onsuccess = () => resolve(request.result)
    })
  }

  likeTrack(track: any): Promise<any> {
    return new Promise((resolve) => {
      const request = this.db!
        .transaction('likedTracks', 'readwrite')
        .objectStore('likedTracks')
        .add({ trackId: track.id, ...track })

      request.onsuccess = () => resolve(track)
    })
  }

  unlikeTrack(id: any): Promise<void> {
    return new Promise((resolve) => {
      const request = this.db!
        .transaction('likedTracks', 'readwrite')
        .objectStore('likedTracks')
        .delete(id)

      request.onsuccess = () => resolve()
    })
  }

  async likedTrack(id: any): Promise<boolean> {
    return new Promise((resolve) => {
      const request = this.db!
        .transaction('likedTracks')
        .objectStore('likedTracks')
        .get(id)

      request.onsuccess = () => resolve(request.result != null)
    })
  }

}

export const database = new IndexedDB()
