import '../styles/globals.css'

import type { AppProps } from 'next/app'

import PlayerView from '../lib/Presentation/Components/Player/PlayerView'
import TabView from '../lib/Presentation/Components/Tab/TabView'

import { ContextProvider as StoreProvider } from '../lib/Presentation/Providers/StoreProvider'
import { ContextProvider as UseCasesProvider } from '../lib/Presentation/Providers/UseCasesProvider'

import useInitializer from './_initializer'
import fonts from './_fonts'

export default function App({ Component, pageProps }: AppProps) {

  const config = useInitializer()

  if (!config.ready) return

  return (
    <div className={`flex flex-col md:w-9/12 m-auto min-h-screen pb-20 px-2 md:px-0 ${fonts()}`}>
      <StoreProvider>
        <UseCasesProvider useCases={config.useCases!}>
          <>
            <TabView />
            <Component {...pageProps} />
            <PlayerView />
          </>
        </UseCasesProvider>
      </StoreProvider>
    </div>
  )
}