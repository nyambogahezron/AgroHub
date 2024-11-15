const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  CreateOrganization,
  GetUserOrganization,
  UpdateOrganization,
  DeleteOrganization,
  GetSingleOrganization,
} = require('../controllers/organizationController');

router
  .route('/')
  .post(authenticateUser, CreateOrganization)
  .get(authenticateUser, GetUserOrganization);

router
  .route('/:id')
  .get(GetSingleOrganization)
  .delete(authenticateUser, DeleteOrganization)
  .patch(authenticateUser, UpdateOrganization);

module.exports = router;
