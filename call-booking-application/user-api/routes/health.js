const express = require('express');
const { health } = require('../controllers/healthControllers');

const router = express.Router();

router.get('/', health);

module.exports = router;
