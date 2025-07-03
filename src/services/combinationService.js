const { generateCombinations } = require('../utils');
const { getPrefixChar } = require('../utils');

function mapItemsToNames(items) {
  const counter = {};
  return items.map((num) => {
    const char = getPrefixChar(num);
    counter[char] = (counter[char] || 0) + 1;
    return `${char}${counter[char]}`;
  });
}

async function storeCombinations(conn, itemNames, combinations) {
  const itemIdMap = new Map();

  for (const name of itemNames) {
    if (!itemIdMap.has(name)) {
      const [res] = await conn.execute('INSERT INTO items (name) VALUES (?)', [name]);
      itemIdMap.set(name, res.insertId);
    }
  }

  const ids = [];
  for (const combo of combinations) {
    const [res] = await conn.execute('INSERT INTO combinations (combination) VALUES (?)', [JSON.stringify(combo)]);
    await conn.execute('INSERT INTO responses (combination_id) VALUES (?)', [res.insertId]);
    ids.push(res.insertId);
  }

  return ids;
}

module.exports = {
  mapItemsToNames,
  generateCombinations,
  storeCombinations,
};
