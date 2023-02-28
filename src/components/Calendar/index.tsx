import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useMemo, useState } from 'react';

import { api } from '@/lib/axios';
import { getWeekDays } from '@/utils/get-week-days';
import { useQuery } from '@tanstack/react-query';

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles';

interface ICalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
}

interface ICalendarProps {
  selectedDate: Date | null;
  onDateSelected: (date: Date) => void;
}

interface IBlockedDates {
  blockedWeekDays: number[];
  blockedDates: number[];
}

const Calendar = ({ selectedDate, onDateSelected }: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(() => {
    return dayjs().set('date', 1);
  });

  const router = useRouter();

  const shortWeekDays = getWeekDays({ short: true });

  const currentMonth = currentDate.format('MMMM');
  const currentYear = currentDate.format('YYYY');

  const username = String(router.query.username);

  const { data: blockedDates } = useQuery<IBlockedDates>(
    ['blocked-dates', currentDate.get('year'), currentDate.get('month')],
    async () => {
      const response = await api.get<IBlockedDates>(
        `/users/${username}/blocked-dates`,
        {
          params: {
            year: currentDate.get('year'),
            month: currentDate.get('month') + 1,
          },
        },
      );

      return response.data;
    },
  );

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return [];
    }

    const daysInMonthArray = [
      ...new Array(currentDate.daysInMonth()).keys(),
    ].map(day => {
      return currentDate.set('date', day + 1);
    });

    const firstWeekDay = currentDate.get('day');

    const previousMonthFillArray = [...new Array(firstWeekDay).keys()]
      .map(weekDay => {
        return currentDate.subtract(weekDay + 1, 'day');
      })
      .reverse();

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    );
    const lastWeekDay = lastDayInCurrentMonth.get('day');

    const nextMonthFillArray = [...new Array(7 - (lastWeekDay + 1)).keys()].map(
      weekDay => {
        return lastDayInCurrentMonth.add(weekDay + 1, 'day');
      },
    );

    const calendarDays = [
      ...previousMonthFillArray.map(date => ({ date, disabled: true })),
      ...daysInMonthArray.map(date => ({
        date,
        disabled:
          date.endOf('day').isBefore(new Date()) ||
          blockedDates.blockedWeekDays.includes(date.get('day')) ||
          blockedDates.blockedDates.includes(date.get('date')),
      })),
      ...nextMonthFillArray.map(date => ({ date, disabled: true })),
    ];

    const calendarWeeks = calendarDays.reduce<ICalendarWeek[]>(
      (weeks, _, index, array) => {
        const isNewWeek = index % 7 === 0;

        if (isNewWeek) {
          weeks.push({
            week: index / 7 + 1,
            days: array.slice(index, index + 7),
          });
        }

        return weeks;
      },
      [],
    );

    return calendarWeeks;
  }, [currentDate, blockedDates]);

  function handlePreviousMonth() {
    const previousMonthDate = currentDate.subtract(1, 'month');

    setCurrentDate(previousMonthDate);
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month');

    setCurrentDate(nextMonthDate);
  }

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button title="Previous month" onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button title="Next month" onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map(weekDay => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    disabled={disabled}
                    onClick={() => onDateSelected(date.toDate())}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
};

export { Calendar };
