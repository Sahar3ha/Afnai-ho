import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRequestApi, acceptRequestApi, rejectRequestApi, createNotificationApi } from '../../apis/Api';
import ProviderNavbar from '../../components/ProviderNavbar';

const ProviderHome = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of requests to show per page
  const [providerId, setProviderId] = useState(null); // State to store the logged-in provider's ID

  useEffect(() => {
    // Get provider's ID from local storage or context
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setProviderId(parsedUserData._id); // Assuming the provider's ID is stored in the '_id' field
    } else {
      toast.error('User data not found');
    }
  }, []);

  useEffect(() => {
    if (providerId) {
      fetchRequests(providerId, page, limit);
    }
  }, [providerId, page]);

  const fetchRequests = async (providerId, page, limit) => {
    try {
      const response = await getRequestApi(providerId, page, limit);
      if (response.data.success) {
        setRequests(response.data.requests || []); // Ensure requests is always an array
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching requests');
      console.error(error.message);
    }
  };

  const createNotification = async (userId, providerId, requestId, message) => {
    try {
      await createNotificationApi({ userId, providerId, requestId, message });
      console.log('Notification created successfully');
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const response = await acceptRequestApi(requestId);
      if (response.data.success) {
        toast.success('Request accepted');
        const request = requests.find((req) => req._id === requestId);
        await createNotification(request.userId, providerId, requestId, 'Your request has been accepted');
        fetchRequests(providerId, page, limit); // Refresh the request list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error accepting request');
      console.error(error.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await rejectRequestApi(requestId);
      if (response.data.success) {
        toast.success('Request rejected');
        const request = requests.find((req) => req._id === requestId);
        await createNotification(request.userId, providerId, requestId, 'Your request has been rejected');
        fetchRequests(providerId, page, limit); // Refresh the request list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error rejecting request');
      console.error(error.message);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
      <ProviderNavbar />
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Service Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b text-left">User Email</th>
                <th className="py-3 px-4 border-b text-left">User Name</th>
                <th className="py-3 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-100 transition duration-200">
                    <td className="py-3 px-4 border-b">{request.userId?.email}</td>
                    <td className="py-3 px-4 border-b">{request.userId?.firstName}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleAccept(request._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2 transition duration-300"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-3 px-4 border-b text-center text-gray-600">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400 transition duration-300"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProviderHome;
