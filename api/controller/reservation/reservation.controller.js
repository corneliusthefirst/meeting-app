const reservationService  = require('../../service/reservation.service');
const logger = require('../../logger/api.logger');
const catchAsync = require('../../utils/catchAsync');
const httpStatus = require('http-status');

const getReservations =  catchAsync(async (req, res) => {
    logger.info('Controller: getReservations')
    const reservations = await reservationService.getReservations();
    res.status(httpStatus.OK).send({reservations: reservations});
});

const createReservation = catchAsync(async (req, res) => {
    logger.info('Controller: createReservation', req.body);
    const reservation = await reservationService.createReservation(req.body);
    res.status(httpStatus.CREATED).send({reservation: reservation});
});

const updateReservation = catchAsync(async (req, res) => {
    logger.info('Controller: updateReservation', req.body);
    const reservation = await reservationService.updateReservation(req.body);
    res.status(httpStatus.CREATED).send({reservation: reservation});
});

const deleteReservation = catchAsync(async (req, res) => {
    logger.info('Controller: deleteReservation', req.params.reservationId);
    const reservation = await reservationService.deleteReservation(req.params.reservationId);
    res.status(httpStatus.OK).send({reservation: reservation});
});

module.exports = {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
}