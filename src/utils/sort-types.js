import dayjs from 'dayjs';

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sortByDuration = (eventA, eventB) => dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom)) - dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));

export { sortByDay, sortByPrice, sortByDuration };
