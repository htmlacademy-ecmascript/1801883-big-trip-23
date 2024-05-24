import { generateRandomInteger, flipCoin, getRandomArrayElement, getUnicRandomArrayElement, getRandomDate } from './utils.js';

const EVENTS_NUMBER = 10;


const generateEvent = (index, offers, destinations) => {
  const offerType = getRandomArrayElement(offers);
  const destination = getRandomArrayElement(destinations);
  const getUnicOffer = getUnicRandomArrayElement([...offerType.offers]);

  const dateStart = getRandomDate();
  const dateEnd = getRandomDate(dateStart);

  return {
    id: `event-${index}`,
    basePrice: generateRandomInteger(),
    dateFrom: dateStart,
    dateTo: dateEnd,
    destination: destination.id,
    isFavorite: flipCoin(),
    offers: Array.from({ length: generateRandomInteger(0, offerType.offers.length) }, () => getUnicOffer().id),
    type: offerType.type
  };
};

const generateEvents = () => {
  let events;

  return (offers, destinations) => {
    if (!events) {
      events = Array.from({ length: EVENTS_NUMBER }, (_, index) => generateEvent(index, offers, destinations));
    }

    return events;
  };
};

const getMockEvents = generateEvents();

export { getMockEvents };
