import express from 'express';
const router = express.Router();

import {
	createSubscription,
	getUserSubscriptions,
	updateSubscription,
	deleteSubscription,
} from '../controllers/subscriptionControllers';

router.route('/').post(createSubscription).get(getUserSubscriptions);
router.route('/:id').patch(updateSubscription).delete(deleteSubscription);

export default router;
