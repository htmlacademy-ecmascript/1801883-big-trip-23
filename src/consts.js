import { isFutureEvent, isPastEvent, isPresentEvent } from './utils/filters.js';


const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const Filters = {
  EVERYTHING: {
    name: 'everything',
    emptyMessage: 'Click New Event to create your first point',
    filterMethod: (events) => events
  },
  FUTURE: {
    name: 'future',
    emptyMessage: 'There are no future events now',
    filterMethod: (events) => events.filter((event) => isFutureEvent(event.dateFrom))
  },
  PRESENT: {
    name: 'present',
    emptyMessage: 'There are no present events now',
    filterMethod: (events) => events.filter((event) => isPresentEvent(event.dateFrom, event.dateTo))
  },
  PAST: {
    name: 'past',
    emptyMessage: 'There are no past events now',
    filterMethod: (events) => events.filter((event) => isPastEvent(event.dateTo))
  }
};


export { EVENT_TYPES, Filters };
