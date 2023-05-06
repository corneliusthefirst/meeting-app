const Joi = require('joi');
const {objectId} = require('../../../validations/custom.validation');

const createReservation = {
    body: Joi.object().keys(
        {roomId: Joi.string().custom(objectId), date: Joi.date().required(), startPeriod: Joi.number().required(), endPeriod: Joi.number().required()}
    )
};

const updateReservation = {
    body: Joi.object().keys(
        {roomId: Joi.string().custom(objectId), date: Joi.date().required(), startPeriod: Joi.number().required(), endPeriod: Joi.number().required()}
    )
};

const deleteReservation = {
    params: Joi.object().keys(
        {reservationId: Joi.string().custom(objectId)}
    )
};

module.exports = {
    createReservation,
    updateReservation,
    deleteReservation
};
