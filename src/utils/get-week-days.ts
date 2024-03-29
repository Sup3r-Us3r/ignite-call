interface IGetWeekDaysParams {
  short?: boolean;
}

function getWeekDays({ short = false }: IGetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

  return [...new Array(7).keys()]
    .map(day => formatter.format(new Date(Date.UTC(2021, 5, day))))
    .map(weekDay => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase();
      } else {
        return weekDay
          .substring(0, 1)
          .toUpperCase()
          .concat(weekDay.substring(1));
      }
    });
}

export { getWeekDays };
