import { useEffect, useState } from 'react'

import { usePlaylist } from '../../Hooks/PlaylistHook'

const QUERY = `
  query {
    playlist {
      id
      name
      tracks {
        added_at
        track {
          id
          preview_url
          duration_ms
          name
          album { name images { url } }
          artists { name }
        }
      }
    } 
  }
`

export function useQuery() {
  const playlist = usePlaylist()

  const [loading, setLoading] = useState<'none'|'loading'|'loaded'>('none')
  const [error, setError] = useState<boolean>()
  
  useEffect(() => { fetchTracklist() }, [])

  async function fetchTracklist() {
    try {
      setLoading('loading')
      await playlist.fetchAndRefreshPlaylist(QUERY)
    } catch {
      setError(true)
    } finally {
      setLoading('loaded')
    }
  }

  return {
    playlist: playlist.playlist, loading, error: error && playlist.playlist
  }
}