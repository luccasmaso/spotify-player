import React from 'react'

export default function SkeletonView() {
  return (
    <div className='space-y-12 w-full'>
      <div className='space-y-4'>
        <div className='bg-neutral-100 rounded-full' style={{ width: "10%", height: "30px" }} />
        <div className='bg-neutral-100 rounded-full' style={{ width: "25%", height: "40px" }} />
      </div>

      <div className='space-y-8'>
        <div className='flex gap-5'>
          <div className='bg-neutral-100 rounded-full' style={{ width: "10%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "30%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "40%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "20%", height: "30px" }} />
        </div>

        <div className='flex gap-5'>
          <div className='bg-neutral-100 rounded-full' style={{ width: "10%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "30%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "40%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "20%", height: "30px" }} />
        </div>

        <div className='flex gap-5'>
          <div className='bg-neutral-100 rounded-full' style={{ width: "10%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "30%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "40%", height: "30px" }} />
          <div className='bg-neutral-100 rounded-full' style={{ width: "20%", height: "30px" }} />
        </div>
      </div>
    </div>
  )
}