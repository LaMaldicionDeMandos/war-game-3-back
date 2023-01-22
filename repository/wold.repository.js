const db = require('./DB');
const _ = require('lodash');

const CURRENT_DATE = 'current_date';

class WorldRepository {
    async setCurrentDate(currentDate) {
        let date = await this.getCurrentDate();
        if (!date) {
            date = new db.WorldParam();
            date._id = new db.ObjectId();
            date.key = CURRENT_DATE;
        }
        date.value = currentDate;

        return date.save();
    }

    async getCurrentDate() {
        const prop = await db.WorldParam.findOne({key: CURRENT_DATE});
        return prop.value;
    }
}

const repo = new WorldRepository();

module.exports = repo;
