const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');
const {
  createOrganizationUser,
  getOrganizationUsers,
  getOrganizationUserById,
  updateOrganizationUser,
  deleteOrganizationUser,
} = require('../controllers/organizationUserController');

router
  .route('/')
  .get(authenticateUser, getOrganizationUsers)
  .post(authenticateUser, createOrganizationUser);
router
  .route('/:id')
  .get(authenticateUser, getOrganizationUserById)
  .patch(authenticateUser, updateOrganizationUser)
  .delete(authenticateUser, deleteOrganizationUser);

module.exports = router;
