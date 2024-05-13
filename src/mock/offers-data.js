import { EVENT_TYPES } from '..//consts.js';
import { generateRandomInteger, getUnicRandomArrayElement } from './utils.js';

const OFFER_TITLES = [
  'Upgrade to a business class',
  'Switch to comfort class',
  'Add luggage',
  'Luggage delivery',
  'Personal guide',
  'Meet and greet services',
  'Translator services',
];
let offers;


const generateOffer = (index, getUnicOfferCallBack) => (
  {
    id: `offer-${index}`,
    title: getUnicOfferCallBack(),
    price: generateRandomInteger(),
  }
);

const generateOffers = () => {
  const getUnicOffer = getUnicRandomArrayElement([...OFFER_TITLES]);
  return Array.from({ length: generateRandomInteger(0, OFFER_TITLES.length) }, (_, index) => generateOffer(index, getUnicOffer));
};

const getMockOffers = () => {
  if (!offers) {
    offers = EVENT_TYPES.map((type) => (
      {
        type: type,
        offers: generateOffers(),
      }
    ));
  }

  return offers;
};

export { getMockOffers };
