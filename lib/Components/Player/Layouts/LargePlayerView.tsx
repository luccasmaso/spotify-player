import React from 'react'
import { motion } from 'framer-motion'
import { artwork, buttonFeedback } from '../Animations'
import { usePlayer } from '../../../Player/PlayerProvider'
import { formatTime } from '../../../Helpers/TimeHelpers'
import ErrorView from '../ErrorView'
import { usePlaybackState } from '../PlaybackStateProvider'
import Icon from '../../../Icons/Icons'
import Spinner from '../../../Icons/Spinner'

export default function LargePlayerView() {
  const { currentTrack, pause, skip } = usePlayer()
  const { status, progress, timeElapsed } = usePlaybackState()

  return (
    <div className='hidden md:block fixed pointer-events-none	w-screen left-0 bottom-8'>
      <div className='w-[645px] max-w-screen-sm m-auto pointer-events-auto flex bg-white dark:bg-black p-4 border rounded shadow select-none'>
        <div className={`bg-neutral-100 dark:bg-neutral-800 mr-6 rounded aspect-square w-44 h-44 overflow-hidden ${status === 'error' && 'opacity-50 grayscale'}`}>
          <motion.div variants={artwork} initial='hidden' animate='visible' key={`${currentTrack!.id}`}>
            <img 
              className='w-full'
              src={`${currentTrack!.album?.images ? currentTrack!.album?.images[0]!.url : null}`} 
            />
          </motion.div>
        </div>
      
        <div className='flex flex-col flex-1 gap-2'>
          <div className='mb-2 text-center'>
            <div className='font-semibold text-lg -mb-0.5 line-clamp-1' data-cy='track'>{currentTrack!.name}</div> 
            <div className='text-neutral-400 line-clamp-1'>{currentTrack!.artists?.map((artist) => artist?.name).join(', ')}</div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-sm w-[50px]'>{formatTime(timeElapsed)}</div>
            <div className='flex-1 h-px bg-neutral-800 dark:bg-neutral-100 m-auto'>
              <div 
                className='relative -top-[2px] h-1 bg-black dark:bg-white' 
                style={{ width: `${progress}%` }}
              >
                {status !== 'idle' && <div className='absolute w-5 h-5 rounded-full -right-1 bg-black dark:bg-white -top-2 border-white dark:border-black border-4' />}
              </div>
            </div>
            <div className='text-sm w-[50px] flex justify-end'>{formatTime(currentTrack!.durationMs)}</div>
          </div>
          
          
          <div className='relative flex flex-1 justify-center items-center gap-4'>
            {status === 'error' && <div className='absolute inset-0 flex justify-center items-center bg-white dark:bg-black z-10'><ErrorView /></div>}

            <div 
              className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
              onClick={() => skip('backwards')}
              data-cy='skip-backwards'
            >
              <Icon name='backward' size={1.6} />
            </div>

            <div 
              className='relative cursor-pointer transition border p-3 flex items-center justify-center rounded-full hover:bg-black hover:border-black dark:hover:bg-white dark:hover:border-white hover:text-white dark:hover:text-black active:top-px'
              onClick={() => pause(status === 'playing')}
              data-cy='play-pause'
            >
              <motion.div variants={buttonFeedback} initial='hidden' animate='visible' key={`${status}`}>
                {status === 'error' && <Icon name='play' size={2} />}
                {status === 'ended' && <Icon name='play' size={2} />}
                {status === 'paused' && <Icon name='play' size={2} />}
                {status === 'playing' && <Icon name='pause' size={2} />}
                {status === 'idle' && <Spinner size={2} />}
              </motion.div>
            </div>
            
            <div 
              className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
              onClick={() => skip('forward')}
              data-cy='skip-forward'
            >
              <Icon name='forward' size={1.6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}