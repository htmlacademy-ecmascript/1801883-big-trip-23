import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);


const reformatDate = (data) => data
  ? {
    monthDay: dayjs(data).format('MMM D').toUpperCase(),
    dayMonth: dayjs(data).format('D MMM').toUpperCase(),
    yearMonthDay: dayjs(data).format('YYYY-MM-DD'),
    hourMinute: dayjs(data).format('HH:mm'),
    dateHoursMinute: dayjs(data).format('YY/MM/DD HH:mm'),
    dateTHoursMinute: dayjs(data).format('YYYY-MM-DDTHH:mm'),
  }
  : '';

const calculateDuration = (startDate, endDate) => {
  const durationInMinutes = dayjs(endDate).diff(dayjs(startDate), 'minute');
  const durationValue = dayjs.duration(durationInMinutes, 'minutes');

  if (durationValue.days() || durationValue.years()) {
    const daysNumber = dayjs(endDate).diff(startDate, 'day').toString().padStart(2, '0');
    return `${daysNumber}D ${durationValue.format('HH[H] mm[M]')}`;
  }

  if (durationValue.hours()) {
    return durationValue.format('HH[H] mm[M]');
  }

  return durationValue.format('mm[M]');
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

const isMonthsEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'month');


export { reformatDate, calculateDuration, isDatesEqual, isMonthsEqual };
