import type { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google';

import { PrismaAdapter } from '@/lib/auth/prisma-adapter';

function buildNextAuthOptions(
  request: NextApiRequest | NextPageContext['req'],
  response: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(request, response),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            scope:
              'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          };
        },
      }),
    ],
    callbacks: {
      async signIn({ account }) {
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar/?error=permissions';
        }

        return true;
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        };
      },
    },
  };
}

async function auth(request: NextApiRequest, response: NextApiResponse) {
  return await NextAuth(
    request,
    response,
    buildNextAuthOptions(request, response),
  );
}

export { buildNextAuthOptions };
export default auth;
