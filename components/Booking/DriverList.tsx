import React, { useState, useEffect, useContext } from 'react';
import { Driver } from '@prisma/client';
import { DirectionDataContext } from '@/context/DirectionDataContext';

const NearbyDrivers = ({ userlocation, onSelectDriver, totalFare }) => {
    const [drivers, setDrivers] = useState<Driver[]>([]);

    async function fetchDriver(dataType: string) {
        const response = await fetch('/api/search-address/db/get');
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const initaldriver = await fetchDriver('driver');
                // console.log("initialContacts", initaldriver);
                setDrivers(initaldriver.driver);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    // State to track selected driver
    const [selectedDriver, setSelectedDriver] = useState(null);

    // Function to handle selecting a driver
    const handleSelectDriver = (driver) => {
        setSelectedDriver(driver);
        onSelectDriver(driver);
        // console.log('Selected Driver:', driver);
    };

    // console.log('userlocation', userlocation);

    const MAX_RADIUS_KM = 5;

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    }

    const nearbyDrivers = drivers.filter(driver => {
        const distance = calculateDistance(userlocation?.lat, userlocation?.lng, driver?.currentLocationLat, driver?.currentLocationLong);
        return distance <= MAX_RADIUS_KM;
    });

    
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const calculatePrice = (vehicle) => {
    let pricePerKm;

    // Determine price per km based on vehicle type
    switch (vehicle) {
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
    if (directionData && directionData.routes && directionData.routes.length > 0) {
      const distanceInKm = (directionData?.routes[0]?.distance * 0.001);
      const totalPrice = (distanceInKm * pricePerKm).toFixed(2);
      return totalPrice;
    }
    return 0;
  };

    // console.log('nearbydriver', nearbyDrivers);

    return (
        <div className="my-4">
            <h3 className="font-semibold text-lg mb-2">Nearby Drivers</h3>
            {nearbyDrivers
                .filter((driver) => driver.status === 'available')
                .map((driver) => (
                    <div key={driver.id} className="flex justify-between items-center border-b py-2">
                        <span>{driver.firstName}</span>
                        <span>{driver.vehicleType}</span>
                        <span>{calculatePrice(driver.vehicleType)}</span>
                        <button
                            onClick={() => handleSelectDriver(driver)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md"
                        >
                            Select Driver
                        </button>
                    </div>
                ))}
            {selectedDriver && (
                <div className="mt-4">
                    <h4 className="font-semibold">Selected Driver:</h4>
                    <p className="py-1">Name: {selectedDriver?.firstName}</p>
                    <p className="py-1">Vehicle: {selectedDriver?.vehicle}</p>
                    <p className="py-1">Rating: {selectedDriver?.rating}</p>
                    <p className="py-1">Vehicle Type: {selectedDriver?.vehicleType}</p>
                    <p className="py-1">Vehicle Number: {selectedDriver?.vehiclePlateNumber}</p>
                </div>
            )}
        </div>
    );
};

export default NearbyDrivers;
