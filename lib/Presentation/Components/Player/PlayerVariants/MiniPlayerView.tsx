import React, { useState } from 'react'

import MiniPlayerBarView from './MiniPlayerBarView'
import MiniPlayerImmersiveView from './MiniPlayerImmersiveView'

export default function MiniPlayerView() {

  const [expanded, setExpanded] = useState(false)

  return (
    <>
      {expanded 
        ? <MiniPlayerImmersiveView onClose={() => setExpanded(false)} /> 
        : <MiniPlayerBarView onOpen={() => setExpanded(true)} />
      }
    </>
  )
}