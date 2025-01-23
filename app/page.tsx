import React from 'react'
import Home from '@/components/Home'
// import { ModeToggle } from '@/components/ThemeButton'

const Page = () => {
  return (
    <>
    <div className=' p-2'>
      <h1 className=' font-semibold text-3xl font-sans mt-2'>FindYourWork</h1>
    {/* <ModeToggle/> */}
      
      </div>
    <div className='mt-16'>
    <Home/>
    </div>
    {/* <div className='absolute top-2 right-2'>
    </div> */}
    </>
  )
}

export default Page