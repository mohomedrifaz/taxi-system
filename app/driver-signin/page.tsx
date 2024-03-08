"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignIn() {

    const router = useRouter();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [alert, setAlert] = useState({
        status: "",
        message: "",
    });

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await signIn("credentials", loginData);
            setAlert({ status: "success", message: "Login successfully" });
            setLoginData({ email: "", password: "" });
            router.push('/driver-profile');
        } catch (error: any) {
            console.log({ error });
            setAlert({ status: "error", message: "Something went wrong" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white rounded-lg shadow-md p-8">
                <div>
                    <h1 className="text-center text-3xl font-extrabold text-gray-900">Driver Sign In</h1>
                </div>
                {alert.message && (
                    <div className={`text-${alert.status === 'success' ? 'green' : 'red'} font-bold`}>
                        {alert.status === 'success' ? '✅' : '❌'} {alert.message}
                    </div>
                )}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={onChange}
                            value={loginData.email}
                            type="email"
                            name="email"
                            required
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={onChange}
                            value={loginData.password}
                            type="password"
                            name="password"
                            required
                            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
}
