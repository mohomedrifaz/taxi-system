import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma, Contact, Driver, Trip } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  
    const driver: Driver[] = await prisma.driver.findMany();
    return Response.json({ driver });
  
}
