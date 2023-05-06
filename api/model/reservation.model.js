const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
                roomId: 'string',
                date: 'date',
                startPeriod: 'number',
                endPeriod: 'number',
                createdAt: 'date',
                updatedAt: 'date'},
                { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

const Reservation = mongoose.model('reservations', reservationSchema);

module.exports = {
    Reservation
}

