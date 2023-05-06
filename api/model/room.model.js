const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
                name: 'string',
                description: 'string',
                capacity: 'number',
                equipements: 'Array',
                createdAt: 'date',
                updatedAt: 'date'},
                { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}});

const Room = mongoose.model('rooms', roomSchema);

module.exports = {
    Room
}