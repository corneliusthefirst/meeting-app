const Joi = require('joi');
const { objectId } = require('../../../validations/custom.validation');

const getAvailableRooms = {
    body: Joi.object().keys({
        date: Joi.date() || undefined,
        startPeriod: Joi.number() || undefined,
        endPeriod: Joi.number() || undefined,
        capacity: Joi.number() || undefined,
        equipements: Joi.array() || undefined
    }),
};

const createRoom = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    capacity: Joi.number().required(),
    equipements: Joi.array().required(),
  }),
};

const updateRoom = {
    body: Joi.object()
        .keys({
            name: Joi.string().required(),
            description: Joi.string().required(),
            capacity: Joi.number().required(),
            equipements: Joi.array().required()
        })
};

const deleteRoom = {
    params: Joi.object().keys({
        roomId: Joi.string().custom(objectId),
    }),
};

module.exports = {
    getAvailableRooms,
    createRoom,
    updateRoom,
    deleteRoom
};
