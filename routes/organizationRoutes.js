const express = require('express');
const router = express.Router();

const {
  CreateOrganization,
  GetUserOrganization,
  UpdateOrganization,
  DeleteOrganization,
} = require('../controllers/organizationController');

router
  .route('/')
  .post(CreateOrganization)
  .get(GetUserOrganization)
  .delete(DeleteOrganization)
  .patch(UpdateOrganization);

module.exports = router;
