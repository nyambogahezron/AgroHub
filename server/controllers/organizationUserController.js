const OrganizationUser = require('../models/OrganizationUser');
const Organization = require('../models/organization');
const CustomError = require('../errors');
const asyncHandler = require('../middleware/asyncHandler');
const { StatusCodes } = require('http-status-codes');

// @desc  Get all organization users
// @route GET /api/v1/organization-users
// @access Private

exports.getOrganizationUsers = asyncHandler(async (req, res, next) => {
  const user = req.user.userId;

  const users = await OrganizationUser.find({ user: user });

  if (!users) {
    throw new CustomError.NotFoundError('No organization users found');
  }

  res.status(StatusCodes.OK).json({ success: true, users: users });
});

// @desc      Get single organization user
// @route     GET /api/v1/organization-users/:id
// @access    Private
exports.getOrganizationUserById = asyncHandler(async (req, res, next) => {
  const organizationUser = await OrganizationUser.findById(req.params.id);

  if (!organizationUser) {
    return next(
      new CustomError(
        `Organization user not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: organizationUser });
});

// @desc  Create new organization user
// @route POST /api/v1/org-user
// @access Private
exports.createOrganizationUser = asyncHandler(async (req, res) => {
  const user = req.user.userId;

  const { organization, name, email, phone, location, role, date } = req.body;

  if (!organization) {
    throw new CustomError.BadRequestError('Invalid organization');
  }
  if (!name || !email || !phone || !location) {
    throw new CustomError.BadRequestError('Please provide all  fields');
  }

  const isOrgForUser = await Organization.findOne({
    user: user,
    _id: organization,
  });

  if (!isOrgForUser) {
    throw new CustomError.BadRequestError('Invalid organization');
  }

  const organizationUser = await OrganizationUser.create({
    user,
    organization,
    name,
    email,
    phone,
    location,
    role,
    date,
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: organizationUser,
  });
});

// @desc  Update organization user
// @route PATCH /api/v1/org-user/:id
// @access Private
exports.updateOrganizationUser = asyncHandler(async (req, res) => {
  const user = req.user.userId;

  const { organization, name, email, phone, location, role, date } = req.body;

  if (!organization) {
    throw new CustomError.BadRequestError('Invalid organization');
  }

  const isOrgForUser = await Organization.findOne({
    user: user,
    _id: organization,
  });

  if (!isOrgForUser) {
    throw new CustomError.BadRequestError('Invalid organization');
  }

  const organizationUser = await OrganizationUser.findById(req.params.id);

  if (!organizationUser) {
    throw new CustomError.NotFoundError(
      `Organization user not found with id of ${req.params.id}`
    );
  }

  organizationUser.user = user || organizationUser.user;
  organizationUser.organization = organization || organizationUser.organization;
  organizationUser.name = name || organizationUser.name;
  organizationUser.email = email || organizationUser.email;
  organizationUser.phone = phone || organizationUser.phone;
  organizationUser.location = location || organizationUser.location;
  organizationUser.role = role || organizationUser.role;
  organizationUser.date = date || organizationUser.date;

  await organizationUser.save();

  res.status(200).json({ success: true, data: organizationUser });
});

// @desc  Delete organization user
// @route DELETE /api/v1/org-user/:id
// @access Private
exports.deleteOrganizationUser = asyncHandler(async (req, res, next) => {
  const organizationUser = await OrganizationUser.findOne({
    _id: req.params.id,
    user: req.user.userId,
  });

  if (!organizationUser) {
    throw new CustomError.NotFoundError(
      `Organization user not found with id of ${req.params.id}`
    );
  }

  await organizationUser.deleteOne();

  res.status(200).json({ success: true, msg: 'Organization user deleted' });
});

// @desc      Upload photo for organization user
// @route     PUT /api/v1/organization-users/:id/photo
// @access    Private
exports.organizationUserPhotoUpload = asyncHandler(async (req, res, next) => {
  const organizationUser = await OrganizationUser.findById(req.params.id);

  if (!organizationUser) {
    return next(
      new CustomError(
        `Organization user not found with id of ${req.params.id}`,
        404
      )
    );
  }

  if (!req.files) {
    return next(new CustomError(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new CustomError(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new CustomError(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${organizationUser._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new CustomError(`Problem with file upload`, 500));
    }

    await OrganizationUser.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
