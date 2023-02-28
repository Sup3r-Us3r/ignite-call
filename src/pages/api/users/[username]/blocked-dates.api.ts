import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') {
    return response.status(405).end();
  }

  const username = String(request.query.username);
  const { year, month } = request.query;

  if (!year || !month) {
    return response
      .status(400)
      .json({ message: 'Year or month not specified.' });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return response.status(400).json({ message: 'User does not exists.' });
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter(weekDay => {
    return !availableWeekDays.some(
      availableWeekDay => availableWeekDay.week_day === weekDay,
    );
  });

  const blockedDatesRaw: Array<{ date: number; amount: number; size: number }> =
    await prisma.$queryRaw`
    SELECT
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals AS UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-%m") = ${`${year}-${month}`}

    GROUP BY
      EXTRACT(DAY FROM S.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

    HAVING amount >= size
  `;

  const blockedDates = blockedDatesRaw.map(blockedDate => blockedDate.date);

  return response.json({ blockedWeekDays, blockedDates });
}

export default handler;
