import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'
import { buttonFeedback, artwork, immersiveLayout } from '../Animations'
import { getColorsFromImage, lightOrDark } from '../../../Helpers/ColorHelpers'
import { formatTime } from '../../../Helpers/TimeHelpers'
import ErrorView from '../ErrorView'
import { usePlayer } from '../../../Player/PlayerProvider'
import { usePlaybackState } from '../PlaybackStateProvider'
import Icon from '../../../Icons/Icons'
import Spinner from '../../../Icons/Spinner'

export default function MiniPlayerImmersiveView({ onClose }: any) {
  const { currentTrack, pause, skip } = usePlayer()
  const { status, progress, timeElapsed } = usePlaybackState()
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
      variants={immersiveLayout} initial='hidden' animate='visible'
      className={`fixed inset-0 z-20 bg-black ${brightness === 'light' ? 'text-black' : 'text-white'}`} 
      style={{ backgroundColor: color }}
    >
      <div className='flex flex-col relative h-full'>
        <div className='relative active:top-px flex justify-end m-4' onClick={onClose}>
          <div 
            role='button'
            tabIndex={0}
            className={`${brightness == 'light' ? 'bg-black/10 focus:ring-black/10' : 'bg-white/25 focus:ring-white/25'} text-sm py-2 px-4 rounded-full backdrop-blur-sm focus:outline-none focus:ring`}
          >
            Close
          </div>
        </div>
        
        <div className='relative flex-1 flex flex-col justify-center gap-5'>
          <div className={`shrink-0 bg-black/50 rounded w-48 h-48 mx-auto overflow-hidden shadow-2xl ${status === 'error' && 'opacity-50 grayscale'}`}>
            <motion.div variants={artwork} initial='hidden' animate='visible' key={`${currentTrack!.id}`}>
              <img 
                className='w-full'
                src={`${currentTrack!.album?.images ? currentTrack!.album?.images[0]!.url : null}`} 
                onLoad={(event) => setThemeColor(event.target as HTMLImageElement)}
              />
            </motion.div>
          </div>

          <div className='text-center px-6'>
            <div className='font-semibold -mb-1 line-clamp-1 text-2xl'>{currentTrack!.name}</div> 
            <div className='line-clamp-1 text-xl opacity-60'>{currentTrack!.artists?.map((artist) => artist?.name).join(', ')}</div>
          </div>
      
          {status !== 'error' && (
            <>
              <div className='flex items-center gap-4 px-4'>
                <div className='text-sm w-[50px]'>{formatTime(timeElapsed)}</div>
                <div className='flex-1 h-[2px] m-auto' style={{ backgroundColor: 'currentColor' }}>
                  <div 
                    className='relative -top-[2px] h-1' 
                    style={{ width: `${progress}%` }}
                  >
                    {status !== 'idle' && <div className='absolute w-4 h-4 rounded-full -right-1 -top-1.5' style={{ backgroundColor: 'currentColor' }} />}
                  </div>
                </div>
                <div className='text-sm w-[50px] flex justify-end'>{formatTime(currentTrack!.durationMs)}</div>
              </div>
              <div className='flex justify-center items-center gap-6 mt-5'>
                <div 
                  className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
                  onClick={() => skip('backwards')}
                >
                  <Icon name='backward' size={1.8} />
                </div>

                <div 
                  className='relative cursor-pointer transition border-2 p-3 flex items-center justify-center rounded-full hover:opacity-50 active:top-px'
                  onClick={() => pause(status === 'playing')}
                >
                  <motion.div variants={buttonFeedback} initial='hidden' animate='visible' key={`${status}`}>
                    {status === 'ended' && <Icon name='play' size={2.8} />}
                    {status === 'paused' && <Icon name='play' size={2.8} />}
                    {status === 'playing' && <Icon name='pause' size={2.8} />}
                    {status === 'idle' && <Spinner size={2.8} />}
                  </motion.div>
                </div>
                <div 
                  className='transition hover:opacity-50 relative cursor-pointer active:top-px' 
                  onClick={() => skip('forward')}
                >
                  <Icon name='forward' size={1.8} />
                </div>
              </div>
            </>
          )}

          {status === 'error' && <ErrorView />}
        </div>
      </div>
    </Dialog>
  )
}