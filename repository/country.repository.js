const db = require('./DB');
const _ = require('lodash');

class CountryRepository {
    newCountry(countryDTO) {
        const country = new db.Country();
        country._id = new db.ObjectId();
        country.code = countryDTO.code;
        country.name = countryDTO.name;
        country.pib = countryDTO.pib;
        country.pop = countryDTO.pop;
        country.position = countryDTO.position;
        country.geoLocation = {type: 'Point', coordinates: [countryDTO.position.lng, countryDTO.position.lat]};
        return country.save();
    }

    findAll() {
        return this.#findAllByQuery();
    }

    findAllBut(countryId) {
        return this.#findAllByQuery({_id: {$ne: countryId}});
    }

    existsByCode(countryCode) {
        return db.Country.exists({code: countryCode});
    }

    async #findAllByQuery(q) {
        return db.Country.find(q);
    }
}

const repo = new CountryRepository();

module.exports = repo;
