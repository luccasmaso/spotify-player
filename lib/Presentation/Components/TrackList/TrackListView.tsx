import React from 'react'

import Tracklist from '../../../Domain/Models/TrackList'
import EmptyStateView from './EmptyStateView'
import TrackView from './TrackView'

export default function TrackListView(props: { trackList : Tracklist }) {

  const tableSettings = { 
    style: 'px-2 mb-2 gap-6', 
    spacing: [`w-[10%]`, `w-[25%]`, `w-[25%]`, `w-[40%]`, `w-[10%]`] 
  }

  if (!props.trackList.tracks.length) return <EmptyStateView />

  return (
    <div data-cy='list'>
      <div className={`hidden md:flex text-neutral-400 ${tableSettings.style}`}>
        <div className={tableSettings.spacing[0]}></div>
        <div className={tableSettings.spacing[1]}>Artist</div>
        <div className={tableSettings.spacing[2]}>Album</div>
        <div className={tableSettings.spacing[3]}>Title</div>
        <div className={`${tableSettings.spacing[4]} text-right`}>Duration</div>
      </div>
 
      {props.trackList.tracks.map((track, index : number) =>
        <TrackView 
          key={track.id}
          track={track} 
          trackList={props.trackList}
          position={index + 1}
          tableSettings={tableSettings}
        />
      )}
    </div>
  )
}