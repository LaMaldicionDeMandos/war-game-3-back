const _ = require('lodash');
const worldRepo = require('../repository/wold.repository');
const cityRepo = require('../repository/city.repository');
const eventRepo = require('../repository/event.repository');

class WorldService {

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

  getAllCities() {
    return cityRepo.getAll();
  }
}

const service = new WorldService();

module.exports = service;
