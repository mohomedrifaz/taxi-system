import React, { useState } from "react";

const FormError = ({ errorMessage }: any) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddContactFormProps {
  onSubmit: any;
}

export default function AddContactForm(props: AddContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await props.onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="mb-3 text-black ">
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
      <div className="mb-3 text-black ">
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
      <div className="mb-3 text-black ">
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
      <div className="mb-3 text-black ">
        <label htmlFor="avatar"  className="text-white">Avatar</label>
        <input
          type="text"
          id="avatar"
          name="avatar"
          className="form-input mt-1 block w-full"
          value={formData.avatar}
          onChange={handleChange}
        />
        {errors.avatar && <FormError errorMessage="Avatar is required" />}
      </div>
      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
