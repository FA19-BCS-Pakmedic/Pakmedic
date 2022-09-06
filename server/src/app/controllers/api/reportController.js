// import npm packages

// import models
const Patient = require("../../models").patient;
const Family = require("../../models").family;
const Report = require("../../models").report;

// import utils
const { catchAsync, AppError, deleteFile } = require("../../utils/helpers");
const {
  userNotFound,
  successfullyAdded,
  successfullyUpdated,
  successfullyDeleted,
} = require("../../utils/constants/RESPONSEMESSAGES");

// create report
exports.createReport = catchAsync(async (req, res, next) => {
  //get the logged in patient id
  const id = req.decoded.id;

  //   check if the report is for the family member of the patient
  let isFamilyReport = req.body?.isFamilyReport;

  //   extract the saved file name from req and store it in the body
  req.body.image = req.file.filename;

  //   extract the data from the body
  const { title, date, symptoms, lab, image } = req.body;

  //   find the patient based on id
  const patient = await Patient.findById(id);

  //   if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  isFamilyReport = isFamilyReport === "true";

  //   create a report object
  const report = new Report({
    title,
    date,
    symptoms,
    lab,
    image,
    isFamilyReport,
  });

  //   store the report object
  await report.save();

  //   push the object id of the saved report to the patient document
  patient.reports.push(report._id);

  await patient.save();

  //   if the report is for the family member
  if (isFamilyReport) {
    // extract the family member id
    const familyId = req.body.familyId;

    // console.log(typeof isFamilyReport);

    console.log(familyId);

    //   find the family member based on id
    const family = await Family.findById(familyId);

    console.log(family);
    //  if family member doesn't exist
    if (!family) {
      return next(new AppError(`Family member ${userNotFound}`, 404));
    }

    //   push the object id of the saved report to the family member document
    family.reports.push(report._id);

    await family.save();
  }

  res.status(201).json({
    status: "success",
    message: `Report ${successfullyAdded}`,
    data: {
      report,
    },
  });
});

// get report by id
exports.getReportById = catchAsync(async (req, res, next) => {
  // get the report id
  const id = req.params.id;

  // find the report
  const report = await Report.findById(id);

  // if report doesn't exist
  if (!report) {
    return next(new AppError(`Report ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      report,
    },
  });
});

// get reports by patient id
exports.getReportsByPatientId = catchAsync(async (req, res, next) => {
  // get the patient id
  const id = req.decoded?.id || req.params?.id;

  // find the patient
  const patient = await Patient.findById(id).populate("reports");

  // if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      reports: patient.reports,
    },
  });
});

exports.getReportsOfAllFamilyMembers = catchAsync(async (req, res, next) => {
  // get the patient id
  const id = req.decoded?.id || req.params?.id;

  // find the patient
  const patient = await Patient.findById(id).populate({
    path: "familyMembers",
    model: "Family",
    populate: {
      path: "reports",
      model: "Report",
    },
  });

  // if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  const familyReports = patient.familyMembers.map((familyMember) => {
    return familyMember.reports;
  });

  res.status(200).json({
    status: "success",
    data: {
      reports: familyReports,
    },
  });
});

// get reports by family member id
exports.getReportsByFamilyId = catchAsync(async (req, res, next) => {
  // get the family member id
  const id = req.params.id;

  // find the family member
  const family = await Family.findById(id).populate("reports");

  // if family member doesn't exist
  if (!family) {
    return next(new AppError(`Family member ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      reports: family.reports,
    },
  });
});

// update report data
exports.updateReport = catchAsync(async (req, res, next) => {
  //get report id
  const id = req.params.id;

  const data = req.body;

  //find the report
  const report = await Report.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    {
      new: true,
    }
  );

  //if report doesn't exist
  if (!report) {
    return next(new AppError(`Report ${userNotFound}`, 404));
  }

  res.status(200).json({
    status: "success",
    message: `Report ${successfullyUpdated}`,
    data: {
      report,
    },
  });
});


//selective file update out of the multiple files issue#43

// delete the report along with its id in the patient's collection and in the family member's collection
exports.deleteReport = catchAsync(async (req, res, next) => {
  // get patient id
  const id = req.decoded.id;

  // get report id
  const reportId = req.params.id;

  //   check if the report is a family report

  // find the patient
  const patient = await Patient.findById(id);
  //   .populate({
  //     path: "familyMembers",
  //     model: "Family",
  //     populate: {
  //       path: "reports",
  //       model: "Report",
  //     },
  //   });

  //   console.log(patient);

  // if patient doesn't exist
  if (!patient) {
    return next(new AppError(`Patient ${userNotFound}`, 404));
  }

  // find the report
  const report = await Report.findById(reportId);
  //   console.log(report);

  // if report doesn't exist
  if (!report) {
    return next(new AppError(`Report ${userNotFound}`, 404));
  }

  //   delete the relative report file !!!! this function will be replaced by multiple files deletion function
  deleteFile(report.image, "images");

  //delete the report
  await report.remove();

  // delete the report id from the patient's collection
  patient.reports = patient.reports.filter((report) => report.toString() !== reportId);

  await patient.save();

  // if the report is for the family member
  if (report.isFamilyReport) {
    patient.familyMembers.map(async (familyId) => {
      const familyMember = await Family.findById(familyId);
      console.log("Family Member", familyMember);
      familyMember.reports = familyMember.reports.filter((report) => {
        console.log("family Report", report.toString());
        return report.toString() !== reportId;
      });
      await familyMember.save();
    });
    console.log("yes this is a family report");
  }

  res.status(200).json({
    status: "success",
    message: `Report ${successfullyDeleted}`,
  });
});
