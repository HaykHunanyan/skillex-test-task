const { Router } = require('express');
const { generateController } = require('../controllers');

const router = Router();

router.get('/generate', generateController.GET);
router.post('/generate', generateController.POST);

module.exports = router;
