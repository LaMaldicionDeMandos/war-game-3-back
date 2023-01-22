const _ = require('lodash');
const countryRepo = require('../repository/country.repository');
const worldRepo = require('../repository/wold.repository');
const eventRepo = require('../repository/event.repository');

const { eventBuilder } = require('../utils/event_builder');

class WorldService {

  async addCountry(countryDto) {
    const country = await countryRepo.newCountry(countryDto);
    const currentDate = await worldRepo.getCurrentDate();
    const assignEvent = eventBuilder.createAssignBudgetEvent(country._id, currentDate);
    eventRepo.newEvent(assignEvent);
    this.#doByCountryBut(country._id, (c) => {
      const newCountryEvent = eventBuilder.createNewCountryEvent(c._id, currentDate, country);
      eventRepo.newEvent(newCountryEvent);
    })
    return country;
  }

  setCurrentDate(currentDate) {
    return worldRepo.setCurrentDate(currentDate);
  }

  async #doByCountryBut(countryId, action) {
    const countries = await countryRepo.findAllBut(countryId);
    return this.#doByCountry(action, countries);
  }

  #doByCountry(action, countries) {
    _.each(countries, (country) => action(country));
  }
}

const service = new WorldService();

module.exports = service;
