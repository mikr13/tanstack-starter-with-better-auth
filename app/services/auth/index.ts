import prisma from '@/db';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createAuthClient } from "better-auth/client";
import type { Session, User } from 'better-auth/types';

const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }
  }
  // Uncomment below line to enable Redis for caching sessions and ratelimiting
  // secondaryStorage: redisSecondaryStorage
});

const { signIn, signOut, useSession, session } = createAuthClient();

type InferAuthApi<API extends keyof typeof auth.api> =
  API extends keyof typeof auth.api
  ? Parameters<(typeof auth.api)[API]>[0]
  : never;

type Auth =
  | { isAuthenticated: false; user: null; session: null }
  | { isAuthenticated: true; user: User; session: Session };

export {
  auth, session, signIn,
  signOut,
  useSession, type Auth, type InferAuthApi
};

