import React, { useEffect, useState } from 'react';
import { deleteNotificationApi, getNotificationApi } from '../apis/Api';
import Example from '../components/Navbar';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const storedUserData = localStorage.getItem('user');
    const parsedUserData = JSON.parse(storedUserData);
    const id = parsedUserData._id;
    try {
      const response = await getNotificationApi(id);
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const handleClearAll = async () => {
    const storedUserData = localStorage.getItem('user');
    const parsedUserData = JSON.parse(storedUserData);
    const userId = parsedUserData._id;

    try {
      await deleteNotificationApi(userId);

      setNotifications([]);
      console.log('All notifications cleared successfully.');
    } catch (error) {
      console.error('Error clearing notifications:', error.message);
    }
  };

  return (
    <>
      <Example />
      <div className="bg-gray-100 min-h-screen flex flex-col sm:flex-row justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mt-4 sm:mt-0 sm:ml-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notifications</h2>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md mb-4">
                <div className="text-lg font-semibold text-gray-800">{notification.providerId.firstName}</div>
                <div className="text-sm text-gray-600">
                  {notification.requestId.accepted
                    ? `has accepted the request`
                    : `has rejected the request`}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No notifications available.</p>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
