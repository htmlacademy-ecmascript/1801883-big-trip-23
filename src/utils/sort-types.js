import dayjs from 'dayjs';
import { calculateDuration } from '../utils/event.js';

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));

const sortByPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

const sortByDuration = (eventA, eventB) => calculateDuration(eventA.dateFrom, eventA.dateTo) - calculateDuration(eventB.dateFrom, eventB.dateTo); // TODO доделать!

export { sortByDay, sortByPrice, sortByDuration };
