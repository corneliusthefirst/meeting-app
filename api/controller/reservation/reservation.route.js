const express = require('express');
const validate = require('../../middlewares/validate');
const reservationValidation = require('./validations/reservation.validations');
const reservationController = require('./reservation.controller');

const router = express.Router();

router.get('/getReservations', reservationController.getReservations);
router.post('/createReservation', validate(reservationValidation.createReservation), reservationController.createReservation);
router.patch('/updateReservation', validate(reservationValidation.updateReservation), reservationController.updateReservation);
router.delete('/deleteReservation/:reservationId', validate(reservationValidation.deleteReservation), reservationController.deleteReservation);

module.exports = router;
