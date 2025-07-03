const express = require('express');
const api = require('./src/api/routes.js');
const {logger} = require('./src/middleware');
require('dotenv').config();

const app = express();
app.use(logger); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', api);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
