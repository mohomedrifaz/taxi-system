import React from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import NearbyDrivers from './DriverList';
import ToggleButton from './ToggleButton'
import Cars from './Cars';
import Cards from './Cards';
import DistanceTime from './DistanceTime';
import { useEffect, useState } from 'react';


function Booking() {
  const [screenHeight, setScreenHeight] = useState(0);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newScreenHeight = window.innerHeight * 0.72;
      setScreenHeight(newScreenHeight);
    }
  }, []);

  const handleBooking = () => {
    setIsBooked(!isBooked);
    console.log(`Booking status: ${!isBooked ? 'Booked' : 'Cancelled'}`);
  };


  return (
    <div className='p-5 '>
      <h2 className='text-[20px] font-semibold'>Booking - Git Test</h2>
      <div className='border-[1px] p-5 
        rounded-md' >
        <div className='flex flex-col my-2'>
          <span className='font-medium pb-2'>Manual registration</span>
          <ToggleButton initialState={isBooked} onChange={handleBooking} />
        </div>

        <AutocompleteAddress />

        <Cars />
        <NearbyDrivers vehicleType="Mini" />
        <Cards />
        <button className='w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4'>Book</button>

      </div>
    </div>
  )
}

export default Booking