import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const capitalizeFirstLetter = (inputString) => inputString[0].toUpperCase() + inputString.slice(1);

const reformatDate = (data) => (
  {
    monthDay: dayjs(data).format('MMM D').toUpperCase(),
    yearMonthDay: dayjs(data).format('YYYY-MM-DD'),
    hourMinute: dayjs(data).format('HH:mm'),
    dateHoursMinute: dayjs(data).format('YY/MM/DD HH:mm'),
    dateTHoursMinute: dayjs(data).format('YYYY-MM-DDTHH:mm'),
  }
);

const calculateDuration = (startDate, endDate) => {
  const durationInMinutes = dayjs(endDate).diff(dayjs(startDate), 'minute');
  const durationValue = dayjs.duration(durationInMinutes, 'minutes');

  if (durationValue.days()) {
    return durationValue.format('DD[D] HH[H] mm[M]',);
  }

  if (durationValue.hours()) {
    return durationValue.format('HH[H] mm[M]');
  }

  return durationValue.format('mm[M]');
};

export { capitalizeFirstLetter, reformatDate, calculateDuration };
