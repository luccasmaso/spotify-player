import React from 'react'

export default function PauseButton(props: { width : number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" width={`${props.width}rem`} height={`${props.width}rem`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
    </svg>
  )
}
