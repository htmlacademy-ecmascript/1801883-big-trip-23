const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const Filters = {
  EVERYTHING: {
    name: 'everything',
    emptyMessage: 'Click New Event to create your first point'
  },
  FUTURE: {
    name: 'future',
    emptyMessage: 'There are no future events now'
  },
  PRESENT: {
    name: 'present',
    emptyMessage: 'There are no present events now'
  },
  PAST: {
    name: 'past',
    emptyMessage: 'There are no past events now'
  }
};

export { EVENT_TYPES, Filters };
