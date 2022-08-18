const AppError = require("../utils/helpers/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.decoded.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
