module.exports = (req, res, next) => {
    const { items, length } = req.body;
  
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: '"items" must be a non-empty array' });
    }
  
    if (typeof length !== 'number' || length < 1) {
      return res.status(400).json({ error: '"length" must be a number greater than 0' });
    }
  
    next();
  };
  