import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FragmentType, graphql, useFragment } from '../../../gql'
import { GET_LIKED_TRACKS } from '../../Apollo/Cache'
import EmptyStateView from './EmptyStateView'
import TrackView from './Track/TrackView'

export const TRACK_FRAGMENT = graphql(`
  fragment TrackItem on Track {
    id
    previewUrl: preview_url
    durationMs: duration_ms
    name
    album { 
      name 
      images { 
        url 
      } 
    }
    artists { 
      name 
    }
  }
`)

export default function TrackListView(props: { trackList: FragmentType<typeof TRACK_FRAGMENT>[] }) {  
  const display = { 
    style: 'px-2 mb-2 gap-6', 
    spacing: [`w-[10%]`, `w-[25%]`, `w-[25%]`, `w-[40%]`, `w-[10%]`] 
  }
  
  const { data } = useQuery(GET_LIKED_TRACKS)
  const [likedTracksIds, setLikedTrackIds] = useState<Set<string>>(new Set())
  
  const trackList = useMemo(() => 
    props.trackList.map((track) => useFragment(TRACK_FRAGMENT, track)), 
    [props.trackList]
  )

  // Ensures O(1) time complexity for liked tracks lookups
  function mapLikedTracksToIdsSet() {
    setLikedTrackIds(new Set(data?.likedTracks?.map((likedTrack) => useFragment(TRACK_FRAGMENT, likedTrack)!.id)) || [])
  }

  useEffect(() => mapLikedTracksToIdsSet(), [data])

  if (trackList.length === 0) return <EmptyStateView />

  return (
    <div data-cy='list'>
      <div className={`hidden md:flex text-neutral-400 ${display.style}`}>
        <div className={display.spacing[0]}></div>
        <div className={display.spacing[1]}>Artist</div>
        <div className={display.spacing[2]}>Album</div>
        <div className={display.spacing[3]}>Title</div>
        <div className={`${display.spacing[4]} text-right`}>Duration</div>
      </div>
 
      {trackList.map((track, index: number) =>
        <TrackView 
          key={track.id}
          track={track} 
          trackList={trackList}
          position={index + 1}
          display={display}
          likedTracksIds={likedTracksIds}
        />
      )}
    </div>
  )
}