const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authentication');

const {
  CreateBudget,
  GetUserBudget,
  GetUserOrgBudget,
  GetUserSingleBudget,
  UpdateBudget,
  DeleteBudget,
} = require('../controllers/budgetController');

router
  .route('/')
  .post(authenticateUser, CreateBudget)
  .get(authenticateUser, GetUserBudget);

router
  .route('/:id')
  .get(authenticateUser, GetUserSingleBudget)
  .delete(authenticateUser, DeleteBudget)
  .patch(authenticateUser, UpdateBudget);

router.route('/org/:id').get(authenticateUser, GetUserOrgBudget);

module.exports = router;
