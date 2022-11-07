const express = require('express');
const { createBooking } = require('../controllers/bookingControllers');
const { upload } = require('../utils/uploadFile');
const router = express.Router();

router.post('/', upload.single('image'), createBooking);

module.exports = router;
