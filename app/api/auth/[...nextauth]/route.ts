import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/src/lib/prisma'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password')
                }

                const existingUser = await prisma.admin.findUnique({
                    where: { email: credentials.email },
                })

                if (existingUser) {
                    if (existingUser.password === credentials.password) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email,
                        }
                    }

                    throw new Error('Invalid password')
                }

                const newUser = await prisma.admin.create({
                    data: {
                        email: credentials.email,
                        password: credentials.password,
                        name: credentials.email.split('@')[0],
                    },
                })

                return {
                    id: newUser.id.toString(),
                    name: newUser.name,
                    email: newUser.email,
                }
            },
        }),
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
