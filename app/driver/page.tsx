"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDriverForm from '@/components/driver/addDriverForm';
import { Driver } from '@prisma/client';

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

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const initaldriver = await fetchDriver('driver');
        console.log("initialContacts", initaldriver);
        setDrivers(initaldriver.driver);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);


  return (
    <div>
      <div className="flex bg-blue-500">
        <section className="w-1/3 bg-gray-800 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-white">Add Driver</h2>
          </div>
          <AddDriverForm
            onSubmit={async (data: any, e: any) => {
              try {
                await saveDriver(data);
                setDrivers([...(drivers ?? []), data]);
                e.target.reset();
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </section>
        <section className="w-2/3 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-gray-700">Drivers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {drivers.map((c: Driver, i: number) => (
              <div
                className="bg-white rounded-lg border border-gray-200 shadow-md p-6 m-2"
                key={i}
              >
                <img
                  className="h-16 w-16 rounded-full mx-auto mb-4"
                  src={c?.avatar}
                  alt={`Avatar of ${c?.firstName}`}
                />
                <h2 className="text-lg text-gray-900 font-bold text-center">
                  {c?.firstName} {c?.lastName}
                </h2>
                <p className="text-gray-700 text-center mb-3">{c?.email}</p>
                {/* Other details can be added here */}
                <div className="text-center">
                  <a href="#" className="text-blue-500 hover:underline">
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
