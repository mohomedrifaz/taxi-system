import React from 'react'
import AutocompleteAddress from './AutocompleteAddress'
import NearbyDrivers from './DriverList';
import ToggleButton from './ToggleButton'
import Cars from './Cars';
import Cards from './Cards';
import DistanceTime from './DistanceTime';
import { useEffect, useState, useContext } from 'react';
import { DirectionDataContext } from '@/context/DirectionDataContext';

import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

import { useRouter } from 'next/navigation';


function Booking({ userlocation }) {

  const router = useRouter();

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  console.log('user details', user);

  if (!isLoaded || !userId) {
    return null;
  }

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


  const [tripDetails, setTripDetails] = useState({
    passengerName: "", // This might come from your user state if authenticated
    passengerPhone: "", // Same as above, or another input if necessary
    pickupLocation: "",
    dropoffLocation: "",
    paymentStatus: "pending", // Example default value, adjust as needed
    bookedOn: new Date().toISOString(), // Default to current timestamp, adjust as necessary
    driverId: null, // To be filled in when a driver is selected
    vehicleType: "",
    vehicleNo: "",
    totalFare: ""
  });

  useEffect(() => {
    if (user) {
      setTripDetails(prevDetails => ({
        ...prevDetails,
        passengerName: user?.username,
        passengerPhone: user?.primaryPhoneNumber?.phoneNumber,
      }));
    }
  }, [user]);

  // const [selectedCar, setSelectedCar] = useState();
  // const [directionDataA, setDirectionDataA] = useState();


  // const handleCarSelection = (carIndex, data) => {
  //   setSelectedCar(carIndex);
  //   setDirectionDataA(data);
  // };

  const [source, setSource] = useState();
  const [destination, setDestination] = useState();


  const handleSource = (selectedSource) => {
    setSource(selectedSource);
  };

  const handleDestination = (selectedSource) => {
    setDestination(selectedSource);
  };

  useEffect(() => {
    setTripDetails(prevDetails => ({
      ...prevDetails,
      pickupLocation: source,
      dropoffLocation: destination,
    }));
  }, [source, destination]);


  const [selectedDriver, setSelectedDriver] = useState(null);

  // Callback function to handle selection of driver
  const handleDriverSelection = (driverData) => {
    setSelectedDriver(driverData);
    setTripDetails(prevDetails => ({
      ...prevDetails,
      driverId: driverData.id, // Assuming driverData has an id field
      vehicleNo: driverData.vehiclePlateNumber,
      vehicleType: driverData.vehicleType
    }));
  };

  console.log('trip', tripDetails);


  // useEffect(() => {
  //   // console.log('Selected car:', selectedCar);
  //   console.log('Direction data:', directionDataA);
  //   // console.log('Seleccted driver Data:', selectedDriver);
  //   // console.log('Seleccted source:', source);
  //   // console.log('Seleccted destination:', destination);
  // }, [selectedDriver, source, destination]);

  const { directionData, setDirectionData } = useContext(DirectionDataContext);

  const [totalPrice, setTotalPrice] = useState(null);

  // Calculate price whenever directionData or tripDetails.vehicleType changes
  useEffect(() => {
    let pricePerKm;

    // Determine price per km based on vehicle type
    switch (tripDetails.vehicleType) {
      case "bike":
        pricePerKm = 60;
        break;
      case "car":
        pricePerKm = 100;
        break;
      case "threewheel":
        pricePerKm = 80;
        break;
      default:
        pricePerKm = 0;
    }

    let calculatedTotalPrice = null;

    if (directionData && directionData.routes && directionData.routes.length > 0) {
      const distanceInKm = (directionData.routes[0].distance * 0.001);
      calculatedTotalPrice = (distanceInKm * pricePerKm).toFixed(2);
    }

    // Update the state with the calculated total price
    setTotalPrice(calculatedTotalPrice);
  }, [directionData, tripDetails.vehicleType]);

  useEffect(() => {
    // Update tripDetails with the calculated total fare
    setTripDetails(prevDetails => ({
      ...prevDetails,
      totalFare: totalPrice // Assuming you've calculated totalPrice using the useEffect hook
    }));
  }, [totalPrice]);

  async function saveTrip(trip) {
    try {
      const response = await fetch("../../api/search-address/db/save", {
        method: "POST",
        body: JSON.stringify(trip),
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const responseData = await response.json();
      console.log('responseee', responseData);
      if (responseData.savedTrip.id) {
        router.push(`/trip-confirmed/tripid=${responseData.savedTrip.id}`);
      }
    } catch (error) {
      console.error("Error saving driver:", error);
    }
  }

  const handleBookClick = async () => {
    await saveTrip(tripDetails);
  };

  return (
    <div className='p-5 '>
      {/* <div>Hello, {user?.username} welcome to Clerk</div> */}
      <h2 className='text-[20px] font-semibold'>Booking</h2>
      <div className='border-[1px] p-5 
        rounded-md' >
        <div className='flex flex-col my-2'>
          <span className='font-medium pb-2'>Manual registration</span>
          <ToggleButton initialState={isBooked} onChange={handleBooking} />
        </div>

        <AutocompleteAddress onSourceSelect={handleSource} onDestinationSelect={handleDestination} />

        {/* <Cars onCarSelection={handleCarSelection} /> */}
        <NearbyDrivers userlocation={userlocation} onSelectDriver={handleDriverSelection} totalFare={totalPrice} />
        {/* <Cards /> */}
        <div className='my-2'>
          <DistanceTime totalPrice={totalPrice} />
        </div>
        <button className='w-full
         bg-yellow-400
        p-1 rounded-md
        mt-4' onClick={handleBookClick}>Book</button>

      </div>
    </div>
  )
}

export default Booking