import React, { useEffect, useState } from 'react';
import { getActivatedRequestsApi } from '../apis/Api'; // Ensure this API function is defined
import Example from '../components/Navbar';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of requests to show per page

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
    </>
  );
};

export default Requests;
