// pages/api/signin.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function signinHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        // console.log('email and password', email);
        try {
            const driver = await prisma.driver.findUnique({
                where: { email },
            });

            if (!driver || driver?.passwordHash !== password) {
                // If no driver found or password doesn't match, return 401 Unauthorized
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // If credentials are valid, return success response
            return res.status(200).json({ message: 'Sign in successful' });
        } catch (error) {
            console.error('Error occurred:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Method Not Allowed for other HTTP methods
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
