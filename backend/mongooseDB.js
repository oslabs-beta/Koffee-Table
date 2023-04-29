const mongoose = require('mongoose');

const URI = 'mongodb+srv://kafka-team:kafka-team@cluster0.aznay8h.mongodb.net/test';

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Cluster0'
})
.then(()=>console.log('connected to mongooseDb'))
.catch((err) => console.log('error in connection to mongooseDB', err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  clientID: {type: String, required: false},
  hostName: {type: String, required: false},
  port: {type: Number, required: false},
})

const User = mongoose.model('users', userSchema);

module.exports = User;