const express = require('express');

const router = express.Router();

const {
  getNotifications,
  createNotification,
  getNotification,
  deleteNotification,
  deleteAllNotifications,
} = require('../controllers/NotificationController');

const { authenticateUser } = require('../middleware/authentication');

router.get('/', authenticateUser, getNotifications);

router.post('/', authenticateUser, createNotification);

router.get('/:id', authenticateUser, getNotification);

router.delete('/:id', authenticateUser, deleteNotification);

router.delete('/', authenticateUser, deleteAllNotifications);

module.exports = router;
