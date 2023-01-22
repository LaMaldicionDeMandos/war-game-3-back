const db = require('./DB');

class EventRepository {
    newEvent(eventDTO) {
        const ev = new db.Event();
        ev._id = new db.ObjectId();
        ev.countryId = eventDTO.countryId;
        ev.type = eventDTO.type;
        ev.date = eventDTO.date;
        ev.payload = eventDTO.payload;

        return ev.save();
    }
}

const repo = new EventRepository();

module.exports = repo;
