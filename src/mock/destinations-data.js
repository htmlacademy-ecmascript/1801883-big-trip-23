import { generateRandomInteger, getRandomArrayElement, getUnicRandomArrayElement } from './utils.js';

const CITIES = ['Amsterdam', 'Chamonix', 'Geneva'];
const CITY_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const MIN_DESCRIPTIONS_NUMBER = 1;
const MAX_DESCRIPTIONS_NUMBER = 5;
const MIN_IMAGE_NUMBER = 0;
const MAX_IMAGE_NUMBER = 5;
let destinations;


const generateDestination = (index) => {
  let descriptions = '';
  const getUnicDescription = getUnicRandomArrayElement([...CITY_DESCRIPTIONS]);

  for (let i = 1; i <= generateRandomInteger(MIN_DESCRIPTIONS_NUMBER, MAX_DESCRIPTIONS_NUMBER); i++) {
    descriptions += `${getUnicDescription()} `;
  }

  return {
    id: `destenation-${index}`,
    description: descriptions.trimEnd(),
    name: CITIES[index],
    pictures: Array.from({ length: generateRandomInteger(MIN_IMAGE_NUMBER, MAX_IMAGE_NUMBER) }, () => (
      {
        src: `https://loremflickr.com/248/152?random=${generateRandomInteger()}`,
        description: getRandomArrayElement(CITY_DESCRIPTIONS)
      }
    ))
  };
};

const getMockDestinations = () => {
  if (!destinations) {
    destinations = Array.from({ length: CITIES.length }, (_, index) => generateDestination(index));
  }

  return destinations;
};

export { getMockDestinations };
