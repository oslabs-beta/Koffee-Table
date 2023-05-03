const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

//add your own MongoDB connection string as an environment variable
const URI = `${process.env.URI}`;
const SALT_WORK_FACTOR = 12;

//connect to database
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Cluster0',
  })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log('error in connection to db', err));

const Schema = mongoose.Schema;

//establish user schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  clientID: { type: String, required: false },
  hostName: { type: String, required: false },
  port: { type: Number, required: false },
});

//hash password on user creation before it is saved in database
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (saltError, salt) {
    if (saltError) {
      return next(saltError);
    } else {
      bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        } else {
          user.password = hash;
          return next();
        }
      });
    }
  });
});

//method to compare password on login
userSchema.methods.passwordCheck = function (input, cb) {
  bcrypt.compare(input, this.password, function (err, result) {
    if (err) return cb(err);
    return cb(null, result);
  });
};

const User = mongoose.model('users', userSchema);

module.exports = User;
