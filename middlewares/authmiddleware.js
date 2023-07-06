const jwt = require('jsonwebtoken');

//protected routes token based

const requireSignIn = async (request, response, next) => {
  try {
    const decode = jwt.verify(
      request.headers.authorization,
      process.env.jwtsecret
    );
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.requireSignIn = requireSignIn;
