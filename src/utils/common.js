const capitalizeFirstLetter = (inputString) => inputString[0].toUpperCase() + inputString.slice(1);

function updateItem(items, newItem) {
  return items.map((item) => item.id === newItem.id ? newItem : item);
}

const findObject = (items, property, value) => items.find((item) => item[property] === value);


export { capitalizeFirstLetter, updateItem, findObject };
