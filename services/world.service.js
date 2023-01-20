const _ = require('lodash');
const countryRepo = require('../repository/country.repository');
const worldRepo = require('../repository/wold.repository');

class WorldService {

  addCountry(country) {
    return countryRepo.newProfile(country)
      .then(country => {
        //TODO Create event Assing Presupuesto
        return country;
      });
  }

  setCurrentDate(currentDate) {
    return worldRepo.setCurrentDate(currentDate);
  }
}

const service = new WorldService();

module.exports = service;
