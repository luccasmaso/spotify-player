import React from 'react'
import { motion } from 'framer-motion'

import PlayButton from '../Buttons/PlayButton'
import PauseButton from '../Buttons/PauseButton'
import LoadingButton from '../Buttons/LoadingButton'
import ForwardButton from '../Buttons/ForwardButton'
import BackwardsButton from '../Buttons/BackwardsButton'

import { artwork, buttonFeedback } from '../Animations'
import { usePlayback } from '../Playback'
import { formatTime } from '../../../Helpers/TimeHelpers'
import { usePlayer } from '../../../Hooks/PlayerHook'
import ErrorView from '../ErrorView'

export default function LargePlayerView() {

  const { player, pause, skipBackwards, skipForward } = usePlayer()
  const { playbackState, progress, timeElapsed } = usePlayback()

  return (
    <div className='hidden md:block fixed pointer-events-none	w-screen left-0 bottom-8'>
      <div className='w-[645px] max-w-screen-sm m-auto pointer-events-auto flex bg-white dark:bg-black p-4 border rounded shadow'>
        <div className={`hidden md:block bg-neutral-100 mr-6 rounded aspect-square w-44 h-44 overflow-hidden ${playbackState === 'error' && 'opacity-50 grayscale'}`}>
          <motion.div variants={artwork} initial="hidden" animate="visible" key={`${player!.currentTrack!.id}`}>
            <img src={`${player!.currentTrack!.album.images[0]?.url}`} style={{ width: '100%' }} />
          </motion.div>
        </div>
      
        <div className='flex flex-col flex-1 gap-2'>
          <div className='mb-2 text-center'>
            <div className='font-semibold text-lg -mb-0.5 line-clamp-1' data-cy="track">{player!.currentTrack!.name}</div> 
            <div className='text-neutral-400 line-clamp-1'>{player!.currentTrack!.artists.map(({ name }) => name).join(", ")}</div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='text-sm w-[50px]'>{formatTime(timeElapsed)}</div>
            <div className='flex-1 h-px bg-neutral-800 dark:bg-neutral-100 m-auto'>
              <div 
                className='relative -top-[2px] h-1 bg-black dark:bg-white' 
                style={{ width: `${(playbackState === 'idle' ? 0 : progress / (player!.audioElement.duration * 1000)) * 100}%` }}
              >
                {playbackState !== 'idle' && <div className='absolute w-5 h-5 rounded-full -right-1 bg-black dark:bg-white -top-2 border-white dark:border-black border-4' />}
              </div>
            </div>
            <div className='text-sm w-[50px] flex justify-end'>{formatTime(player!.audioElement.duration * 1000)}</div>
          </div>
          
          {playbackState !== 'error' && (
            <div className='flex flex-1 justify-center items-center gap-4'>
              <div 
                className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
                onClick={() => skipBackwards()}
                data-cy="skip-backwards"
              >
                <BackwardsButton width={1.6} />
              </div>

              <div 
                className='relative cursor-pointer transition border p-3 flex items-center justify-center rounded-full hover:bg-black hover:border-black dark:hover:bg-white dark:hover:border-white hover:text-black active:top-px'
                onClick={() => pause(playbackState === 'playing')}
                data-cy="play-pause"
              >
                <motion.div variants={buttonFeedback} initial="hidden" animate="visible" key={`${playbackState}`}>
                  {playbackState === 'ended' && <PlayButton width={2} />}
                  {playbackState === 'paused' && <PlayButton width={2} />}
                  {playbackState === 'playing' && <PauseButton width={2} />}
                  {playbackState === 'idle' && <LoadingButton width={2} />}
                </motion.div>
              </div>
              <div 
                className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
                onClick={() => skipForward()}
                data-cy="skip-forward"
              >
                <ForwardButton width={1.6} />
              </div>
            </div>
          )}

          {playbackState === 'error' && <div className='flex justify-center flex-1'><ErrorView /></div>}
        </div>
      </div>
    </div>
  )
}