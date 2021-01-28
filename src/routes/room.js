const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');

//Import room controller
const roomController = require('../controllers/roomController');

//rooms CRUD routes for Admin
router.get('/', roomController.index);
router.get('/create', roomController.create);
router.post('/', multer.array('photo'), roomController.store);
router.get('/show/:id', roomController.show);
router.get('/edit/:id', roomController.edit);
router.put('/:id', roomController.update);
router.delete('/delete/:id', roomController.delete);

module.exports = router;