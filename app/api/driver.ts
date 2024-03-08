import { NextApiRequest, NextApiResponse } from 'next';
import { getDrivers } from '@/app/api/search-address/db/get/route';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // console.log('Fetching drivers data...');
            const drivers = await getDrivers(req, res);
            console.log('Drivers data:', drivers);
            res.json(drivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            res.status(500).json({ error: "Failed to fetch drivers" });
        }
    } else {
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
