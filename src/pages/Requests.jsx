import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getActivatedRequestsApi, completeRequestApi, cancelRequestApi } from '../apis/Api'; // Ensure this API function is defined
import Example from '../components/Navbar';
import Rating from 'react-rating-stars-component';
import KhaltiCheckout from 'khalti-checkout-web';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of requests to show per page
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests(page, limit);
  }, [page]);

  const fetchRequests = async (page, limit) => {
    try {
      const storedUserData = localStorage.getItem('user');
      if (!storedUserData) {
        console.error('No user data found in localStorage');
        return;
      }

      const parsedUserData = JSON.parse(storedUserData);
      if (!parsedUserData || !parsedUserData._id) {
        console.error('Invalid user data', parsedUserData);
        return;
      }

      const userId = parsedUserData._id;

      const response = await getActivatedRequestsApi(userId, page, limit);
      console.log('API Response:', response.data);

      if (response && response.data && Array.isArray(response.data.requests)) {
        setRequests(response.data.requests);
      } else {
        console.error('Unexpected API response format:', response);
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests', error);
      setRequests([]);
    }
  };

  const handleComplete = (requestId) => {
    setSelectedRequest(requestId);
    handlePayment(requestId);
  };

  const handlePayment = (requestId) => {
    const config = {
      publicKey: 'test_public_key_a2d80d14c47d4cd08b7af9965ec4f477',
      productIdentity: requestId,
      productName: 'Service Payment',
      productUrl: 'http://localhost:3000',
      eventHandler: {
        onSuccess(payload) {
          console.log(payload);
          // Perform actions after successful payment here
          toast.success('Payment Successful!');
          setShowRatingModal(true);
        },
        onError(error) {
          console.log(error);
          // Perform actions after an error during payment here
          toast.error('Payment Failed!');
        },
        onClose() {
          console.log('widget is closing');
        }
      },
      paymentPreference: ['KHALTI']
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 1000 });
  };

  const submitRating = async () => {
    if (rating < 0 || rating > 5) {
      toast.error('Rating must be a number between 0 and 5');
      return;
    }

    try {
      const response = await completeRequestApi(selectedRequest, { rating });
      if (response.data.success) {
        toast.success('Request marked as completed and rating submitted');
        setRequests(requests.map(request => request._id === selectedRequest ? { ...request, completed: true } : request));
        setShowRatingModal(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error submitting rating');
      console.error(error.message);
    }
  };

  const handleCancel = async (requestId) => {
    try {
      const storedUserData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const response = await cancelRequestApi(requestId);
      if (response.data.success) {
        toast.success('Request canceled');
        setRequests(requests.filter((req) => req._id !== requestId)); // Remove the canceled request from the list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error canceling request');
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
      <Example />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">My Accepted Requests</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div key={request._id} className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                  <h3 className="text-xl font-semibold">
                    {request.providerId.firstName} {request.providerId.lastName}
                  </h3>
                  <p>Service: {request.providerId.service}</p>
                  <p>Email: {request.providerId.email}</p>
                  <div className="flex justify-between items-center mt-4">
                    {!request.completed ? (
                      <div>
                        <button
                          onClick={() => handleComplete(request._id)}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => handleCancel(request._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-green-500">Completed</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No requests found</p>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {showRatingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Rate the Provider</h2>
            <Rating 
              count={5}
              value={rating}
              onChange={(value) => setRating(value)}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => setShowRatingModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={submitRating}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Requests;
