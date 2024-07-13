import React, { useEffect, useState } from 'react';
import { getFavouriteApi, deleteFavouriteApi } from '../apis/Api'; // Ensure these API functions are defined
import Example from '../components/Navbar';
import deleteIcon from '../images/delete.png'; // Import the delete.png icon

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      const storedUserData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(storedUserData);
      const userId = parsedUserData._id;

      const response = await getFavouriteApi(userId);
      setFavourites(response.data.favourites);
    } catch (error) {
      console.error('Error fetching favourites', error);
    }
  };

  const handleDeleteFavourite = async (favouriteId) => {
    try {
      await deleteFavouriteApi(favouriteId);
      // Remove the deleted favourite from state
      setFavourites(favourites.filter(fav => fav._id !== favouriteId));
    } catch (error) {
      console.error('Error deleting favourite', error);
    }
  };

  return (
    <>
      <Example />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Favourites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favourites.length > 0 ? (
              favourites.map((favourite) => (
                <div key={favourite._id} className="bg-blue-500 text-white p-6 rounded-md shadow-md relative">
                  <h3 className="text-xl font-semibold">{favourite.providerId.firstName} {favourite.providerId.lastName}</h3>
                  <p>{favourite.providerId.service}</p>
                  <p>{favourite.providerId.email}</p>
                  <button
                    onClick={() => handleDeleteFavourite(favourite._id)}
                    className="absolute top-2 right-2 text-white hover:text-red-500 focus:outline-none"
                  >
                    <img src={deleteIcon} alt="Delete" className="h-5 w-5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No favourites found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
