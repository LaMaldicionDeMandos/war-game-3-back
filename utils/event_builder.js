const moment = require('moment');
const _ = require('lodash');

const ASSIGN_BUDGET_EVENT = 'assign_budget';
const NEW_COUNTRY_EVENT = 'new_country';

class EventBuilder {
  createAssignBudgetEvent(countryId, currentDate) {
    return {
      countryId: countryId,
      type: ASSIGN_BUDGET_EVENT,
      date: currentDate,
    };
  }

  #assignEventDelay(ev, currentDate, delay) {
    const date = moment(currentDate);
    date.add(delay.value, delay.unit);
    return _.assign(ev, {date: date.format('YYYY-MM-DD HH:mm:ss')});
  }
}

const eventBuilder = new EventBuilder();

module.exports = {eventBuilder, ASSIGN_BUDGET_EVENT, NEW_COUNTRY_EVENT};
