const mongoose = require('mongoose');

const fanSchema = mongoose.Schema({
  fanName: {type: String, required: true, unique: true},
  fanSpecs: {type: String, required: true},
  pastSpecs: {type: String, required: true},
  //image: {type: String, required: true}
});

module.exports = mongoose.model('Fan', fanSchema);
