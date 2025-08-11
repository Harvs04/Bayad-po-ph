import { useState } from 'react'
import Navbar from './../components/Navbar'

function Landing() {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-4'>
      <Navbar />
      <main className='w-2/3'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-2'>
          <div className='flex flex-col text-center text-5xl md:text-7xl font-bold'>
            <span className='text-[#4D4D4D]'>Manage your fares</span>
            <span className='text-[#4CAF4F]'>Anytime, Anywhere</span>
          </div>
          <img src="./src/assets/jeep-tricy.png" alt="landing illustration" className='w-full md:w-7/12' />
        </div>
      </main>
      <div className='bg-[#4CAF4F] w-full text-center'>
        Hello World
      </div>
    </div>
  )
}

export default Landing;
