import Album from '../../../lib/Data/Models/DataAlbum'
import Artist from '../../../lib/Data/Models/DataArtist'
import Image from '../../../lib/Data/Models/DataImage'
import TrackList from '../../../lib/Data/Models/DataLikedTracks'
import Track from '../../../lib/Data/Models/DataTrack'
import PlayTrack from '../../../lib/Domain/UseCases/PlayTrack'
import FakePlayer from '../../../lib/Domain/Services/FakePlayer'

import TrackListView from '../../../lib/Presentation/Components/TrackList/TrackListView'
import TrackView from '../../../lib/Presentation/Components/TrackList/TrackView'

import { ContextProvider as UseCasesProvider } from '../../../lib/Presentation/Providers/UseCasesProvider'
import { ContextProvider as StoreProvider } from '../../../lib/Presentation/Providers/StoreProvider'

describe('<TrackListView>', () => {
  context('Tracks available', () => {
    it('Mount empty state', () => {
      const emptyTrackList = new TrackList("id", "test", [])

      cy.mount(<TrackListView trackList={emptyTrackList} />)
      cy.get('[data-cy="empty-state"]').should('exist')
    })
  })

  context('Tracks unavailable', () => {
    it('Mount listing state', () => {
      const track = new Track("id", "test", "url", 0, new Album("test", [new Image("url")]), [new Artist("test")])

      const trackList = new TrackList("id", "test", [
        track,
        track,
        track
      ])

      cy.mount(<TrackListView trackList={trackList} />)
      cy.get('[data-cy="list"]').should('exist')
    })
  })
})

describe('<TrackView>', () => {
  it('Verify play behavior', () => {
    const track = new Track("id", "test", "url", 0, new Album("test", [new Image("url")]), [new Artist("test")])
    const tracks = [track, track]
    
    const trackList = new TrackList("id", "test", tracks)

    const player = new FakePlayer()
    const playTrack = new PlayTrack(player)

    cy.mount(
      <StoreProvider>
        <UseCasesProvider useCases={{ playTrack }}>
          <TrackView 
            position={1} 
            trackList={trackList} 
            track={tracks[0]} 
            tableSettings={{ style: "", spacing: ['', '', '', '', ''] }} 
          />
        </UseCasesProvider>
      </StoreProvider>
    )

    cy.get('[data-cy="track"]').dblclick()
    cy.get('[data-cy="playing"]').should('exist')
  })
})