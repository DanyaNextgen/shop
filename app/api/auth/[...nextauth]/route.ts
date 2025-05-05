import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/src/lib/prisma";

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                const user = await prisma.admin.findUnique({
                    where: { email: credentials.email },
                });

                if (user) {
                    if (user.password === credentials.password) {
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                        };
                    }
                }

                const newUser = await prisma.admin.create({
                    data: {
                        email: credentials.email,
                        password: credentials.password,
                        name: credentials.email,
                    },
                });

                return {
                    id: newUser.id.toString(),
                    name: newUser.name,
                    email: newUser.email,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
