const express = require('express');
const router = express.Router();
const { authJWT } = require('../middleware');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Import routes
const auth = require('./api/auth');
const booking = require('./booking');
const room = require('./room');

const middleware = [
  authJWT.verifyToken,
  authJWT.isAdmin
]

//Route using
router.use('/api/auth', auth);
router.use('/rsp/guest/book', middleware[0], booking);
router.use('/rsp/admin/room', middleware, room);

module.exports = router;
