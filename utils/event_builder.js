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

  createNewCountryEvent(countryId, currentDate, country) {
    return {
      countryId: countryId,

    }
  }
}

const eventBuilder = new EventBuilder();

module.exports = {eventBuilder, ASSIGN_BUDGET_EVENT, NEW_COUNTRY_EVENT};
