import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      rolle: string
    }
  }
  interface User {
    rolle: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    rolle: string
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/logg-inn',
    error: '/logg-inn',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        epost: { label: 'E-post', type: 'email' },
        passord: { label: 'Passord', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.epost || !credentials?.passord) return null

        const bruker = await prisma.bruker.findUnique({
          where: { epost: credentials.epost },
        })

        if (!bruker) return null

        const gyldig = await bcrypt.compare(credentials.passord, bruker.passordHash)
        if (!gyldig) return null

        return {
          id: bruker.id,
          email: bruker.epost,
          name: bruker.navn,
          rolle: bruker.rolle,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.rolle = user.rolle
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.rolle = token.rolle
      }
      return session
    },
  },
}
