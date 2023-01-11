import React from 'react'

import PlayButton from '../Buttons/PlayButton'
import FavoritedButton from '../Buttons/FavoritedButton'
import FavoriteButton from '../Buttons/FavoriteButton'

import Track from '../../../../Domain/Models/Track'
import TrackList from '../../../../Domain/Models/TrackList'

import useViewModel from '../TrackListViewModel'

export default function TrackCompactView(props: {
  position: number,
  track: Track,
  trackList: TrackList
}) {

  const viewModel = useViewModel(props.track)

  function toggleLike() {
    viewModel.liked() ? viewModel.unlike() : viewModel.like()
  }

  function play() {
    viewModel.play(props.position, props.trackList)
  }

  return (
    <div 
      className='flex items-stretch md:hidden px-2 py-2.5 select-none focus:bg-neutral-50 dark:focus:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900'
      onClick={() => play()}
    >
      <div className='flex-1 pr-3'>
        <div className='flex items-center -mb-0.5 gap-1.5'>
          {viewModel.isPlaying() && <div><PlayButton width={1.1} /></div>}
          <div className='flex-1 line-clamp-1 overflow-hidden'>{props.track.name}</div>
        </div>
        <div className='text-neutral-500 line-clamp-1 text-sm'>
          {props.track.artists.map((arstist) => arstist.name).join(", ")} - {props.track.album.name}
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div 
          className='flex shrink-0 items-center justify-center w-10 h-10 cursor-pointer text-neutral-500' 
          onClick={(event) => { event.stopPropagation(); toggleLike() }}
        >
          {viewModel.liked()
            ? <FavoritedButton width={1.5} />
            : <FavoriteButton width={1.5} />
          }
        </div>
      </div>
    </div>
  )
}