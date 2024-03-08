"use client"

import React, { useState, useEffect } from 'react';
import EditDriverForm from '@/components/driver/editDriverForm';

function DriverData({ user }) {

    const [drivers, setDrivers] = useState([]);
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const initialDrivers = await fetchDriver();
        //         console.log("initialDrivers", initialDrivers);
        //         setDrivers(initialDrivers.driver);
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // }
        // fetchData();
    }, []);

    useEffect(() => {
        const handleLocationClick = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                console.log("Geolocation not supported");
            }
        };

        const success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            if (latitude !== location.latitude || longitude !== location.longitude) {
                setLocation({ latitude, longitude });
                console.log('Location:', { latitude, longitude });
            }
        };

        const error = (error) => {
            console.log("Error retrieving location:", error);
        };

        handleLocationClick();
        return () => {
            
        };
    }, []);



    return (
        <div>
            <div className="flex bg-blue-500">
                <section className="w-1/3 bg-gray-800 h-screen p-8">
                    <div className="mb-3">
                        <h2 className="text-3xl text-white">Edit Driver</h2>
                    </div>
                    <EditDriverForm
                        onSubmit={async (data, e) => {
                            try {
                                await saveDriver(data);
                                setDrivers([...(drivers ?? []), data]);
                                e.target.reset();
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                        user={user}
                    />
                </section>
                <section className="w-2/3 h-screen p-8">
                    <div className="mb-8">
                        <h2 className="text-3xl text-gray-700">Driver Details</h2>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-6 m-2">
                        <div className="flex flex-col items-center mb-4">
                            <img
                                className="h-16 w-16 rounded-full mb-4"
                                src={user.avatar}
                                alt={`Avatar of ${user.firstName}`}
                            />
                            <h2 className="text-lg text-gray-900 font-bold">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-gray-700">{user.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <h3 className="text-lg font-bold mb-2">Additional Details:</h3>
                            </div>
                            <div>
                                <p className="text-gray-700">Phone: {user.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">License Number: {user.licenseNumber}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Status: {user.status}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Location: Lat {user.currentLocationLat}, Long {user.currentLocationLong}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Rating: {user.rating || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Registered On: {new Date(user.registeredOn).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Status: {user.status || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Current Latitude: {location.latitude || '0'}</p>
                            </div>
                            <div>
                                <p className="text-gray-700">Current Longitude: {location.longitude || '0'}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DriverData;