const reservationRepository  = require('../repository/reservations.repository');

class ReservationService {

    constructor() {}

    async getReservations() {
        return await reservationRepository.getReservations();
    }

    async createReservation(reservation) {
        return await reservationRepository.createReservation(reservation);
    }

    async updateReservation(reservation) {
        return await reservationRepository.updateReservation(reservation);
    }

    async deleteReservation(reservationId) {
        return await reservationRepository.deleteReservation(reservationId);
    }

}

module.exports = new ReservationService();