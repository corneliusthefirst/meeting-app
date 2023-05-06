const {connect} = require('../config/db.config');
const {Room} = require('../model/room.model');
const logger = require('../logger/api.logger');
const {Reservation} = require('../model/reservation.model');
const { ObjectID } = require('mongodb');

class RoomRepository {

    constructor() {
        connect();
    }

    /**
     *  getAvailableRooms
     * @param {Object} params
     * @param {Date} params.date
     * @param {Number} params.startPeriod
     * @param {Number} params.endPeriod
     * @param {Number} params.capacity
     * @param {Array} params.equipements
    */
    async getAvailableRooms(params) {
        const {date=null, 
            startPeriod=null, 
            endPeriod=null,
            capacity=null,
            equipements=[]
        } = params;
        console.log('params:::', params);
        // get reservation present for this date, with startPeriod or endPeriod included in the period and include capacity and equipements
        let reservations = []
        if (date && startPeriod && endPeriod) {
            reservations = await Reservation.find({
                date: date,
                $or: [
                    {startPeriod: {$gte: startPeriod, $lte: endPeriod}},
                    {endPeriod: {$gte: startPeriod, $lte: endPeriod}}
                ]

            });
            console.log('reservations:::', reservations);
        }

        let roomsAvailable = [];
        if (reservations.length > 0) { 
            // get all rooms
            const rooms = await Room.find({});
            // get all rooms id reserved
            const roomsIdReserved = reservations.map(reservation => reservation.roomId);
            console.log('roomsIdReserved:::', roomsIdReserved);
            // get all rooms available
            roomsAvailable = rooms.filter(room => !roomsIdReserved.includes(room._id.toString()));
            console.log('roomsAvailable:::', roomsAvailable);
        } else {
            roomsAvailable = await Room.find({});
            console.log('rooms:::', roomsAvailable);
        }


           // filter by capacity
        if (capacity) {
            roomsAvailable = roomsAvailable.filter(room => room.capacity >= capacity);
            console.log('roomsAvailable after:::', roomsAvailable);
        }
        // filter by equipements
        if (equipements && equipements.length > 0) {
            // check that each available room has all the equipements
            roomsAvailable = roomsAvailable.filter(room => {
                let hasAllEquipements = true;
                const req = room.equipements.reduce((acc, equipement) => {
                    acc.push(equipement[0].name);
                    return acc;
                }, []) || [];
                equipements.forEach(equipement => {
                    console.log('equipement:::', room.equipements, equipement);
                    if (!req.includes(equipement)) {
                        hasAllEquipements = false;
                    }
                });
                return hasAllEquipements;
            });
        }

        return roomsAvailable;

    }

    async createRoom(room) {
        let data = {};
        try {
            data = await Room.create(room);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateRoom(room) {
        let data = {};
        try {
            data = await Room.updateOne(room);
        } catch (err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteRoom(roomId) {
        let data = {};
        try {
            data = await Room.deleteOne({_id: roomId});
        } catch (err) {
            logger.error('Error::' + err);
        }
        return {
                status: `${
                data.deletedCount > 0 ? true : false
            }`
        };
    }

}

module.exports = new RoomRepository();
