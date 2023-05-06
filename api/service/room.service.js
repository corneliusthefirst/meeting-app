const roomRepository  = require('../repository/rooms.repository');

class RoomService {

    constructor() {}

    async getAvailableRooms(params) {
        return await roomRepository.getAvailableRooms(params);
    }

    async createRoom(room) {
        return await roomRepository.createRoom(room);
    }

    async updateRoom(room) {
        return await roomRepository.updateRoom(room);
    }

    async deleteRoom(roomId) {
        return await roomRepository.deleteRoom(roomId);
    }

}

module.exports = new RoomService();