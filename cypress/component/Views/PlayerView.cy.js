import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import TrackDetailedView from '../../../lib/Components/TrackList/TrackVariants/TrackDetailedView'
import PlayerView from '../../../lib/Components/Player/PlayerView'
import { PlayerProvider } from '../../../lib/Player/PlayerProvider'

const client = new ApolloClient({ uri: process.env.NEXT_PUBLIC_API_URL, cache: new InMemoryCache() })
const trackList = [
  { id: '1', previewUrl: '', durationMs: 0, name: 'name 1', album: { name: '', images: [{ url: '' }]}, artists: [{ name: ''}] },
  { id: '2', previewUrl: '', durationMs: 0, name: 'name 2', album: { name: '', images: [{ url: '' }]}, artists: [{ name: ''}] }
]

describe('<PlayerView>', () => {
  it('Render correct track', () => {
    cy.mount(
      <ApolloProvider client={client}>
        <PlayerProvider>
          <TrackDetailedView 
            position={1} 
            trackList={trackList} 
            track={trackList[0]} 
            tableSettings={{ style: "", spacing: ['', '', '', '', ''] }} 
          />
          <PlayerView />
        </PlayerProvider>
      </ApolloProvider>
    )

    cy.get('[data-cy="track"]').dblclick()
    cy.get('[data-cy="skip-forward"]').click()
    cy.get('[data-cy="play-pause"]').click()
    cy.get('[data-cy="track"]').contains(trackList[1].name)
  })
})