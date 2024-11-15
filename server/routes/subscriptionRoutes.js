const express = require('express');
const router = express.Router();

const {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/subscriptionControllers');

router.route('/').post(createSubscription).get(getUserSubscriptions);
router.route('/:id').patch(updateSubscription).delete(deleteSubscription);

module.exports = router;
