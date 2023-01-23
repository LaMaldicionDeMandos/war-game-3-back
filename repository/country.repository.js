const db = require('./DB');

class CountryRepository {
    newCountry(countryDTO) {
        const country = new db.Country();
        country._id = new db.ObjectId();
        country.code = countryDTO.code;
        country.name = countryDTO.name;
        country.pib = countryDTO.pib;
        country.pop = countryDTO.pop;

        return country.save();
    }

    findAllBut(countryId) {
        return db.Country.find({_id: {$ne: countryId}});
    }

    existsByCode(countryCode) {
        return db.Country.exists({code: countryCode});
    }
}

const repo = new CountryRepository();

module.exports = repo;
