import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') {
    return response.status(405).end();
  }

  const username = String(request.query.username);
  const { date } = request.query;

  if (!date) {
    return response.status(400).json({ message: 'Date not provided.' });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return response.status(400).json({ message: 'User does not exists.' });
  }

  const referenceDate = dayjs(String(date));
  const isPastDate = referenceDate.endOf('day').isBefore(new Date());

  if (isPastDate) {
    return response.json({ possibleTimes: [], availableTimes: [] });
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: referenceDate.get('day'),
    },
  });

  if (!userAvailability) {
    return response.json({ possibleTimes: [], availableTimes: [] });
  }

  const startHour = userAvailability.time_start_in_minutes / 60;
  const endHour = userAvailability.time_end_in_minutes / 60;

  const possibleTimes = Array.from({ length: endHour - startHour }).map(
    (_, index) => {
      return startHour + index;
    },
  );

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,
      date: {
        gte: referenceDate.set('hour', startHour).toDate(),
        lte: referenceDate.set('hour', endHour).toDate(),
      },
    },
  });

  const availableTimes = possibleTimes.filter(time => {
    const isTimeBlocked = blockedTimes.some(
      blockedTime => blockedTime.date.getHours() === time,
    );

    const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date());

    return !isTimeBlocked && !isTimeInPast;
  });

  return response.json({ possibleTimes, availableTimes });
}

export default handler;
