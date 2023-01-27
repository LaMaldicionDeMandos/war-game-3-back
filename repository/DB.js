const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorldParamSchema = new Schema( {
   _id: String,
   key: {type: String, index: true},
   value: {}
});

const CountrySchema = new Schema({
    _id: String,
    code: {type: String, index: true},
    name: String,
    pib: Number,
    pop: Number,
});

const EventSchema = new Schema( {
    _id: String,
    countryId: {type: String, index: true},
    type: {type: String, enum: ['assign_budget', 'new_country']},
    date: {type: Date, index: true},
    payload: {},
    processed: {type: Boolean, index: true, default: false}
});

const WorldParam = mongoose.model('World', WorldParamSchema);
const Country = mongoose.model('Country', CountrySchema);
const Event = mongoose.model('Event', EventSchema);

const db = new function() {
    mongoose.connect(process.env.MONGODB_URI);
    this.mongoose = mongoose;
    this.Schema = Schema;
    this.ObjectId = mongoose.Types.ObjectId;
    this.WorldParam = WorldParam;
    this.Country = Country;
    this.Event = Event;
};

process.on('exit', function() {
    console.log('Desconnecting db');
    mongoose.disconnect();
});

module.exports = db;
