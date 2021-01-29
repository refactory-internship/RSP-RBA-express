const express = require('express');
const router = express.Router();

//import guest controller
const bookingController = require('../controllers/bookingController');

//import routes
router.get('/', bookingController.index);
router.get('/:id', bookingController.show);
router.post('/:id', bookingController.createBooking);

module.exports = router;