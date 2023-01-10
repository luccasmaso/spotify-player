import React from 'react'

import PlayButton from '../Buttons/PlayButton'
import FavoritedButton from '../Buttons/FavoritedButton'
import FavoriteButton from '../Buttons/FavoriteButton'

import Track from '../../../../Domain/Models/Track'
import TrackList from '../../../../Domain/Models/TrackList'

import { formatTime } from '../../../Helpers/TimeHelpers'
import useViewModel from '../TrackListViewModel'

export default function TrackDetailedView(props: {
  position: number,
  track: Track,
  trackList: TrackList,
  tableSettings: any,
  height: number
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
      className={`
        relative active:top-px hidden md:flex items-center transition group hover:bg-neutral-50 rounded select-none 
        focus:bg-neutral-50 focus:outline-none
        ${props.tableSettings.style}
        ${viewModel.isPlaying() && 'bg-neutral-50'}
      `}
      onDoubleClick={() => play()}
      tabIndex={0}
      style={{ height: props.height }}
      data-cy="track"
    >
      <div className={`${props.tableSettings.spacing[0]} flex items-center justify-center`}>
        <div className='relative aspect-square' style={{ width: '1.2rem', height: '1.2rem' }}>
          <div className='absolute inset-0 group-hover:hidden flex items-center justify-center'>
            {viewModel.isPlaying() ? <span data-cy='playing'><PlayButton width={1.2} /></span> : props.position}
          </div>
          <div 
            className='absolute inset-0	hidden group-hover:flex items-center justify-center'
            onClick={() => play()}
          >
            <div className='cursor-pointer'><PlayButton width={1.2} /></div>
          </div>
        </div>
        <div 
          className={`ml-5 text-neutral-500 cursor-pointer ${viewModel.loading === 'loading' && 'animate-pulse'}`} 
          onClick={() => toggleLike()}
        >
          {viewModel.liked()
            ? <div><FavoritedButton width={1.2} /></div>
            : <div className='transition opacity-0 group-hover:opacity-100'>
                <FavoriteButton width={1.2} />
              </div>
          }
        </div>
      </div>
      <div className={`${props.tableSettings.spacing[1]} text-ellipsis whitespace-nowrap overflow-hidden`}>
        {props.track.name}
      </div>
      <div className={`${props.tableSettings.spacing[2]} text-ellipsis whitespace-nowrap overflow-hidden`}>
        {props.track.artists.map((arstist) => arstist.name).join(", ")}
      </div>
      <div className={`${props.tableSettings.spacing[3]} text-ellipsis whitespace-nowrap overflow-hidden`}>
        {props.track.album.name}
      </div>
      <div className={`${props.tableSettings.spacing[4]} text-ellipsis whitespace-nowrap overflow-hidden text-right`}>
        {formatTime(props.track.durationMs)}
      </div>
    </div>
  )
}