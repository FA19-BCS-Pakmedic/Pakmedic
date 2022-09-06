// import npm packages

// import models
const Family = require("../../models").family;
const Patient = require("../../models").patient;

// import utils
const { AppError, catchAsync } = require("../../utils/helpers");
const {
  successfullyAdded,
  userNotFound,
  successfullyUpdated,
} = require("../../utils/constants/RESPONSEMESSAGES");

// add a family member
exports.addFamilyMember = catchAsync(async (req, res, next) => {
  // get the parent id
  const patientId = req.decoded.id;

  //   extract data from the body
  const {
    name,
    age,
    relation,
    weight,
    height,
    bloodType,
    allergies,
    surgeries,
    geneticDiseases,
  } = req.body;

  // create a family Object
  const family = new Family({
    name,
    age,
    relation,
    bio: { weight, height, bloodType },
    medical: { allergies, surgeries, geneticDiseases },
  });

  // save the family member
  await family.save();

  // add family member to the patient collection
  const patient = await Patient.findById(patientId);
  patient.familyMembers.push(family._id);
  await patient.save();

  res.status(200).json({
    status: "success",
    message: `Family member ${successfullyAdded}`,
    data: {
      family,
    },
  });
});

// get the family member based on id
exports.getFamilyMemberById = catchAsync(async (req, res, next) => {
  // get the family member id
  const familyId = req.params.id;

  // get the family member
  const family = await Family.findById(familyId);

  // check if the family member exists
  if (!family) {
    return next(new AppError(`family member ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      family,
    },
  });
});

// update family member
exports.updateFamilyMember = catchAsync(async (req, res, next) => {
  // get member's id
  const familyId = req.params.id;

  // get the data from the body
  const {
    name,
    age,
    relation,
    weight,
    height,
    bloodType,
    allergies,
    surgeries,
    geneticDiseases,
  } = req.body;

  // update the family member
  const family = await Family.findByIdAndUpdate(familyId, {
    name,
    age,
    relation,
    bio: { weight, height, bloodType },
    medical: { allergies, surgeries, geneticDiseases },
  });

  // check if the family member exists
  if (!family) {
    return next(new AppError(`family member ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    message: `Family member ${successfullyUpdated}`,
    data: {
      family,
    },
  });
});
