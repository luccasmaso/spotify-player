import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TabItemView(props: any) {
  const router = useRouter()

  const style = router.pathname === props.route
    ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black active:bg-neutral-500 focus:bg-black dark:focus:bg-white focus:outline-none focus:ring focus:ring-neutral-300 dark:focus:ring-neutral-600' 
    : 'active:bg-neutral-500 active:text-white dark:active:text-black dark:focus:text-black focus:bg-neutral-50 focus:outline-none focus:ring focus:ring-neutral-300'

  return (
    <Link 
      className={`cursor-pointer flex-1 text-center whitespace-nowrap border rounded-none py-2 px-3 ${style}`} 
      href={props.route}
    >
      {props.name}
    </Link>
  )
}