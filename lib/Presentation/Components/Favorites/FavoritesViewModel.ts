import { useEffect, useState } from 'react'

import { useTrack } from '../../Hooks/TrackHook'

export function useQuery() {
  const track = useTrack()

  const [loading, setLoading] = useState<'none'|'loading'|'loaded'>('none')
  const [error, setError] = useState<boolean>()
  
  useEffect(() => { fetchTracklist() }, [])

  async function fetchTracklist() {
    try {
      setLoading('loading')
      await track.getLikeTracks()
    } catch {
      setError(true)
    } finally {
      setLoading('loaded')
    }
  }

  return {
    likedTracks: track.likedTracks, loading, error
  }
}