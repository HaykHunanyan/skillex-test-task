const pool = require('../db/mysql');
const { combiner } = require('../utils');

module.exports = {
  GET: async (req, res) => res.status(405).json({ error: 'Method Not Allowed' }),
  POST: async (req, res) => {
    const { items, length } = req.body;

    let counter = {};

    let itemNames = items.map((num) => {
      const char = String.fromCharCode(64 + num);
      counter[char] = (counter[char] || 0) + 1;
      return `${char}${counter[char]}`;
    });

    const combinations = combiner(itemNames, length);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const itemInsertMap = new Map();

      for (let name of itemNames) {
        if (!itemInsertMap.has(name)) {
          const [result] = await conn.execute('INSERT INTO items (name) VALUES (?)', [name]);
          itemInsertMap.set(name, result.insertId);
        }
      }

      const combinationIDs = [];
      for (let combo of combinations) {
        const [result] = await conn.execute('INSERT INTO combinations (combination) VALUES (?)', [
          JSON.stringify(combo),
        ]);
        combinationIDs.push(result.insertId);

        await conn.execute('INSERT INTO responses (combination_id) VALUES (?)', [result.insertId]);
      }

      await conn.commit();

      return res.json({
        id: combinationIDs[0] || null,
        combination: combinations,
      });
    } catch (err) {
      await conn.rollback();
      console.error('Transaction error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      conn.release();
    }
  },
};
