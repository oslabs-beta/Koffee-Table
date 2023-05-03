const User = require('../mongooseDB');

const userController = {};

//create user based on create user route
userController.createUser = async (req, res, next) => {
  const { username, password, clientID, hostName, port } = req.body;

  try {
    const user = await User.findOne({ username });

    //checks if user already already exists
    if (user) {
      console.log('user already exists');
      res.locals.data = null;
      return next();
    }

    // creates user
    const data = await User.create({
      username,
      password,
      clientID,
      hostName,
      port,
    });
    res.locals.data = data;
    console.log('User created');
    return next();
  } catch (err) {
    return next({
      log: 'Error in userController.createUser',
      status: 400,
      message: { err: 'Error in userController.createUser' },
    });
  }
};


//verify user credentials
userController.login = (req, res, next) => {
  const { username, password } = req.query;
  User.findOne({ username })
    .then((data) => {

      //compares stored hash with received hash
      data.passwordCheck(password, function (err, verifyTrueFalse) {
        //if passwords match send data
        if (verifyTrueFalse) res.locals.data = data;
        //else return null
        else res.locals.data = null;
        return next();
      });
    })
    .catch((err) => {
      return next({
        log: 'Error in userController.login',
        status: 400,
        message: { err: 'Error in userController.login' },
      });
    });
};

module.exports = userController;
