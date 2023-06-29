import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";

const SavedRooms = () => {
  const { savedRooms, setSavedRooms } = useContext(UserContext);

  console.log(savedRooms);

  return (
    <>
      {savedRooms.map((item) => {
        const { city, country, slug, id, images } = item;

        const handleDelete = () => {
          const updatedBookedRooms = savedRooms.filter(
            (room) => room.id !== id
          );
          setSavedRooms(updatedBookedRooms);
        };

        return (
          <div className="booking-container" key={id}>
            <Link to={`/room/${slug}`}>
              <div className="booking-img-container">
                <img src={images[0]} alt="image" />
              </div>
            </Link>
            <div className="booking-info">
              <div className="booking-location">
                <p>
                  {city}, {country}
                </p>
              </div>
              <div className="booking-cancel">
                <button onClick={handleDelete}>Remove</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SavedRooms;
