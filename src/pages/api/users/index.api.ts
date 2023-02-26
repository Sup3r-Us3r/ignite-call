import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

import { prisma } from '@/lib/prisma';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end();
  }

  const { name, username } = request.body;

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userExists) {
    return response.status(400).json({
      message: 'Username already taken.',
    });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });

  setCookie({ res: response }, '@ignite-call/userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // seconds to days | 7 days
    path: '/',
  });

  return response.status(201).json(user);
}

export default handler;
