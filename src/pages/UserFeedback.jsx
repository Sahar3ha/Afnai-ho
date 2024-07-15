import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createFeedbackApi, getSingleProviderApi } from '../apis/Api';
import { toast } from 'react-toastify';
import Example from '../components/Navbar';

const UserFeedbackPage = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState('');
  const [provider, setProvider] = useState({});

  useEffect(() => {
    getSingleProviderApi(id)
      .then((res) => {
        console.log(res.data);
        setProvider(res.data.user);
      })
      .catch((error) => {
        console.error('Error fetching provider data:', error.message);
      });
  }, [id]);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!feedback) {
      toast.error('Feedback cannot be empty');
      return;
    }

    const data = {
      feedback: feedback,
      providerId: provider._id // Assuming provider._id is correctly set in provider state
    };

    createFeedbackApi(id, data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setFeedback(''); // Clear feedback input after successful submission if needed
        }
      })
      .catch((err) => {
        toast.error('Server error');
        console.log(err.message);
      });
  };

  return (
    <>
      <Example />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
            <textarea
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              value={feedback}
              placeholder="Enter your feedback"
              onChange={handleFeedbackChange}
              required
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserFeedbackPage;
