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
}

const repo = new CountryRepository();

module.exports = repo;
