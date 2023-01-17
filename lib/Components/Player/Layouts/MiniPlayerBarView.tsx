import React from 'react'
import { motion } from 'framer-motion'
import { usePlayer } from '../../../Player/PlayerProvider'
import { miniLayout, artwork, buttonFeedback  } from '../Animations'
import { usePlaybackState } from '../PlaybackStateProvider'
import Icon from '../../../Icons/Icons'
import Spinner from '../../../Icons/Spinner'

export default function MiniPlayerBarView({ onOpen }: any) {
  const { pause, currentTrack } = usePlayer()
  const { status, progress } = usePlaybackState()

  return (
    <motion.div 
      variants={miniLayout} initial='hidden' animate='visible'
      className='block md:hidden cursor-pointer w-screen h-16 fixed left-0 bottom-0 bg-white dark:bg-black shadow'
      onClick={onOpen}
    >
      <div className='flex-1 h-px bg-neutral-800 dark:bg-neutral-100 m-auto'>
        <div 
          className='relative -top-[2px] h-1 bg-black dark:bg-white' 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className='flex items-stretch pl-2'>
        <div className='flex items-center mr-auto'>
          <div className={`shrink-0 bg-neutral-100 dark:bg-neutral-800 mr-3.5 rounded aspect-square w-12 h-12 overflow-hidden ${status === 'error' && 'opacity-50 grayscale'}`}>
            <motion.div variants={artwork} initial='hidden' animate='visible' key={`${currentTrack!.id}`}>
              <img 
                className='w-full'
                src={`${currentTrack!.album?.images ? currentTrack!.album?.images[0]!.url : null}`}
              />
            </motion.div>
          </div>

          <div>
            <div className='font-semibold line-clamp-1'>{currentTrack!.name}</div> 
            <div className='text-neutral-400 line-clamp-1 text-sm'>{currentTrack!.artists?.map(({ name }: any) => name).join(', ')}</div>
          </div>
        </div>

        <div className='h-16 w-16 flex-shrink-0'>
          <div 
            className='relative flex items-center justify-center w-full h-full cursor-pointer transition active:top-px'
            onClick={(event) => { 
              event.stopPropagation() 
              pause(status === 'playing') 
            }}
          >
            <motion.div variants={buttonFeedback} initial='hidden' animate='visible' key={`${status}`}>
              {status === 'ended' && <Icon name='play' size={1.8} />}
              {status === 'paused' && <Icon name='play' size={1.8} />}
              {status === 'playing' && <Icon name='pause' size={1.8} />}
              {status === 'idle' && <Spinner size={1.8} />}
              {status === 'error' && <Icon name='exclamation' size={1.8} />}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}