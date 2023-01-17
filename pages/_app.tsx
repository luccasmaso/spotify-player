import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { PlayerProvider } from '../lib/Player/PlayerProvider'
import PlayerView from '../lib/Components/Player/PlayerView'
import TabView from '../lib/Components/Tab/TabView'
import fonts from './_fonts'
import { client } from '../lib/Apollo'
import { useEffect, useState } from 'react'
import { initCache } from '../lib/Apollo/cache'

export default function App({ Component, pageProps }: AppProps) {
  const [cacheInitialized, setCacheInitialized] = useState(false)

  useEffect(() => { 
    initCache().then(() => setCacheInitialized(true))
  }, [])

  if (!cacheInitialized) return <></>

  return (
    <div className={`flex flex-col md:w-9/12 m-auto min-h-screen pb-20 ${fonts()}`}>
      <ApolloProvider client={client}>
        <PlayerProvider>
          <>
            <TabView />
            <Component {...pageProps} />
            <PlayerView />
          </>
        </PlayerProvider>
      </ApolloProvider>
    </div>
  )
}