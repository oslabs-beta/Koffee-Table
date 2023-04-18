const User = require("./mongooseDB")

// destructuring - create same user twice - username update


const userController = {};

userController.creatUser = async (req, res, next) => {

  const { username, password, clientID, hostName, port } = req.body;

  try{
    const user = await User.findOne({username})
    
    if(user) {
      console.log('user already exists')
      res.locals.data = null;
      return next()
    }

    const data = await User.create({
      username,
      password, 
      clientID, 
      hostName, 
      port
    })
    res.locals.data = data;
    console.log('User created')
    return next()
  }

  catch(err){
    return next({
      log: 'Error in userController.creatUser',
      status: 418,
      message: { err: 'Error in userController.creatUser' },
    })
  }
  
};

userController.readUser = (req, res, next) => {

  if(!(Object.keys(req.query).length)) return next({
    log: 'no user defined',
    status: 418,
    message: { err: "no user defined" }
  })

  User.findOne(req.query)
  .then((data) => {
    console.log(data)
    res.locals.data = data;
    console.log('User found')
    return next()
  })
  .catch(err => {
    return next({
        log: 'Error in userController.readUser',
        status: 418,
        message: { err: 'Error in userController.readUser' },
    })
  })
};

userController.findAndUpdate = (req, res, next) => {
  const { username, password, clientID, hostName, port } = req.body;

  if(!(Object.keys(req.query).length)) return next({
    log: 'no user defined',
    status: 418,
    message: { err: "no user defined" }
  })

  User.findOneAndUpdate( req.query , {password, clientID, hostName, port})
  .then((data) => {
    res.locals.data = data;
    console.log('User updated')
    return next()
  })
  .catch(err => {
    return next({
        log: 'Error in userController.findOneAndUpdate',
        status: 418,
        message: { err: 'Error in userController.findOneAndUpdate' },
    })
  })
};
userController.deletUser = (req, res, next) => {

  if(!(Object.keys(req.query).length)) return next({
    log: 'no user defined',
    status: 418,
    message: { err: "no user defined" }
  })

  User.deleteOne(req.query)
  .then((data) => {
    res.locals.data = data;
    console.log('User deleted')
    return next()
  })
  .catch(err => {
    return next({
        log: 'Error in userController.deletUser',
        status: 418,
        message: { err: 'Error in userController.deletUser' },
    })
  })
};


userController.selfDestruct = (req, res, next) => {
  User.deleteMany({})
  .then((data) => {
    res.locals.data = data;
    console.log('databank has been nuked')
    return next()
  })
  .catch(err => {
    return next({
        log: 'Error in userController.selfDestruct',
        status: 418,
        message: { err: 'Error in userController.selfDestruct' },
    })
  })
};

userController.login = (req, res, next) => {

  console.log(req.query)

  User.findOne(req.query)
  .then((data) => {
    res.locals.data = data;
    console.log('User logged in')
    return next()
  })
  .catch(err => {
    return next({
        log: 'Error in userController.login',
        status: 418,
        message: { err: 'Error in userController.login' },
    })
  })
}




module.exports = userController;

