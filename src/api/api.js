const { Router } = require('express');
const { generate } = require('../controllers');

const router = Router();

router.get('/generate', generate.GET);
router.post('/generate', generate.POST);

module.exports = router;
