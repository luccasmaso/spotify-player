import Head from 'next/head'

import PlaylistView from '../lib/Presentation/Components/Playlist/PlaylistView'

export default function Index() {
  return (
    <>
      <Head><title>Playlist</title></Head>
      <PlaylistView />
    </>
  )
}