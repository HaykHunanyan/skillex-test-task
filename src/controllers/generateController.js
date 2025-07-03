const { mapItemsToNames, generateCombinations, storeCombinations } = require('../services');
const pool = require('../db/mysql');

module.exports = {
  POST: async (req, res) => {
    const { items, length } = req.body;

    const itemNames = mapItemsToNames(items);
    const combinations = generateCombinations(itemNames, length);

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const combinationIDs = await storeCombinations(conn, itemNames, combinations);
      await conn.commit();

      res.json({
        id: combinationIDs[0] || null,
        combination: combinations
      });
    } catch (err) {
      await conn.rollback();
      console.error('Transaction error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      conn.release();
    }
  },

  GET: async (req, res) => res.status(405).json({ error: 'Method Not Allowed' }),
};
