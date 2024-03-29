const sendErrorDev = (err, req, res) => {
  console.log("HEY");
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if ((process.env.NODE_ENV = "development")) {
    sendErrorDev(err, req, res);
  } else if ((process.env.NODE_ENV = "production")) {
    sendErrorProd(err, req, res);
  }
};
