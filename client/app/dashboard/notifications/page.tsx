'use client';

import React, { useState } from 'react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: 'Notification 1', read: false },
    { id: 2, message: 'Notification 2', read: false },
    { id: 3, message: 'Notification 3', read: false },
  ]);

  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const viewNotification = (id: number) => {
    alert(`Viewing notification: ${id}`);
  };

  return (
    <div>
      <h1>Notifications</h1>
      <button onClick={deleteAllNotifications}>Delete All</button>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            style={{
              textDecoration: notification.read ? 'line-through' : 'none',
            }}
          >
            {notification.message}
            <button onClick={() => viewNotification(notification.id)}>
              View
            </button>
            <button onClick={() => markAsRead(notification.id)}>
              Mark as Read
            </button>
            <button onClick={() => deleteNotification(notification.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
