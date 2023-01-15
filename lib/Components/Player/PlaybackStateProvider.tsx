import { useContext, createContext, useEffect, useState } from 'react'

type StatusType = 'playing'|'ended'|'paused'|'idle'|'error'
type ContextType = { status: StatusType, progress: number, timeElapsed: number }

export const Context = createContext<ContextType>({ status: 'idle', progress: 0, timeElapsed: 0 })

export function PlaybackStateProvider(props: { children: JSX.Element[], audio: HTMLAudioElement }) {
  const [progress, setProgress] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [status, setStatus] = useState<StatusType>('idle')

  const tearDown = () => {
    props.audio.onplay = null
    props.audio.onended = null
    props.audio.ontimeupdate = null
    props.audio.onerror = null
    props.audio.onpause = null
  }

  useEffect(() => {
    props.audio.onpause = () => setStatus('paused')
    props.audio.onerror = () => setStatus('error')
    props.audio.ontimeupdate = () => {
      const currentTime = (props.audio.currentTime * 1000)

      setTimeElapsed(currentTime)
      setProgress((currentTime / (props.audio.duration * 1000)) * 100)
    }

    props.audio.onended = () => {
      const currentTime = (props.audio.currentTime * 1000)

      setStatus('ended')
      setTimeElapsed(currentTime)
      setProgress(100)
    }

    props.audio.onplay = () => {
      if (status !== 'paused') {
        setStatus('idle')
        setTimeElapsed(0)
        setProgress(0)
      }
    }

    props.audio.onplaying = () => setStatus('playing')
    return () => tearDown()
  }, [props.audio])
  
  useEffect(() => {
    return () => tearDown()
  }, [])
  
  return (
    <Context.Provider value={{ status, progress, timeElapsed }}>
      {props.children}
    </Context.Provider>
  )
}

export const usePlaybackState = () => useContext(Context)
