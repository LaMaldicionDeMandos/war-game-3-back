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
    //TODO Create event new Country to all countries after 5 minutes
    return country;
  }

  setCurrentDate(currentDate) {
    return worldRepo.setCurrentDate(currentDate);
  }
}

const service = new WorldService();

module.exports = service;
