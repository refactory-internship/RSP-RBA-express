const express = require('express');
const router = express.Router();

//import guest controller
const guestController = require('../controllers/guestController');

//import routes
router.get('/', guestController.index);
router.get('/:id', guestController.show);
router.post('/:id', guestController.createBooking);

module.exports = router;