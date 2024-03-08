import prisma from "@/app/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth';


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.driver.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) throw new Error("user with that email does not exist");

      // ⚠️ WARNING: DO NOT do this in real-world development
        if (user.passwordHash !== credentials?.password)
          throw new Error("incorrect password");

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: "secret", // store this in a .env file
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };