import Head from 'next/head'
import FavoritesView from '../lib/Components/Favorites/FavoritesView'

export default function Favorites() {
  return (
    <>
      <Head><title>Favorites</title></Head>
      <FavoritesView />
    </>
  )
}