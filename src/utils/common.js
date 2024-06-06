const capitalizeFirstLetter = (inputString) => inputString[0].toUpperCase() + inputString.slice(1);

const updateItem = (items, newItem) => items.map((item) => item.id === newItem.id ? newItem : item);


export { capitalizeFirstLetter, updateItem };
