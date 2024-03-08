"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Trip } from '@prisma/client';

function tripConfirm() {

    const searchParams = useSearchParams()
    const tripId = searchParams.get('tripid')

    const [trips, setTrips] = useState<Trip[]>([]);

    async function fetchTrip(bodyData: any) {
        const response = await fetch('../api/search-address/db/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tripId: bodyData })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tripData = await fetchTrip(tripId);
                setTrips(tripData.trip);
                console.log('Trip data:', tripData);
            } catch (error) {
                console.error('Error fetching trip:', error);
            }
        }

        fetchData();

    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-8">Trip Confirmation</h1>
            {trips ? (
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col space-y-4">
                        <p className="font-semibold">Passenger Name:</p>
                        <p>{trips.passengerName}</p>
                        <p className="font-semibold">Passenger Phone:</p>
                        <p>{trips.passengerPhone}</p>
                        <p className="font-semibold">Pickup Location:</p>
                        <p>{trips.pickupLocation}</p>
                        <p className="font-semibold">Dropoff Location:</p>
                        <p>{trips.dropoffLocation}</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <p className="font-semibold">Booking Time:</p>
                        <p>{new Date(trips.bookedOn).toLocaleString()}</p>
                        <p className="font-semibold">Driver ID:</p>
                        <p>{trips.driverId}</p>
                        <p className="font-semibold">Payment Status:</p>
                        <p>{trips.paymentStatus}</p>
                        <p className="font-semibold">Vehicle Type:</p>
                        <p>{trips.vehicleType}</p>
                        <p className="font-semibold">Vehicle Number:</p>
                        <p>{trips.vehicleNo}</p>
                        <p className="font-semibold">Total Fare:</p>
                        <p>{trips.totalFare}</p>
                    </div>
                </div>
            ) : (
                <p>Loading trip details...</p>
            )}
        </div>

    )
}

export default tripConfirm