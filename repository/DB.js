const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

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
    position: {lat: Number, lng: Number},
    geoLocation: {type: pointSchema, index: {type: '2dsphere', sparse: true}}
});

const CitySchema = new Schema({
    _id: String,
    country: {type: String, index: true},
    name: String,
    points: Number,
    countryId: {type: String, index: true},
    position: {lat: Number, lng: Number},
    geoLocation: {type: pointSchema, index: {type: '2dsphere', sparse: true}}
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
const City = mongoose.model('City', CitySchema);
const Event = mongoose.model('Event', EventSchema);

const db = new function() {
    mongoose.connect(process.env.MONGODB_URI);
    this.mongoose = mongoose;
    this.Schema = Schema;
    this.ObjectId = mongoose.Types.ObjectId;
    this.WorldParam = WorldParam;
    this.Country = Country;
    this.City = City;
    this.Event = Event;
};

process.on('exit', function() {
    console.log('Desconnecting db');
    mongoose.disconnect();
});

module.exports = db;
