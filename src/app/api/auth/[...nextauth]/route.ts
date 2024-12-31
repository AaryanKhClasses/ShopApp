import db from '@/db/db'
import { session } from '@/lib/session'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if(!profile?.email) throw new Error("No Profile")
            await db.user.upsert({
                where: { email: profile.email },
                create: { email: profile.email, name: profile.name as string },
                update: { name: profile.name }
            })
            return true
        },
        session,
        async jwt({ token, user, account, profile }: any) {
            if(profile) {
                const user = await db.user.findUnique({ where: { email: profile.email } })
                if(!user) return new Error("No User Found")
                token.id = user.id
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }