const express = require('express');
const roomRoute = require('../controller/room/room.route');
const reservationRoute = require('../controller/reservation/reservation.route');

const router = express.Router();

router.use('/reservations', reservationRoute);
router.use('/rooms', roomRoute);


module.exports = router;
