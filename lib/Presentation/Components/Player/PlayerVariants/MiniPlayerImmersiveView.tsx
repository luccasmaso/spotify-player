import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'

import PlayButton from '../Buttons/PlayButton'
import PauseButton from '../Buttons/PauseButton'
import LoadingButton from '../Buttons/LoadingButton'

import { usePlayback } from '../Playback'
import { buttonFeedback, artwork, immersiveLayout } from '../Animations'
import { usePlayer } from '../../../Hooks/PlayerHook'
import { getColorsFromImage, lightOrDark } from '../../../Helpers/ColorHelpers'
import { formatTime } from '../../../Helpers/TimeHelpers'
import BackwardsButton from '../Buttons/BackwardsButton'
import ForwardButton from './../Buttons/ForwardButton'
import ErrorView from '../ErrorView'

export default function MiniPlayerImmersiveView({ onClose } : any) {

  const { player, pause, skipBackwards, skipForward } = usePlayer()
  const { playbackState, progress, timeElapsed } = usePlayback()
  const [color, setColor] = useState<string>()

  async function setThemeColor(element: HTMLImageElement) {
    const color = await getColorsFromImage(element)
    setColor(color)
  }

  const brightness = useMemo(() => !!color && lightOrDark(color), [color])

  return (
    <Dialog 
      static
      as={motion.div}
      open={true} 
      onClose={onClose}
      variants={immersiveLayout} initial="hidden" animate="visible"
      className={`fixed inset-0 z-20 bg-black ${brightness === 'light' ? 'text-black' : 'text-white'}`} 
      style={{ backgroundColor: color }}
    >
      <div className='flex flex-col relative h-full'>
        <div className='relative active:top-px flex justify-end m-4' onClick={onClose}>
          <div className={`${brightness == 'light' ? 'bg-black/10' : 'bg-white/25'} text-sm  py-2 px-4 rounded-full backdrop-blur-sm`}>
            Close
          </div>
        </div>
        
        <div className='relative flex-1 flex flex-col justify-center gap-5'>
          <div className={`shrink-0 bg-black rounded w-48 h-48 mx-auto overflow-hidden shadow-2xl ${playbackState === 'error' && 'opacity-50 grayscale'}`}>
            <motion.div variants={artwork} initial="hidden" animate="visible" key={`${player!.currentTrack!.id}`}>
              <img 
                src={`${player!.currentTrack!.album.images[0]?.url}`} 
                style={{ width: '100%' }}
                onLoad={(event) => setThemeColor(event.target as HTMLImageElement)}
              />
            </motion.div>
          </div>

          <div className='text-center px-6'>
            <div className='font-semibold -mb-1 line-clamp-1 text-2xl'>{player!.currentTrack!.name}</div> 
            <div className='line-clamp-1 text-xl opacity-60'>{player!.currentTrack!.artists.map(({ name }) => name).join(", ")}</div>
          </div>
      
          {playbackState !== 'error' && (
            <>
              <div className='flex items-center gap-4 px-4'>
                <div className='text-sm'>{formatTime(timeElapsed)}</div>
                <div className='flex-1 h-[2px] m-auto' style={{ backgroundColor: 'currentColor' }}>
                  <div 
                    className='relative -top-[2px] h-1' 
                    style={{ width: `${(playbackState === 'idle' ? 0 : progress / (player!.audioElement.duration * 1000)) * 100}%` }}
                  >
                    {playbackState !== 'idle' && <div className='absolute w-4 h-4 rounded-full -right-1 -top-1.5' style={{ backgroundColor: 'currentColor' }} />}
                  </div>
                </div>
                <div className='text-sm'>{formatTime(player!.audioElement.duration * 1000)}</div>
              </div>
              <div className='flex justify-center items-center gap-6 mt-5'>
                <div 
                  className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
                  onClick={() => skipBackwards()}
                >
                  <BackwardsButton width={1.8} />
                </div>

                <div 
                  className='relative cursor-pointer transition border-2 p-3 flex items-center justify-center rounded-full hover:opacity-50 active:top-px'
                  onClick={() => pause(playbackState === 'playing')}
                >
                  <motion.div variants={buttonFeedback} initial="hidden" animate="visible" key={`${playbackState}`}>
                    {playbackState === 'ended' && <PlayButton width={2.8} />}
                    {playbackState === 'paused' && <PlayButton width={2.8} />}
                    {playbackState === 'playing' && <PauseButton width={2.8} />}
                    {playbackState === 'idle' && <LoadingButton width={2.8} />}
                  </motion.div>
                </div>
                <div 
                  className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
                  onClick={() => skipForward()}
                >
                  <ForwardButton width={1.8} />
                </div>
              </div>
            </>
          )}

          {playbackState === 'error' && <ErrorView />}
        </div>
      </div>
    </Dialog>
  )
}