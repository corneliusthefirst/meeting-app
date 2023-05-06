const roomService = require('../../service/room.service');
const logger = require('../../logger/api.logger');
const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');

/**
     *  getAvailableRooms
     * @param {Object} params
     * @param {Date} params.date
     * @param {Number} params.startPeriod
     * @param {Number} params.endPeriod
     * @param {Number} params.capacity
     * @param {Array} params.equipements
*/
const getAvailableRooms = catchAsync(async (req, res) => {
    logger.info('Controller: getAvailableRooms')
    const rooms = await roomService.getAvailableRooms(req.body);
    res.status(httpStatus.OK).send({rooms: rooms});
});

const createRoom = catchAsync(async (req, res) => {
    logger.info('Controller: createRoom', req.body);
    const room = await roomService.createRoom(req.body);
    res.status(httpStatus.CREATED).send({room: room});
});

const updateRoom = catchAsync(async (req, res) => {
    logger.info('Controller: updateRoom', req.body);
    const room = await roomService.updateRoom(req.body);
    res.status(httpStatus.CREATED).send({room: room});
});

const deleteRoom = catchAsync(async (req, res) => {
    logger.info('Controller: deleteRoom', req.params.roomId);
    const room = await roomService.deleteRoom(req.params.roomId);
    res.status(httpStatus.OK).send({room: room});
});

module.exports = {
    getAvailableRooms,
    createRoom,
    updateRoom,
    deleteRoom
}
