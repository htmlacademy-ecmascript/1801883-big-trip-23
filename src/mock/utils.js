import dayjs from 'dayjs';


const generateRandomInteger = (min = 0, max = 1000) => {
  const processedMin = Math.ceil(Math.min(min, max));
  const processedMax = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (processedMax - processedMin + 1) + processedMin);
};

const flipCoin = () => Math.round(Math.random());

const getRandomArrayElement = (items) => items[generateRandomInteger(0, items.length - 1)];

const getUnicRandomArrayElement = (items) => (
  () => {
    if (items.length !== 0) {
      const indexElement = generateRandomInteger(0, items.length - 1);
      const element = items[indexElement];
      items.splice(indexElement, 1);

      return element;
    }
    return undefined;
  }
);

const getRandomDate = (date) => dayjs(date).add(generateRandomInteger(), 'minute').toISOString();

export{ generateRandomInteger, flipCoin, getRandomArrayElement, getUnicRandomArrayElement, getRandomDate };
