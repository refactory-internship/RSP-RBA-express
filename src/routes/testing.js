const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer');

// Import controller
const testingController = require('../controllers/testingController');

router.get('/:id', testingController.get);
// router.get('/:id', testingController.getOne);
router.post('/', testingController.create);
router.post('/image', multer.single('photo'), testingController.upload);
router.post('/multiple-image/:id', multer.array('photo'), testingController.uploadMultiple);
router.post('/room-photos', testingController.storeRoomPhotos);
// router.put('/:id', testingController.put);
// router.delete('/:id', testingController.delete);
module.exports = router;