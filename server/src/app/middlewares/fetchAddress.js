// import utils
const { catchAsync, AppError, fetchGeocode } = require("../utils/helpers");

// import address model
const Address = require("../models").address;

module.exports = catchAsync(async (req, res, next) => {
  const { address, city } = req.body;
  const state = req.body?.state || "";
  // fetching latitude and and longitude coordinates of the address
  const { lat, lng } = await fetchGeocode(`${address}, ${city}, ${state}`);

  // creating new address object
  const newAddress = new Address({
    address,
    city,
    state,
    lat,
    lng,
  });

  // saving new address object to the database
  const data = await newAddress.save();
  console.log(data);

  //   saving the returned object from mongodb in body
  req.body.address = data._id;
  next();
});
