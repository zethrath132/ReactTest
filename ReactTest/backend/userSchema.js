const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  /*image: {type: String, required: true},*/
  //djoin: {type: String, required: true}
  unhashed: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
