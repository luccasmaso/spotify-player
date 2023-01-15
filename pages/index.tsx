import Head from 'next/head'
import PlaylistView from '../lib/Components/Playlist/PlaylistView'

export default function Index() {
  return (
    <>
      <Head><title>Playlist</title></Head>
      <PlaylistView />
    </>
  )
}