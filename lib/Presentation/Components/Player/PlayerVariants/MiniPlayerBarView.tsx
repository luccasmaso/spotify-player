import React from 'react'
import { motion } from 'framer-motion'

import PlayButton from '../Buttons/PlayButton'
import PauseButton from '../Buttons/PauseButton'
import LoadingButton from '../Buttons/LoadingButton'
import ErrorButton from '../Buttons/ErrorButton'

import { usePlayback } from '../Playback'
import { miniLayout, artwork, buttonFeedback  } from '../Animations'
import { usePlayer } from '../../../Hooks/PlayerHook'

export default function MiniPlayerBarView({ onOpen } : any) {

  const { player, pause } = usePlayer()
  const { playbackState, progress } = usePlayback()

  return (
    <motion.div 
      variants={miniLayout} initial="hidden" animate="visible"
      className='block md:hidden w-screen h-16 fixed left-0 bottom-0 bg-white shadow'
      onClick={onOpen}
    >
      <div className='flex-1 h-px bg-neutral-800 m-auto'>
        <div 
          className='relative -top-[2px] h-1 bg-black' 
          style={{ width: `${(playbackState === 'idle' ? 0 : progress / (player!.audioElement.duration * 1000)) * 100}%` }}
        />
      </div>

      <div className='flex items-stretch pl-2'>
        <div className='flex items-center mr-auto'>
          <div className={`shrink-0 bg-neutral-100 mr-3.5 rounded aspect-square w-12 h-12 overflow-hidden ${playbackState === 'error' && 'opacity-50 grayscale'}`}>
            <motion.div variants={artwork} initial="hidden" animate="visible" key={`${player!.currentTrack!.id}`}>
              <img src={`${player!.currentTrack!.album.images[0]?.url}`} style={{ width: '100%' }} />
            </motion.div>
          </div>

          <div>
            <div className='font-semibold line-clamp-1'>{player!.currentTrack!.name}</div> 
            <div className='text-neutral-400 line-clamp-1 text-sm'>{player!.currentTrack!.artists.map(({ name }) => name).join(", ")}</div>
          </div>
        </div>

        <div className='h-16 w-16'>
          <div 
            className='relative flex items-center justify-center w-full h-full cursor-pointer transition active:top-px'
            onClick={(event) => { event.stopPropagation(); pause(playbackState === 'playing') }}
          >
            <motion.div variants={buttonFeedback} initial="hidden" animate="visible" key={`${playbackState}`}>
              {playbackState === 'ended' && <PlayButton width={1.8} />}
              {playbackState === 'paused' && <PlayButton width={1.8} />}
              {playbackState === 'playing' && <PauseButton width={1.8} />}
              {playbackState === 'idle' && <LoadingButton width={1.8} />}
              {playbackState === 'error' && <ErrorButton width={1.8} />}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}