export default class Remote {
  /** 
   * @throws {Error}
   */
  async getPlaylist(query: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }) 
    })

    const { data } = await res.json()

    return data.playlist
  }
}