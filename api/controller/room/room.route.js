const express = require('express');
const validate = require('../../middlewares/validate');
const roomValidation = require('./validations/room.validations');
const roomController = require('./room.controller');

const router = express.Router();

router.post('/getAvailableRooms',validate(roomValidation.getAvailableRooms), roomController.getAvailableRooms);
router.post('/createRoom', validate(roomValidation.createRoom), roomController.createRoom);
router.patch('/updateRoom', validate(roomValidation.updateRoom), roomController.updateRoom);
router.delete('/deleteRoom/:roomId', validate(roomValidation.deleteRoom), roomController.deleteRoom);

module.exports = router;
