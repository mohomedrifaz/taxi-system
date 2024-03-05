import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient, Prisma, Contact } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: Request) {
  const contact: Contact[] = await prisma.contact.findMany();
  return Response.json({ contact });
}
