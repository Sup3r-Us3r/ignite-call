import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Calendar } from '@/components/Calendar';
import { api } from '@/lib/axios';

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

const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState<IAvailability>(
    {} as IAvailability,
  );

  const router = useRouter();

  const isDateSelected = Boolean(selectedDate);
  const username = String(router.query.username);

  const weekDay = isDateSelected ? dayjs(selectedDate).format('dddd') : null;
  const describedDate = isDateSelected
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null;

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    api
      .get<IAvailability>(`/users/${username}/availability`, {
        params: {
          date: dayjs(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then(response => setAvailability(response.data));
  }, [selectedDate, username]);

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
