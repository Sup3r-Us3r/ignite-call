/* eslint-disable camelcase */
import dayjs from 'dayjs';
import { google } from 'googleapis';

import { prisma } from './prisma';

async function getGoogleOAuthToken(userId: string) {
  const account = await prisma.account.findFirstOrThrow({
    where: {
      user_id: userId,
      provider: 'google',
    },
  });

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });

  auth.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
    expiry_date: account.expires_at ? account.expires_at * 1000 : null,
  });

  if (!account.expires_at) {
    return auth;
  }

  const isTokenExpired = dayjs(account.expires_at * 1000).isBefore(new Date());

  if (isTokenExpired) {
    const { credentials } = await auth.refreshAccessToken();
    const { access_token, refresh_token, id_token, expiry_date, token_type } =
      credentials;

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        access_token,
        refresh_token,
        id_token,
        expires_at: expiry_date ? Math.floor(expiry_date / 1000) : null,
        token_type,
      },
    });

    auth.setCredentials({
      access_token,
      refresh_token,
      expiry_date,
    });
  }

  return auth;
}

export { getGoogleOAuthToken };
