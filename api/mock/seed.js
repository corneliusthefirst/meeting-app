const { connect, disconnect } = require("../config/db.config");
const  { Room } = require("../model/room.model");
const salles = require("./salles.json");
console.log('here bro:::', salles);

connect();

const seedDB = async () => {
    await Room.deleteMany({});
    console.log('data before:::', salles);
    console.log('data:::', salles.rooms);
    await Room.insertMany(salles.rooms);
}

seedDB().then(() => {
    console.log('seeded');
    disconnect();
}).catch(err => {
    console.log('error:::', err);
    disconnect();
});
