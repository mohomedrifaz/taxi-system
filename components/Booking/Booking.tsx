import React from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import Cars from './Cars';
import Cards from './Cards';
import DistanceTime from './DistanceTime';
import { useEffect, useState } from 'react';


function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newScreenHeight = window.innerHeight * 0.72;
      setScreenHeight(newScreenHeight);
    }
  }, []);

  return (
    <div className='p-5 '>
        <h2 className='text-[20px] font-semibold'>Booking - Theekshana Git Test</h2>
        <div className='border-[1px] p-5 
        rounded-md' >
        <AutocompleteAddress/>
       
        <Cars/>
        <Cards/>
        <button className='w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4'>Book</button>
        
        </div> 
    </div>
  )
}

export default Booking