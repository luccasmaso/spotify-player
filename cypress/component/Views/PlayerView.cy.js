import Album from '../../../lib/Data/Models/DataAlbum'
import Artist from '../../../lib/Data/Models/DataArtist'
import Image from '../../../lib/Data/Models/DataImage'
import TrackList from '../../../lib/Data/Models/DataLikedTracks'
import Track from '../../../lib/Data/Models/DataTrack'
import PlayTrack from '../../../lib/Domain/UseCases/PlayTrack'
import FakePlayer from '../../../lib/Domain/Services/FakePlayer'

import TrackDetailedView from '../../../lib/Presentation/Components/TrackList/TrackVariants/TrackDetailedView'
import PlayerView from '../../../lib/Presentation/Components/Player/PlayerView'

import { ContextProvider as UseCasesProvider } from '../../../lib/Presentation/Providers/UseCasesProvider'
import { ContextProvider as StoreProvider } from '../../../lib/Presentation/Providers/StoreProvider'
import SkipTrack from '../../../lib/Domain/UseCases/SkipTrack'
import PauseTrack from '../../../lib/Domain/UseCases/PauseTrack'


describe('<PlayerView>', () => {
  it('Render correct track', () => {
    const track1 = new Track("id1", "test", "url", 0, new Album("test", [new Image("url")]), [new Artist("test")])
    const track2 = new Track("id2", "test", "url", 0, new Album("test", [new Image("url")]), [new Artist("test")])
    const tracks = [track1, track2]

    const trackList = new TrackList("id", "test", tracks)

    const player = new FakePlayer()
    const playTrack = new PlayTrack(player)
    const skipTrack = new SkipTrack(player)
    const pauseTrack = new PauseTrack(player)

    cy.mount(
      <StoreProvider>
        <UseCasesProvider useCases={{ playTrack, pauseTrack, skipTrack }}>
          <TrackDetailedView 
            position={1} 
            trackList={trackList} 
            track={tracks[0]} 
            tableSettings={{ style: "", spacing: ['', '', '', '', ''] }} 
          />
          <PlayerView />
        </UseCasesProvider>
      </StoreProvider>
    )

    cy.get('[data-cy="track"]').dblclick()
    cy.get('[data-cy="skip-forward"]').click()
    cy.get('[data-cy="play-pause"]').click()
    cy.get('[data-cy="track"]').contains(track2.name)
  })
})