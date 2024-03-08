import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma, Contact, Driver } from "@prisma/client";

const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   let body = await req.json();
//   console.log("body", body);

//   //   const contact: Prisma.ContactCreateInput = JSON.parse(body);
//   //   console.log("contact", contact);

//   try {
//     const savedContact = await prisma.contact.create({ data: body });
//     return Response.json({ savedContact });
//   } catch (error: any) {
//     console.log("error is thrown: ", error);
//     return Response.json({ error: error.message });
//   }
//   //   console.log("savedContact", savedContact);
// }

export async function POST(req: Request) {
  let body = await req.json();
  console.log("body", body);
  let tripId = body.tripId


  try {
    if (body.tripId) {
      const trip = await prisma.trip.findUnique({
        where: {
          id: parseInt(tripId),
        },
      });
      return Response.json({ trip });
    } else if (body.passengerName) {
      const savedTrip = await prisma.trip.create({ data: body });
      return Response.json({ savedTrip });
    } else {
      const savedDriver = await prisma.driver.create({ data: body });
      return Response.json({ savedDriver });
    }
  }
  catch (error: any) {
    console.log("error is thrown: ", error);
    return Response.json({ error: error.message });
  }
}