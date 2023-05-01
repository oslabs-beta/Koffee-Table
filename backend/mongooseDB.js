const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const URI = 'mongodb+srv://kafka-team:kafka-team@cluster0.aznay8h.mongodb.net/test';
const SALT_WORK_FACTOR = 12;

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

userSchema.pre('save', function(next){
  const user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(saltError, salt) {
    if (saltError) {
      return next(saltError);
    }
    else{
      bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        }
        else{
          user.password = hash;
          return next();
        }
      })
    }
  })
})

userSchema.methods.passwordCheck = function(input, cb) {
  bcrypt.compare(input, this.password, function(err, result){
    if (err) return cb(err);
    return cb(null, result);
  })
}



const User = mongoose.model('users', userSchema);

module.exports = User;