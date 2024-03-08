import React, { useState, ChangeEvent, useEffect } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import Link from 'next/link';

const FormError = ({ errorMessage }: any) => {
    return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddDriverFormProps {
    onSubmit: any;
}

export default function EditDriverForm(props: AddDriverFormProps & { user: any }) {

    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

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
                // console.log('Location:', { latitude, longitude });
            }
            setFormData(prevData => ({
                ...prevData,
                currentLocationLat: latitude,
                currentLocationLong: longitude
            }));
        };

        const error = (error) => {
            console.log("Error retrieving location:", error);
        };

        handleLocationClick();

        // Clean-up function
        return () => {
            // You can do any clean-up here if needed
        };
    }, []);

    const [formData, setFormData] = useState({
        firstName: props.user.firstName || "",
        lastName: props.user.lastName || "",
        email: props.user.email || "",
        passwordHash: props.user.passwordHash || "",
        phoneNumber: props.user.phoneNumber || "",
        licenseNumber: props.user.licenseNumber || "",
        status: props.user.status || "available",
        currentLocationLat: props.user.currentLocationLat || 0.000,
        currentLocationLong: props.user.currentLocationLong || 0.000,
        rating: props.user.rating || 0,
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: "",
        phoneNumber: "",
        licenseNumber: "",
        status: "",
        currentLocationLat: "",
        currentLocationLong: "",
        rating: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dataWithIdAndLastLogin = {
                id: props.user.id,
                ...formData,
                lastLogin: new Date(), // Include the current date and time
            };

            console.log('datawithIdandlastlogin', dataWithIdAndLastLogin );

            const response = await fetch('../../api/search-address/db/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataWithIdAndLastLogin),
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('successfully updated driver', response);
            } else {
                // Handle errors if the request was not successful
                console.error('Failed to update driver:', response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };


    return (
        <>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="mb-3 text-black">
                    <label htmlFor="firstName" className="text-white">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-input mt-1 block w-full"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && (
                        <FormError errorMessage="First Name is required" />
                    )}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="lastName" className="text-white">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-input mt-1 block w-full"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <FormError errorMessage="Last Name is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="email" className="text-white">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input mt-1 block w-full"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <FormError errorMessage="Email is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="passwordHash" className="text-white">Password</label>
                    <input
                        type="password"
                        id="passwordHash"
                        name="passwordHash"
                        className="form-input mt-1 block w-full"
                        value={formData.passwordHash}
                        onChange={handleChange}
                    />
                    {errors.passwordHash && <FormError errorMessage="Password is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="phoneNumber" className="text-white">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="form-input mt-1 block w-full"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && <FormError errorMessage="Phone Number is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="licenseNumber" className="text-white">License Number</label>
                    <input
                        type="text"
                        id="licenseNumber"
                        name="licenseNumber"
                        className="form-input mt-1 block w-full"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                    />
                    {errors.licenseNumber && <FormError errorMessage="License Number is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="currentLocationLat" className="text-white">Current Location Latitude</label>
                    <input
                        type="text"
                        id="currentLocationLat"
                        name="currentLocationLat"
                        className="form-input mt-1 block w-full"
                        value={formData.currentLocationLat}
                        onChange={handleChange}
                    />
                    {errors.currentLocationLat && <FormError errorMessage="Current Location Latitude is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="currentLocationLong" className="text-white">Current Location Longitude</label>
                    <input
                        type="text"
                        id="currentLocationLong"
                        name="currentLocationLong"
                        className="form-input mt-1 block w-full"
                        value={formData.currentLocationLong}
                        onChange={handleChange}
                    />
                    {errors.currentLocationLong && <FormError errorMessage="Current Location Longitude is required" />}
                </div>
                <div className="mb-3 text-black">
                    <label htmlFor="status" className="text-white">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="form-select mt-1 block w-full"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                    </select>
                    {errors.status && <FormError errorMessage="Status is required" />}
                </div>
                <button
                    className="bg-blue-500 rounded-md p-4 text-blue-100"
                    type="submit"
                >
                    Confirm Edit
                </button>
            </form>
        </>

    );
}
