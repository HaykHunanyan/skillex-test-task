module.exports = {
  GET: async (req, res) => res.status(405).json({ error: 'Method Not Allowed' }),
  POST: async (req, res) => {
    const { items, length } = req.body;
    let counter = {};
    items.map((num) => {
      const char = String.fromCharCode(64 + num);
      counter[char] = char; 
      return
    });

    res.send({
      counter,
    });
  },
};
