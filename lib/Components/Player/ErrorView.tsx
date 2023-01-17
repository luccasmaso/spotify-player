import React from 'react'
import Icon from '../../Icons/Icons'

export default function ErrorView() {
  return (
    <div className='flex items-center justify-center gap-2 text-sm'>
      <div className='relative transition flex items-center justify-center rounded-full'>
        <Icon name='exclamation' size={1.6} />
      </div>

      This track is currently unavailable
    </div>
  )
}