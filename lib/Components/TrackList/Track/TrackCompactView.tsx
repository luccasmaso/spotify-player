import React from 'react'
import { TrackActionsProps, TrackProps } from './TrackView'
import Icon from '../../../Icons/Icons'

export default function TrackCompactView(props: TrackProps & TrackActionsProps) {
  return (
    <div 
      className='flex items-stretch md:hidden px-2 py-2.5 select-none focus:bg-neutral-50 dark:focus:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-900'
      onClick={() => props.play(props.position, props.trackList)}
    >
      <div className='flex-1 pr-3'>
        <div className='flex items-center -mb-0.5 gap-1.5'>
          {props.isPlaying() && <div><Icon name='play' size={1.1} /></div>}
          <div className='flex-1 line-clamp-1 overflow-hidden'>{props.track.name}</div>
        </div>
        <div className='text-neutral-500 line-clamp-1 text-sm'>
          {props.track.artists?.map((artist) => artist?.name).join(", ")} - {props.track.album?.name}
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div 
          className='flex shrink-0 items-center justify-center w-10 h-10 cursor-pointer text-neutral-500' 
          onClick={(event) => { 
            event.stopPropagation()
            props.isLiked() ? props.unlike() : props.like() 
          }}
        >
          {props.isLiked()
            ? <Icon name='heart-[solid]' size={1.4} />
            : <Icon name='heart' size={1.4} />
          }
        </div>
      </div>
    </div>
  )
}