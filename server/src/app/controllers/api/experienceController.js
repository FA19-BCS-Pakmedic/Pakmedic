// importing utils
const { AppError, catchAsync } = require("../../utils/helpers");
const { noExpFound } = require("../../utils/constants/RESPONSEMESSAGES");

// importing model
const Experience = require("../../models").experience;

// add experience
exports.addExperience = catchAsync(async (req, res, next) => {
  const { title, hospital } = req.body;

  const experience = new Experience({ title, hospital });

  await experience.save();

  res.status(200).json({
    status: "success",
    data: {
      experience,
    },
  });
});

// get all experiences
exports.getAllExperiences = catchAsync(async (req, res, next) => {
  //   getting all the experiences documents and populating the hospital fields
  let experiences = await Experience.find().populate({
    path: "hospital",
    populate: { path: "address", model: "Address" },
  });

  //   if no experiences found
  if (!experiences.length) {
    return next(new AppError(noExpFound, 404));
  }

  res.status(200).json({
    status: "success",
    results: experiences.length,
    data: {
      experiences,
    },
  });
});

// get experience by id
exports.getExperienceById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const experience = await Experience.findById(id).populate({
    path: "hospital",
    populate: { path: "address", model: "Address" },
  });

  if (!experience) {
    return next(new AppError(noExpFound, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      experience,
    },
  });
});

//update experience
exports.updateExperience = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { title, hospital } = req.body;
  const experience = await Experience.findById(id);
  if (!experience) {
    return next(new AppError(noExpFound, 404));
  }
  experience.title = title;
  experience.hospital = hospital;
  await experience.save();
  res.status(200).json({
    status: "success",
    data: {
      experience,
    },
  });
});

// delete experience
exports.deleteExperience = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const experience = await Experience.findByIdAndDelete(id);
  if (!experience) {
    return next(new AppError(noExpFound, 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
