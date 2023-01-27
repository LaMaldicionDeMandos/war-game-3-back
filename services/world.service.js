const _ = require('lodash');
const countryRepo = require('../repository/country.repository');
const worldRepo = require('../repository/wold.repository');
const eventRepo = require('../repository/event.repository');

const { eventBuilder } = require('../utils/event_builder');

class WorldService {

  async addCountry(countryDto) {
    const exists = await this.#existsCountryCode(countryDto.code);
    if (exists) return Promise.reject({message: `Country ${countryDto.code} already exists.`});
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

  getCurrentDate() {
    return worldRepo.getCurrentDate();
  }

  setCurrentDate(currentDate) {
    return worldRepo.setCurrentDate(currentDate);
  }

  async getNextEvent() {
    const currentDate = await this.getCurrentDate();
    return eventRepo.nextAfter(currentDate);
  }

  async #doByCountryBut(countryId, action) {
    const countries = await countryRepo.findAllBut(countryId);
    return this.#doByCountry(action, countries);
  }

  #doByCountry(action, countries) {
    _.each(countries, (country) => action(country));
  }

  #existsCountryCode(countryCode) {
    return countryRepo.existsByCode(countryCode);
  }
}

const service = new WorldService();

module.exports = service;
