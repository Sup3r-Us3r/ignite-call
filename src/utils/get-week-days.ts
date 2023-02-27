function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

  return [...new Array(7).keys()]
    .map(day => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map(weekDay =>
      weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)),
    );
}

export { getWeekDays };
