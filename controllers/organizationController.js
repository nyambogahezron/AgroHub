const CustomError = require('../errors');
const Organization = require('../models/organization');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../middleware/asyncHandler');


// @ Get User's Organization
// @ endpoint /api/v1/org/:id
// @ method GET
const GetUserOrganization = asyncWrapper(async (req, res) => {
  res.send('get user organization');
});

// @ Create Organization
// @ endpoint /api/v1/org
// @ method POST
const CreateOrganization = asyncWrapper(async (req, res) => {
  res.send('create organization');
});


// @ Update Organization
// @ endpoint /api/v1/org/
// @ method PATCH
const UpdateOrganization = asyncWrapper(async (req, res) => {
  res.send('update organization');
});

// @ Update Organization
// @ endpoint /api/v1/org/
// @ method DELETE
const DeleteOrganization = asyncWrapper(async (req, res) => {
  res.send('delete organization');
});

module.exports = {
  CreateOrganization,
  GetUserOrganization,
  UpdateOrganization,
  DeleteOrganization
};
