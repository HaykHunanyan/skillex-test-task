const { Router } = require('express');
const { generateController } = require('../controllers');
const { validateInput } = require('../middleware');

const router = Router();

router.get('/generate', generateController.GET);
router.post('/generate', validateInput, generateController.POST);

module.exports = router;
