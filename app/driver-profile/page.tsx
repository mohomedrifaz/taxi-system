import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditDriverForm from '@/components/driver/editDriverForm';
import { Driver } from '@prisma/client';
import Link from 'next/link';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prisma";
import DriverData from '@/components/driver/driverData';

const getCurrentUser = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return;
        const currentUser = await prisma.driver.findUnique({
            where: { email: session.user.email }
        });
        if (!currentUser) return;
        return currentUser;
    } catch (e: any) {
        return;
    }
};

async function fetchDriver(dataType: string) {
    const response = await fetch('/api/search-address/db/get');
    if (!response.ok) {
        throw new Error(await response.text());
    }
    console.log('response', response);
    return response.json();
}

async function saveDriver(driver: any) {
    const response = await fetch("/api/search-address/db/save", {
        method: "POST",
        body: JSON.stringify(driver),
        headers: {
            "content-type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

async function App() {

    const user = await getCurrentUser();

    console.log('logged user', user);

    if (!user)
        return (
            <>
                <h3>You are currently not logged in!</h3>
                <Link href="/auth/login">Login to my account</Link>
            </>
        );


    return (
        <DriverData user={user} />
    );
}

export default App;
