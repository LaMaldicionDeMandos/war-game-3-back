const db = require('./DB');
const _ = require('lodash');

class CityRepository {
    newCity(cityDTO) {
        const city = new db.City();
        city._id = new db.ObjectId();
        city.country = cityDTO.country;
        city.name = cityDTO.name;
        city.points = cityDTO.points;
        city.countryId = cityDTO.countryId;
        city.position = cityDTO.position;
        city.geoLocation = {type: 'Point', coordinates: [cityDTO.position.lng, cityDTO.position.lat]};
        return city.save();
    }
}

const repo = new CityRepository();

module.exports = repo;
