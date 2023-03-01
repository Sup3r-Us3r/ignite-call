import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles';

interface IAvailability {
  possibleTimes: number[];
  availableTimes: number[];
}

interface ICalendarStepProps {
  onSelectDateTime: (date: Date) => void;
}

const CalendarStep = ({ onSelectDateTime }: ICalendarStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const router = useRouter();

  const isDateSelected = Boolean(selectedDate);
  const username = String(router.query.username);

  const weekDay = isDateSelected ? dayjs(selectedDate).format('dddd') : null;
  const describedDate = isDateSelected
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null;
  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null;

  const { data: availability } = useQuery<IAvailability>(
    ['availability', selectedDateWithoutTime],
    async () => {
      const response = await api.get<IAvailability>(
        `/users/${username}/availability`,
        {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
          },
        },
      );

      return response.data;
    },
    {
      enabled: Boolean(selectedDate),
    },
  );

  function handleSelectTime(time: number) {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', time)
      .startOf('hour')
      .toDate();

    onSelectDateTime(dateWithTime);
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes?.map(time => (
              <TimePickerItem
                key={time}
                disabled={!availability?.availableTimes.includes(time)}
                onClick={() => handleSelectTime(time)}
              >
                {String(time).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
};

export { CalendarStep };
