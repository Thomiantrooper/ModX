const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const helmetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    }
});

const Helmet = mongoose.model("Helmet", helmetSchema);
module.exports = Helmet;
