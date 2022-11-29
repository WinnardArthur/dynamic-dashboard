const mongoose = require('mongoose');
const data = require('../test.json')

const statSchema = mongoose.Schema({})

const Stats = mongoose.model("VisualizationData", statSchema);

module.exports = Stats;