import { isFutureEvent, isPastEvent, isPresentEvent } from './utils/filters.js';
import { sortByDay, sortByPrice, sortByDuration } from './utils/sort-types.js';


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

const SortTypes = {
  DAY: {
    name: 'day',
    isDisabled: false,
    sortMethod: sortByDay
  },
  EVENT: {
    name: 'event',
    isDisabled: true,
    sortMethod: () => 0
  },
  TIME: {
    name: 'time',
    isDisabled: false,
    sortMethod: sortByDuration
  },
  PRICE: {
    name: 'price',
    isDisabled: false,
    sortMethod: sortByPrice
  },
  OFFER: {
    name: 'offer',
    isDisabled: true,
    sortMethod: () => 0
  },
};

const UserAction = {
  UPDATE: 'UPDATE_EVENT',
  ADD: 'ADD_EVENT',
  DELETE: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


export { EVENT_TYPES, Filters, SortTypes, UserAction, UpdateType };
