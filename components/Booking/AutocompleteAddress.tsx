import { DestinationCordiContext } from '@/context/DestinationCordiContext'
import { SourceCordiContext } from '@/context/SourceCordiContext'
import React, { useContext, useEffect, useState } from 'react'
import { AddressAutofill } from '@mapbox/search-js-react';

const session_token = '5ccce4a4-ab0a-4a7c-943d-580e55542363'
const MAPBOX_RETRIVE_URL = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'
const MAPBOX_SUGGEST_URL = 'https://api.mapbox.com/search/searchbox/v1/suggest/'
function AutocompleteAddress() {

    const [source, setSource] = useState<any>()
    const [sourceChange, setSourceChange] = useState<any>(false)
    const [destinationChange, setDestinationChange] = useState<any>(false)

    const { soruceCordinates, setSourceCordinates } = useContext(SourceCordiContext);
    const { destinationCordinates, setDestinationCordinates }
        = useContext(DestinationCordiContext);

    const [addressList, setAddressList] = useState<any>([]);
    const [destination, setDistination] = useState<any>()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getAddressList()
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [source, destination]);


    const getAddressList = async () => {
        setAddressList([]);
        const query = sourceChange ? source : destination;
        const sriLankaCenterCoordinates = "79.6952,5.9684,81.8750,9.8241";
        // const res = await fetch(
        //     `/api/search-address?q=${query}&country=LKA&limit=10&bbox=${sriLankaCenterCoordinates}`,
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     }
        // );

        const staticRes2 = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&access_token=pk.eyJ1Ijoic2hhZGVlciIsImEiOiJjbHJmeGV0ZWUwOGlwMmlvNjQzMGwwMzk4In0.a2oaT3-DeIvObA60H9Zo9g&session_token=facd2f7f-7922-4f6c-9524-af0ff3a6ce9e&language=en&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory&bbox=${sriLankaCenterCoordinates}`
        );

        const result = await staticRes2.json();
        console.log({ result });
        setAddressList(result)



        const staticRes = await fetch(
            `https://api.mapbox.com/search/searchbox/v1/suggest?q=kotikawatte?language=en&limit=10&session_token=${session_token}&bbox=${sriLankaCenterCoordinates}&country=LKA&access_token=pk.eyJ1Ijoic2hhZGVlciIsImEiOiJjbHJmeGV0ZWUwOGlwMmlvNjQzMGwwMzk4In0.a2oaT3-DeIvObA60H9Zo9g`
        );
        // const staticRes2 = await fetch(
        //     `https://api.mapbox.com/search/searchbox/v1/suggest?q=kotikawatt&access_token=pk.eyJ1Ijoic2hhZGVlciIsImEiOiJjbHJmeGV0ZWUwOGlwMmlvNjQzMGwwMzk4In0.a2oaT3-DeIvObA60H9Zo9g&session_token=facd2f7f-7922-4f6c-9524-af0ff3a6ce9e&language=en&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory&bbox=${sriLankaCenterCoordinates}`
        // );
        // const staticResult = await staticRes2.json();
        // console.log("Static Request Result:", staticResult);
    }

    const onSourceAddressClick = async (item: any) => {
        console.log({item});
        setSource(item.full_address);
        setAddressList([]); setSourceChange(false)
        const res = await fetch(MAPBOX_RETRIVE_URL + item.mapbox_id
            + "?session_token=" + session_token
            + "&access_token=pk.eyJ1Ijoic2hhZGVlciIsImEiOiJjbHJmeGV0ZWUwOGlwMmlvNjQzMGwwMzk4In0.a2oaT3-DeIvObA60H9Zo9g")

        const result = await res.json();
        console.log('result after click', result);

        setSourceCordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1],
        })
        console.log(result);
    }

    const onDestinationAddressClick = async (item: any) => {
        setDistination(item.full_address);
        setAddressList([]);
        setDestinationChange(false)
        const res = await fetch(MAPBOX_RETRIVE_URL + item.mapbox_id
            + "?session_token=" + session_token
            + "&access_token=pk.eyJ1Ijoic2hhZGVlciIsImEiOiJjbHJmeGV0ZWUwOGlwMmlvNjQzMGwwMzk4In0.a2oaT3-DeIvObA60H9Zo9g")

        const result = await res.json();

        setDestinationCordinates({
            lng: result.features[0].geometry.coordinates[0],
            lat: result.features[0].geometry.coordinates[1],
        })
        console.log(result);
    }

    return (
        <>
            <div className=''>

                <div className='relative'>
                    <label className='text-gray-400 text-[13px]'>Where From?</label>
                    <input type="text"
                        className='bg-white p-1
                text-gray-950
                border-[1px] w-full 
                rounded-md outline-none
                focus:border-yellow-300 text-[14px]'
                        value={source}
                        onChange={(e) => {
                            setSource(e.target.value);
                            setSourceChange(true)
                        }}
                    />

                    {addressList?.suggestions && sourceChange ?
                        <div className='shadow-md p-1 rounded-md
                            absolute w-full bg-white z-20'>
                            {addressList?.suggestions.map((item: any, index: number) => (
                                <h2 key={index} className='p-3 
                            hover:bg-gray-100
                            text-gray-800
                            cursor-pointer'
                                    onClick={() => { onSourceAddressClick(item) }}
                                >{item.name}</h2>
                            ))}
                        </div> : null}
                </div>
                <div className='relative'>
                    <label className='text-gray-400 text-[13px]'>Where To?</label>
                    <input type="text"
                        className='bg-white p-1 
                text-gray-950
                border-[1px] w-full 
                rounded-md outline-none
                focus:border-yellow-300 text-[14px]'
                        value={destination}
                        onChange={(e) => { setDistination(e.target.value); setDestinationChange(true) }}
                    />

                    {addressList?.suggestions && destinationChange ?
                        <div className='shadow-md p-1 rounded-md
            text-gray-800
            absolute w-full bg-white'>
                            {addressList?.suggestions.map((item: any, index: number) => (
                                <h2 key={index} className='p-3 hover:bg-gray-100
                cursor-pointer'
                                    onClick={() => {
                                        onDestinationAddressClick(item)
                                    }}
                                >{item.name}</h2>
                            ))}
                        </div> : null}
                </div>
            </div>
        </>
    )
}

export default AutocompleteAddress