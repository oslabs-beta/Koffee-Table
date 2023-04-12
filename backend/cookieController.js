const cookieController = {};

cookieController.setCookie = async (req, res, next) => {
  try {
    res.cookie('port', res.locals.port);
    res.cookie('clienid', res.locals.clientId);
    res.cookie('hostName', res.locals.hostName);
    return next();
  } catch (err) {
    return next({
      log: 'Error in cookieController.setCookie, could not set cookies',
      status: 404,
      message: { err: 'Error in cookieController.setCookie' },
    });
  }
};

module.exports = cookieController;
