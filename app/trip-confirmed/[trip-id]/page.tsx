"use client"

import React from "react";
import { useSearchParams } from "next/navigation";

function tripID() {

    // const router = useRouter();
    // const { tripId } = router.query;
    const searchParams = useSearchParams()
    const tripId = searchParams.get('tripid')

    return (
        <>
            <h1>Trip Confirmation</h1>
            <p>Trip ID: {tripId}</p>
        </>
    )
}

export default tripID