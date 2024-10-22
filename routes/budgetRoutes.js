const express = require('express');
const router = express.Router();

const {
  CreateBudget,
  GetUserBudget,
  UpdateBudget,
  DeleteBudget,
} = require('../controllers/budgetController');

router
  .route('/')
  .post(CreateBudget)
  .get(GetUserBudget)
  .delete(DeleteBudget)
  .patch(UpdateBudget);

module.exports = router;
