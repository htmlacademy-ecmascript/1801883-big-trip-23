import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import IsSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(duration);
dayjs.extend(IsSameOrAfter);
dayjs.extend(isSameOrBefore);


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


const isFutureEvent = (startDate) => dayjs(startDate).isAfter(dayjs(), 'date');

const isPastEvent = (endDate) => dayjs(endDate).isBefore(dayjs(), 'date');

const isPresentEvent = (startDate, endDate) =>
  dayjs(startDate).isSameOrBefore(dayjs(), 'date') &&
  dayjs(endDate).isSameOrAfter(dayjs(), 'date');


export { capitalizeFirstLetter, reformatDate, isFutureEvent, isPastEvent, isPresentEvent, calculateDuration };
