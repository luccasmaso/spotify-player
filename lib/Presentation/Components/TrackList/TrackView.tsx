import React from 'react'

import Track from '../../../Domain/Models/Track'
import TrackList from '../../../Domain/Models/TrackList'

import TrackCompactView from './TrackVariants/TrackCompactView'
import TrackDetailedView from './TrackVariants/TrackDetailedView'

export const height = 60

export default function TrackView(props: {
  position: number,
  track: Track,
  trackList: TrackList,
  tableSettings: any
}) {

  return (
    <>
      <TrackCompactView position={props.position} trackList={props.trackList} track={props.track} height={height} />
      <TrackDetailedView position={props.position} trackList={props.trackList} track={props.track} tableSettings={props.tableSettings} height={height} />
    </>
  )
  
}