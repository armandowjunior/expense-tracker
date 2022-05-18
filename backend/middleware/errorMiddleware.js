const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || res.statusCode;

  // if an error comes with a statusCode 200, set it to 500;
  statusCode === 200 ? (statusCode = 500) : statusCode;

  let message = err.message;

  if (statusCode === 401) {
    message = "Not authorized";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message)[0];
  }

  if (err.code === 11000 && err.keyPattern.email) {
    statusCode = 400;
    message = "User already exists";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
