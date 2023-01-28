const _ = require('lodash');
const worldRepo = require('../repository/wold.repository');
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
}

const service = new WorldService();

module.exports = service;
