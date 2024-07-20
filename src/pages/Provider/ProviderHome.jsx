import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getRequestApi, acceptRequestApi, rejectRequestApi, createNotificationApi, updateUserCoordinatesApi } from '../../apis/Api';
import ProviderNavbar from '../../components/ProviderNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const ProviderHome = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of requests to show per page
  const [providerId, setProviderId] = useState(null); // State to store the logged-in provider's ID
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

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
      console.error('Error fetching requests:', error.message);
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
        setRequests(requests.map(req => req._id === requestId ? { ...req, handled: true, accepted: true, rejected: false } : req)); // Mark request as handled and accepted
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error accepting request');
      console.error('Error accepting request:', error.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await rejectRequestApi(requestId);
      if (response.data.success) {
        toast.success('Request rejected');
        const request = requests.find((req) => req._id === requestId);
        await createNotification(request.userId, providerId, requestId, 'Your request has been rejected');
        setRequests(requests.map(req => req._id === requestId ? { ...req, handled: true, accepted: false, rejected: true } : req)); // Mark request as handled and rejected
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error rejecting request');
      console.error('Error rejecting request:', error.message);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const saveCoordinates = async (coords) => {
    try {
      const storedUserData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(storedUserData);
      const providerId = parsedUserData._id;
  
      const response = await updateUserCoordinatesApi(providerId, coords);
      console.log('Update coordinates response:', response);
  
      if (response.data.success) {
        toast.success('Location saved successfully');
      } else {
        toast.error('Failed to save location');
      }
    } catch (error) {
      toast.error('Error saving location');
      console.error('Error saving location:', error.message);
    }
  };

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(coords);
          console.log('Coordinates fetched:', coords);
          saveCoordinates(coords);
          setShowLocationAlert(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setShowLocationAlert(true);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCoordinates(coords);
          console.log('Coordinates fetched on load:', coords);
          saveCoordinates(coords);
          setShowLocationAlert(false);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setShowLocationAlert(true);
        }
      );
    } else {
      setShowLocationAlert(true);
    }
  }, []);

  return (
    <>
      <ProviderNavbar />
      {showLocationAlert && (
        <div className="fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-lg z-50">
          <p className="font-bold">Enable Location Services</p>
          <p>We need your location to provide better services.</p>
          <button
            onClick={handleEnableLocation}
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Enable Location
          </button>
        </div>
      )}
      <div className="container mx-auto my-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Service Requests</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b text-left">User Email</th>
                <th className="py-3 px-4 border-b text-left">User Name</th>
                <th className="py-3 px-4 border-b text-left">Price</th>
                <th className="py-3 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-100 transition duration-200">
                    <td className="py-3 px-4 border-b">{request.userId?.email}</td>
                    <td className="py-3 px-4 border-b">{request.userId?.firstName}</td>
                    <td className="py-3 px-4 border-b">{request.price || 'N/A'}</td>
                    <td className="py-3 px-4 border-b text-center">
                      {!request.handled ? (
                        <>
                          <button
                            onClick={() => handleAccept(request._id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2 transition duration-300"
                            disabled={request.accepted}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                            disabled={request.accepted}
                          >
                            Reject
                          </button>
                        </>
                      ) : request.accepted ? (
                        <span className="text-green-500">
                          <FontAwesomeIcon icon={faCheckCircle} /> Accepted
                        </span>
                      ) : request.rejected ? (
                        <span className="text-red-500">
                          <FontAwesomeIcon icon={faTimesCircle} /> Rejected
                        </span>
                      ) : (
                        <span className="text-gray-600">Handled</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-3 px-4 border-b text-center text-gray-600">
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
