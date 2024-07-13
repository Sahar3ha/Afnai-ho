import feedback from "../images/icons/feedback.png";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createFavourtieApi, createRequestApi, getServiceProvidersApi } from "../apis/Api";
import favIcon from "../images/icons/fav.png";
import favIconActive from "../images/icons/added.png";
import Navbar from "../components/Navbar";

const Services = () => {
  const [providers, setProviders] = useState([]);
  const [activeIcons, setActiveIcons] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);

  useEffect(() => {
    getServiceProvidersApi().then((res) => {
      setProviders(res.data.providers);

      const initialActiveIcons = {};
      res.data.providers.forEach((item) => {
        initialActiveIcons[item._id] = false;
      });
      setActiveIcons(initialActiveIcons);
    });
  }, []);

  useEffect(() => {
    const filtered = providers.filter((item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProviders(filtered);
  }, [searchQuery, providers]);

  const toggleIcon = (id) => {
    setActiveIcons((prevIcons) => ({
      ...prevIcons,
      [id]: !prevIcons[id],
    }));
  };

  const handleAdd = (e, providerId) => {
    e.preventDefault();
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = { userId: userId, providerId: providerId };

      createFavourtieApi(data)
        .then((res) => {
          res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error("Server error");
          console.log(err.message);
        });
    } else {
      console.log("User data not found in localStorage");
    }
  };

  const handleRequest = (e, providerId) => {
    e.preventDefault();
    const storedUserData = localStorage.getItem("user");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = { userId: userId, providerId: providerId };

      createRequestApi(data)
        .then((res) => {
          res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error("Server error");
          console.log(err.message);
        });
    } else {
      console.log("User data not found in localStorage");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 px-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded-md shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProviders.map((item) => (
            <div
              key={item._id}
              className="relative bg-white border shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-lg font-semibold mb-2">Name: {item.firstName || ""}</div>
              <p className="text-gray-600 mb-4">Service: {item.service || ""}</p>
              <div className="flex justify-between items-center">
                <button
                  className="text-white p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                  onClick={(e) => {
                    toggleIcon(item._id);
                    handleAdd(e, item._id);
                  }}
                >
                  <img
                    src={activeIcons[item._id] ? favIconActive : favIcon}
                    alt="Favorite Icon"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  className="text-white p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
                  onClick={(e) => handleRequest(e, item._id)}
                >
                  Request
                </button>
                <Link to={`/user/userfeedback/${item._id}`}>
                  <button className="text-white p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300">
                    <img
                      src={feedback}
                      alt="Feedback Icon"
                      className="w-6 h-6"
                    />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
