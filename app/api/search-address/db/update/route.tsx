import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma, Contact, Driver } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    let body = await req.json();
    console.log("body", body);

    try {
        const { id, ...data } = body; // Extract id from the request body
        const updatedDriver = await prisma.driver.update({
            where: { id }, // Specify the driver to update based on the extracted id
            data, // Provide the updated data
        });
        return Response.json({ updatedDriver });
    } catch (error: any) {
        console.log("error is thrown: ", error);
        return Response.json({ error: error.message });
    }
}
