"use client"

import React, { useState } from 'react';

function App() {
  const [driverDetails, setDriverDetails] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDriverDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Driver Details</h1>
      <label>First Name:</label>
      <input
        type="text"
        name="firstName"
        value={driverDetails.firstName}
        onChange={handleInputChange}
      />
      <br />
      <label>Last Name:</label>
      <input
        type="text"
        name="lastName"
        value={driverDetails.lastName}
        onChange={handleInputChange}
      />
      <br />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={driverDetails.email}
        onChange={handleInputChange}
      />
      <br />
      <label>Phone Number:</label>
      <input
        type="tel"
        name="phoneNumber"
        value={driverDetails.phoneNumber}
        onChange={handleInputChange}
      />
      <br />
      <h2>Driver Object:</h2>
      <pre>{JSON.stringify(driverDetails, null, 2)}</pre>
    </div>
  );
}

export default App;
