import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import TrackListView from '../../../lib/Components/TrackList/TrackListView'
import TrackView from '../../../lib/Components/TrackList/TrackView'
import { PlayerProvider } from '../../../lib/Player/PlayerProvider'

const client = new ApolloClient({ uri: process.env.NEXT_PUBLIC_API_URL, cache: new InMemoryCache() })
const trackList = [{ id: '', previewUrl: '', durationMs: 0, name: '', album: { name: '', images: [{ url: '' }]}, artists: [{ name: ''}] }]

describe('<TrackListView>', () => {
  context('Tracks unavailable', () => {
    it('Mount empty state', () => {
      cy.mount(<ApolloProvider client={client}><TrackListView trackList={[]} /></ApolloProvider>)
      cy.get('[data-cy="empty-state"]').should('exist')
    })
  })

  context('Tracks available', () => {
    it('Mount listing state', () => {
      cy.mount(<ApolloProvider client={client}><TrackListView trackList={trackList} /></ApolloProvider>)
      cy.get('[data-cy="list"]').should('exist')
    })
  })
})

describe('<TrackView>', () => {
  it('Verify play behavior', () => {
    cy.mount(
      <ApolloProvider client={client}>
        <PlayerProvider>
          <TrackView 
            position={1} 
            trackList={trackList} 
            track={trackList[0]} 
            tableSettings={{ style: "", spacing: ['', '', '', '', ''] }} 
          />
        </PlayerProvider>
      </ApolloProvider>
    )

    cy.get('[data-cy="track"]').dblclick()
    cy.get('[data-cy="playing"]').should('exist')
  })
})