import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

const createSchedulingBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  observations: z.string().nullable(),
  date: z.string().datetime(),
});

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end();
  }

  const username = String(request.query.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return response.status(400).json({ message: 'User does not exists.' });
  }

  const { name, email, observations, date } = createSchedulingBodySchema.parse(
    request.body,
  );

  const schedulingDate = dayjs(date).startOf('hour');

  if (schedulingDate.isBefore(new Date())) {
    return response.status(400).json({ message: 'Date is in the past.' });
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  });

  if (conflictingScheduling) {
    return response
      .status(400)
      .json({ message: 'There is another scheduling at the same time.' });
  }

  await prisma.scheduling.create({
    data: {
      user_id: user.id,
      name,
      email,
      observations,
      date: schedulingDate.toDate(),
    },
  });

  return response.status(201).end();
}

export default handler;
