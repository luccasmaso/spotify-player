export default interface Database {
  init(): Promise<void>
  getPlaylist(id: string): Promise<any>
  savePlaylist(playlist: any): void
  getLikedTracks(): Promise<any>
  getLikedTracksIds(): Promise<any>
  likeTrack(track: any): any
  unlikeTrack(id: string): Promise<void>
  likedTrack(id: string): Promise<boolean>
}