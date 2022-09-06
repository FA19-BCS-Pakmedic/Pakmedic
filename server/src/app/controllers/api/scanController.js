// import npm packages

// import models
const Scan = require("../../models").scan;
const Patient = require("../../models").patient;
const Family = require("../../models").family;

const {
  userNotFound,
  successfullyAdded,
  successfullyUpdated,
  successfullyDeleted,
} = require("../../utils/constants/RESPONSEMESSAGES");
// import utils
const { catchAsync, AppError, deleteFile } = require("../../utils/helpers");

// create scan
exports.createScan = catchAsync(async (req, res, next) => {
  //get the logged in patient id
  const id = req.decoded.id;

  //   check if the scan is for the family member of the patient
  let isFamilyScan = req.body?.isFamilyScan;

  //   extract the saved file name from req and store it in the body
  req.body.image = req.file.filename;

  //   extract the data from the body
  const { title, date, image } = req.body;

  //   find the patient based on id
  const patient = await Patient.findById(id);

  //   if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  isFamilyScan = isFamilyScan === "true";

  //   create a scan object
  const scan = new Scan({ title, date, image, isFamilyScan });

  //   store the scan object
  await scan.save();

  //   push the object id of the saved scan to the patient document
  patient.scans.push(scan._id);

  await patient.save();

  //   if the scan is for the family member
  if (isFamilyScan) {
    // extract the family member id
    const familyId = req.body.familyId;

    // console.log(typeof isFamilyScan);

    console.log(familyId);

    // find the family member
    // const family = await Family.findOne().where({ id: familyId });
    const family = await Family.findById(familyId);

    console.log(family);
    //  if family member doesn't exist
    if (!family) {
      return next(new AppError(`Family member ${userNotFound}`, 404));
    }

    //   push the object id of the saved scan to the family member document
    family.scans.push(scan._id);

    await family.save();
  }

  res.status(201).json({
    status: "success",
    message: `Scan ${successfullyAdded}`,
    data: {
      scan,
    },
  });
});

// get scan by id
exports.getScanById = catchAsync(async (req, res, next) => {
  // get the scan id
  const id = req.params.id;

  // find the scan
  const scan = await Scan.findById(id);

  // if scan doesn't exist
  if (!scan) {
    return next(new AppError(`Scan ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      scan,
    },
  });
});

// get scans by patient id
exports.getScansByPatientId = catchAsync(async (req, res, next) => {
  // get the patient id
  const id = req.decoded?.id || req.params?.id;

  // find the patient
  const patient = await Patient.findById(id).populate("scans");

  // if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      scans: patient.scans,
    },
  });
});

exports.getScansOfAllFamilyMembers = catchAsync(async (req, res, next) => {
  // get the patient id
  const id = req.decoded?.id || req.params?.id;

  // find the patient
  const patient = await Patient.findById(id).populate({
    path: "familyMembers",
    model: "Family",
    populate: {
      path: "scans",
      model: "Scan",
    },
  });

  // if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  const familyScans = patient.familyMembers.map((familyMember) => {
    return familyMember.scans;
  });

  res.status(200).json({
    status: "success",
    data: {
      scans: familyScans,
    },
  });
});

// get scans by family member id
exports.getScansByFamilyId = catchAsync(async (req, res, next) => {
  // get the family member id
  const id = req.params.id;

  // find the family member
  const family = await Family.findById(id).populate("scans");

  // if family member doesn't exist
  if (!family) {
    return next(new AppError(`Family member ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      scans: family.scans,
    },
  });
});

// update scan data
exports.updateScan = catchAsync(async (req, res, next) => {
  //get scan id
  const id = req.params.id;

  const { title, date } = req.body;

  //find the scan
  const scan = await Scan.findById(id);

  //if scan doesn't exist
  if (!scan) {
    return next(new AppError(`Scan ${userNotFound}`, 404));
  }

  scan.title = title;
  scan.date = date;

  await scan.save();

  res.status(200).json({
    status: "success",
    message: `Scan ${successfullyUpdated}`,
    data: {
      scan,
    },
  });
});

//selective file update out of the multiple files issue#43

// delete the scan along with its id in the patient's collection and in the family member's collection
exports.deleteScan = catchAsync(async (req, res, next) => {
  // get patient id
  const id = req.decoded.id;

  // get scan id
  const scanId = req.params.id;

  //   check if the scan is a family scan

  // find the patient
  const patient = await Patient.findById(id);
  //   .populate({
  //     path: "familyMembers",
  //     model: "Family",
  //     populate: {
  //       path: "scans",
  //       model: "Scan",
  //     },
  //   });

  //   console.log(patient);

  // if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  // find the scan
  const scan = await Scan.findById(scanId);
  //   console.log(scan);

  // if scan doesn't exist
  if (!scan) {
    return next(new AppError(`Scan ${userNotFound}`, 404));
  }

  //   delete the relative scan file !!!! this function will be replaced by multiple files deletion function
  deleteFile(scan.image, "images");

  //delete the scan
  await scan.remove();

  // delete the scan id from the patient's collection
  patient.scans = patient.scans.filter((scan) => scan.toString() !== scanId);

  await patient.save();

  // if the scan is for the family member
  if (scan.isFamilyScan) {
    patient.familyMembers.map(async (familyId) => {
      const familyMember = await Family.findById(familyId);
      console.log("Family Member", familyMember);
      familyMember.scans = familyMember.scans.filter((scan) => {
        console.log("family Scan", scan.toString());
        return scan.toString() !== scanId;
      });
      await familyMember.save();
    });
    console.log("yes this is a family scan");
  }

  res.status(200).json({
    status: "success",
    message: `Scan ${successfullyDeleted}`,
  });
});
