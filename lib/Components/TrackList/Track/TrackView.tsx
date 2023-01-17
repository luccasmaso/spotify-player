import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useFragment } from '../../../../gql'
import { TrackItemFragment } from '../../../../gql/graphql'
import { usePlayer } from '../../../Player/PlayerProvider'
import TrackCompactView from './TrackCompactView'
import TrackDetailedView from './TrackDetailedView'
import { GET_LIKED_TRACKS } from '../../../Apollo/cache'
import { TRACK_FRAGMENT } from '../TrackListView'

export type TrackProps = {
  position: number,
  track: TrackItemFragment,
  trackList: TrackItemFragment[],
  display?: any
}

export type TrackActionsProps = {
  play: (position: number, trackList: TrackItemFragment[]) => void,
  isPlaying: () => boolean,
  isLiked: () => boolean,
  like: () => void,
  unlike: () => void,
}

export default function TrackView(props: { likedTracksIds: Set<string> } & TrackProps) {
  const client = useApolloClient()
  const player = usePlayer()

  function play(position: number, trackList: TrackItemFragment[]) {
    player.play(position, trackList)
  }

  function isLiked(): boolean {
    return props.likedTracksIds.has(props.track.id)
  }

  function isPlaying(): boolean {
    return player.currentTrack ? player.currentTrack!.id === props.track.id : false
  }

  async function like() {
    const data = client.readQuery({ query: GET_LIKED_TRACKS })

    client.writeQuery({
      query: GET_LIKED_TRACKS,
      data: {
        likedTracks: [props.track, ...data?.likedTracks || []]
      }
    })
  }

  async function unlike() {
    const data = client.readQuery({ query: GET_LIKED_TRACKS })

    client.writeQuery({
      query: GET_LIKED_TRACKS,
      data: {
        likedTracks: data?.likedTracks?.filter((likedTrack) => useFragment(TRACK_FRAGMENT, likedTrack)!.id != props.track.id) || []
      }
    })
  }

  return (
    <>
      <TrackCompactView 
        position={props.position} 
        trackList={props.trackList} 
        track={props.track}
        play={play}
        isPlaying={isPlaying}
        isLiked={isLiked}
        like={like}
        unlike={unlike}
      />
      
      <TrackDetailedView 
        position={props.position} 
        trackList={props.trackList} 
        track={props.track} 
        display={props.display} 
        play={play}
        isPlaying={isPlaying}
        isLiked={isLiked}
        like={like}
        unlike={unlike}
      />
    </>
  ) 
}