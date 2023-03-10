const _ = require('lodash');
const countryRepo = require('../repository/country.repository');
const cityRepo = require('../repository/city.repository');
const worldRepo = require('../repository/wold.repository');
const eventRepo = require('../repository/event.repository');

const { eventBuilder } = require('../utils/event_builder');

class CountriesService {

  async addCountry(countryDto) {
    const exists = await this.#existsCountryCode(countryDto.code);
    if (exists) return Promise.reject({message: `Country ${countryDto.code} already exists.`});
    const country = await countryRepo.newCountry(countryDto);
    const currentDate = await worldRepo.getCurrentDate();
    const assignEvent = eventBuilder.createAssignBudgetEvent(country._id, currentDate);
    eventRepo.newEvent(assignEvent);
    return country;
  }

  async addCity(countryCode, cityDto) {
    const country = await countryRepo.findByCode(countryCode);
    return cityRepo.newCity(_.assign(cityDto, {countryId: country._id}));
  }

  getAllCountries() {
    return countryRepo.findAll();
  }

  getCountry(id) {
    return countryRepo.findById(id);
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

const service = new CountriesService();

module.exports = service;
