const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const filterByKeyValue = (key, value, array) => {
  return array.filter(item => item[key] === value);
}

module.exports = {
  getRandomElement,
  filterByKeyValue
};
