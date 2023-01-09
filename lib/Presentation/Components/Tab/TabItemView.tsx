import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TabItemView(props : any) {
  const router = useRouter()

  const style = router.pathname === props.route || router.pathname === props.reference
    ? 'border-black bg-black text-white active:bg-neutral-500 focus:bg-black focus:outline-none focus:ring focus:ring-neutral-300' 
    : 'active:bg-neutral-500 active:text-white focus:bg-neutral-50 focus:outline-none focus:ring focus:ring-neutral-300'

  return (
    <Link 
      className={`cursor-pointer flex-1 text-center whitespace-nowrap border rounded-none py-2 px-3 ${style}`} 
      href={props.route}
    >
      {props.name}
    </Link>
  )
}