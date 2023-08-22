import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

import prismadb from '@/lib/prismadb';
import { compare } from 'bcrypt';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword as string
        );
        if (!isCorrectPassword) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],

  // pages: {
  //   signIn: '/login'
  // },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
