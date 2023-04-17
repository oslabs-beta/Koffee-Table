const User = require("./mongooseDB")

// destructuring - create same user twice - username update


const userController = {};

userController.creatUser = (req, res, next) => {
  const { username, password, clientID, hostName, port } = req.body;
  User.create({
    username,
    password, 
    clientID, 
    hostName, 
    port
  })
  .then((data) => {
    res.locals.data = data;
    console.log('User created')
    return next()
  })
  .catch(err => {
    console.log(222)
    return next({
        log: 'Error in userController.creatUser',
        status: 418,
        message: { err: 'Error in userController.creatUser' },
    })
  })
};

userController.readUser = (req, res, next) => {

  //can be reached by http://localhost:8080/user?x=y id

  // const key = Object.keys(req.query)[0]
  // const value = req.query[key]
  // const target = {};
  // target[key] = value;
  // console.log(target)

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





module.exports = userController;

