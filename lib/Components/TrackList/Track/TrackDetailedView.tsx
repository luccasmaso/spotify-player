import React from 'react'
import { formatTime } from '../../../Helpers/TimeHelpers'
import { TrackActionsProps, TrackProps } from './TrackView'
import Icon from '../../../Icons/Icons'

export default function TrackDetailedView(props: TrackProps & TrackActionsProps) {
  return (
    <div 
      className={`
        relative active:top-px hidden md:flex transition group hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded py-3 select-none 
        focus:bg-neutral-50 focus:dark:bg-neutral-900 focus:outline-none
        ${props.display.style}
        ${props.isPlaying() && 'bg-neutral-50 dark:bg-neutral-900'}
      `}
      onDoubleClick={() => props.play(props.position, props.trackList)}
      tabIndex={0}
      data-cy="track"
    >
      <div className={`${props.display.spacing[0]} flex items-center justify-center`}>
        <div className='relative aspect-square' style={{ width: '1.2rem', height: '1.2rem' }}>
          <div className='absolute inset-0 group-hover:hidden flex items-center justify-center'>
            {props.isPlaying() ? <span data-cy='playing'><Icon name='play' size={1.2} /></span> : props.position}
          </div>
          <div 
            className='absolute inset-0	hidden group-hover:flex items-center justify-center'
            onClick={() => props.play(props.position, props.trackList)}
          >
            <div className='cursor-pointer'><Icon name='play' size={1.2} /></div>
          </div>
        </div>
        <div 
          className='ml-5 text-neutral-500 cursor-pointer' 
          onClick={() => props.isLiked() ? props.unlike() : props.like()}
        >
          {props.isLiked()
            ? <div><Icon name='heart-[solid]' size={1.2} /></div>
            : <div className='transition opacity-0 group-hover:opacity-100'>
                <Icon name="heart" size={1.2} />
              </div>
          }
        </div>
      </div>
      <div className={`${props.display.spacing[1]} text-ellipsis whitespace-nowrap overflow-hidden`}>
        {props.track.name}
      </div>
      <div className={`${props.display.spacing[2]} text-ellipsis whitespace-nowrap overflow-hidden`}>
        {props.track.artists?.map((artist) => artist?.name).join(", ")}
      </div>
      <div className={`${props.display.spacing[3]} text-ellipsis whitespace-nowrap overflow-hidden`}>
        {props.track.album?.name}
      </div>
      <div className={`${props.display.spacing[4]} text-ellipsis whitespace-nowrap overflow-hidden text-right`}>
        {formatTime(props.track.durationMs)}
      </div>
    </div>
  )
}