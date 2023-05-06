const { connect } = require('../config/db.config');
const { Reservation } = require('../model/reservation.model');
const logger = require('../logger/api.logger');

class ReservationRepository {

    constructor() {
        connect();
    }

    async getReservations(params) {
        const reservations = await Reservation.find(params);
        console.log('reservations:::', reservations);
        return reservations;
    }

    /**
     * 
     * @param { } reservation
     * @param {Date} reservation.date
     * @param {Number} reservation.startPeriod
     * @param {Number} reservation.endPeriod
     * @param {String} reservation.roomId
     * @returns {Object} reservation
     */
    async createReservation(reservation) {
        let data = {};
        try {
           /**create reservation with unique date and no period overlap between startPeriod and endPeriod */
            const reservationExist = await Reservation.find({
                date: reservation.date,
                $or: [
                    {startPeriod: {$gte: reservation.startPeriod, $lte: reservation.endPeriod}},
                    {endPeriod: {$gte: reservation.startPeriod, $lte: reservation.endPeriod}}
                ]
            });
            if (reservationExist.length > 0) {
                throw new Error('Reservation already exist for this date and period');
            }
            data = await Reservation.create(reservation);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateReservation(reservation) {
        let data = {};
        try {
            data = await Reservation.updateOne(reservation);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteReservation(reservationId) {
        let data = {};
        try {
            data = await Reservation.deleteOne({_id : reservationId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new ReservationRepository();