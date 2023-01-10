import React, { useEffect, useRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window'

import Tracklist from '../../../Domain/Models/TrackList'
import EmptyStateView from './EmptyStateView'
import { outerElementType } from './OuterElement'
import TrackView, { height } from './TrackView'

export default function TrackListView(props: { trackList : Tracklist }) {

  const list = useRef<HTMLInputElement>(null)
  const [dimensions, setDimensions] = useState<any>(null)

  useEffect(() => {
    if (!list.current) return
    
    const updateDimensions = () => {
      setDimensions({
        width: list.current!.clientWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions) 
  }, [list])

  const tableSettings = { 
    style: 'px-2 gap-6', 
    spacing: [`w-[10%]`, `w-[25%]`, `w-[25%]`, `w-[40%]`, `w-[10%]`] 
  }

  if (!props.trackList.tracks.length) return <EmptyStateView />

  return (
    <div data-cy='list' className='flex flex-col flex-1'>
      <div className={`hidden md:flex text-neutral-400 ${tableSettings.style}`}>
        <div className={tableSettings.spacing[0]}></div>
        <div className={tableSettings.spacing[1]}>Artist</div>
        <div className={tableSettings.spacing[2]}>Album</div>
        <div className={tableSettings.spacing[3]}>Title</div>
        <div className={`${tableSettings.spacing[4]} text-right`}>Duration</div>
      </div>
      
      <div className='flex flex-col flex-1' ref={list}>
        {!!dimensions && 
          <List
            width={dimensions!.width}
            height={dimensions!.height}
            outerElementType={outerElementType}
            itemCount={props.trackList.tracks.length}
            itemSize={height}
          >
            {({ index, style }) => (
              <div style={style} key={props.trackList.tracks[index].id}>
                <TrackView 
                  track={props.trackList.tracks[index]} 
                  trackList={props.trackList}
                  position={index + 1}
                  tableSettings={tableSettings}
                />
              </div>
            )}
          </List>
        }
      </div>
    </div>
  )
}