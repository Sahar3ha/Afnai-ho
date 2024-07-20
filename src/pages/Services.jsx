import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  createFavourtieApi,
  createRequestApi,
  getServiceProvidersApi,
  getTopServiceProvidersApi
} from "../apis/Api";
import favIcon from '../images/icons/fav.png';
import favIconActive from '../images/icons/added.png';
import feedback from '../images/icons/feedback.png';
import Navbar from '../components/Navbar';
import Rating from 'react-rating-stars-component';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm9hZHdheW1hbiIsImEiOiJjbGY3ejR3ZjkwYnlrM3NudjJkYzgxcnRtIn0.jdReqoWAgSK93Ruy1iPRSQ'; // Replace with your Mapbox access token

const Services = () => {
  const [providers, setProviders] = useState([]);
  const [topRatedProviders, setTopRatedProviders] = useState([]);
  const [activeIcons, setActiveIcons] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showBiddingSection, setShowBiddingSection] = useState(false);
  const [customPrice, setCustomPrice] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetchProviders();
    fetchTopRatedProviders();
    getUserLocation();
  }, []);

  const fetchProviders = async () => {
    try {
      const res = await getServiceProvidersApi();
      setProviders(res.data.providers);
      console.log('Providers:', res.data.providers);
      const initialActiveIcons = {};
      res.data.providers.forEach((item) => {
        initialActiveIcons[item._id] = false;
      });
      setActiveIcons(initialActiveIcons);
    } catch (error) {
      console.error('Error fetching providers:', error);
      toast.error('Error fetching providers');
    }
  };

  const fetchTopRatedProviders = async () => {
    try {
      const res = await getTopServiceProvidersApi();
      setTopRatedProviders(res.data.providers);
      console.log('Top-rated providers:', res.data.providers);
    } catch (error) {
      console.error('Error fetching top-rated providers:', error);
      toast.error('Error fetching top-rated providers');
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
          toast.error('Error fetching location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

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
    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = { userId: userId, providerId: providerId };

      createFavourtieApi(data)
        .then((res) => {
          res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error('Server error');
          console.log(err.message);
        });
    } else {
      console.log('User data not found in localStorage');
    }
  };

  const handleRequest = (e, providerId) => {
    e.preventDefault();
    setSelectedProvider(providerId);
    setShowPriceModal(true);
    setShowBiddingSection(false);
  };

  const handleCustomPriceSubmit = () => {
    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = {
        userId: userId,
        providerId: selectedProvider,
        price: customPrice,
      };

      createRequestApi(data)
        .then((res) => {
          res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error('Server error');
          console.log(err.message);
        });

      setShowPriceModal(false);
      setCustomPrice('');
      setSelectedProvider(null);
    } else {
      console.log('User data not found in localStorage');
    }
  };

  const handleCancelBidding = () => {
    setShowBiddingSection(false);
  };

  const handleDirectRequest = () => {
    const storedUserData = localStorage.getItem('user');

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const data = { userId: userId, providerId: selectedProvider };

      createRequestApi(data)
        .then((res) => {
          res.data.success ? toast.success(res.data.message) : toast.error(res.data.message);
        })
        .catch((err) => {
          toast.error('Server error');
          console.log(err.message);
        });

      setShowPriceModal(false);
      setSelectedProvider(null);
    } else {
      console.log('User data not found in localStorage');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 px-4 bg-gray-100 py-8 rounded-lg shadow-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-4 border rounded-md shadow-sm text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Highly Rated Service Providers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {topRatedProviders.map((provider) => (
                <div
                  key={provider._id}
                  className="relative bg-blue-50 border border-blue-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-xl font-semibold mb-2">
                    Name: {provider.firstName || ''}
                  </div>
                  <p className="text-gray-600 mb-4">Service: {provider.service || ''}</p>
                  <p className="text-gray-800 font-bold mb-4">Price: {provider.price || 'N/A'}</p>
                  <Rating
                    count={5}
                    value={provider.ratingSum / provider.ratingCount}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                  <div className="flex justify-between items-center mt-4">
                    <button
                      className="text-white p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                      onClick={(e) => {
                        toggleIcon(provider._id);
                        handleAdd(e, provider._id);
                      }}
                    >
                      <img
                        src={activeIcons[provider._id] ? favIconActive : favIcon}
                        alt="Favorite Icon"
                        className="w-6 h-6"
                      />
                    </button>
                    <button
                      className="text-white p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
                      onClick={(e) => handleRequest(e, provider._id)}
                    >
                      Request
                    </button>
                    <Link to={`/user/userfeedback/${provider._id}`}>
                      <button className="text-white p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-300">
                        <img src={feedback} alt="Feedback Icon" className="w-6 h-6" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Service Provider Near You</h2>
            {coordinates && (
              <Map
                initialViewState={{
                  longitude: coordinates.longitude,
                  latitude: coordinates.latitude,
                  zoom: 14
                }}
                style={{ width: '100%', height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker
                  longitude={coordinates.longitude}
                  latitude={coordinates.latitude}
                  anchor="bottom"
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color="red" />
                </Marker>
                {providers.map(provider => (
                  provider.coordinates && (
                    <Marker
                      key={provider._id}
                      longitude={provider.coordinates.longitude}
                      latitude={provider.coordinates.latitude}
                      anchor="bottom"
                    >
                      <div className="relative">
                        <FontAwesomeIcon icon={faUser} size="2x" color="blue" />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-white text-sm text-gray-800 p-1 rounded shadow-lg">
                          {provider.firstName}
                        </div>
                      </div>
                    </Marker>
                  )
                ))}
              </Map>
            )}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">All Service Providers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProviders.map((item) => (
              <div
                key={item._id}
                className="relative bg-blue-50 border border-blue-200 shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-xl font-semibold mb-2">
                  Name: {item.firstName || ''}
                </div>
                <p className="text-gray-600 mb-4">Service: {item.service || ''}</p>
                <p className="text-gray-800 font-bold mb-4">Price: {item.price || 'N/A'}</p>
                <Rating
                  count={5}
                  value={item.ratingSum / item.ratingCount}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
                <div className="flex justify-between items-center mt-4">
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
                      <img src={feedback} alt="Feedback Icon" className="w-6 h-6" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showPriceModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            {!showBiddingSection && (
              <>
                <h2 className="text-lg font-bold mb-4">Place Your Own Price</h2>
                <p>Do you want to place your own price?</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={handleDirectRequest}
                  >
                    No
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setShowBiddingSection(true)}
                  >
                    Yes
                  </button>
                </div>
              </>
            )}
            {showBiddingSection && (
              <div className="mt-4">
                <input
                  type="number"
                  placeholder="Enter your price"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={handleCancelBidding}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleCustomPriceSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
