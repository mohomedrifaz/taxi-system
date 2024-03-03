import React, { useState } from 'react';

const NearbyDrivers = ({ vehicleType }) => {
    // Dummy data for nearby drivers
    const [drivers, setDrivers] = useState([
        { id: 1, name: 'John Doe', vehicle: 'Mini', available: true },
        { id: 2, name: 'Jane Smith', vehicle: 'VIP', available: true },
        { id: 3, name: 'Bob Johnson', vehicle: 'Mini', available: true },
    ]);

    // State to track selected driver
    const [selectedDriver, setSelectedDriver] = useState(null);

    // Function to handle selecting a driver
    const handleSelectDriver = (driver) => {
        setSelectedDriver(driver);
        console.log('Selected Driver:', driver);
    };

    return (
        <div className="my-4">
            <h3 className="font-semibold text-lg mb-2">Nearby Drivers</h3>
            {drivers
                .filter((driver) => driver.vehicle === vehicleType && driver.available)
                .map((driver) => (
                    <div key={driver.id} className="flex justify-between items-center border-b py-2">
                        <span>{driver.name}</span>
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
                    <p>Name: {selectedDriver.name}</p>
                    <p>Vehicle: {selectedDriver.vehicle}</p>
                </div>
            )}
        </div>
    );
};

export default NearbyDrivers;
