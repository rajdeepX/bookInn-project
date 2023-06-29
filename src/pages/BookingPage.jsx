import React, { useContext } from "react";
import "./BookingPage.css";
import BookingCard from "../components/BookingCard";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const { bookedRoom, setBookedRoom } = useContext(UserContext);

  // console.log(reserve);
  console.log(bookedRoom);

  // const handleDelete = (id) => {
  //   const updatedRooms = bookedRoom.filter((room) => room.id !== id);

  //   setBookedRoom(updatedRooms);
  //   console.log(bookedRoom);
  // };

  return (
    <>
      {bookedRoom.map((item) => {
        const { city, country, slug, id, images, date } = item;

        const handleDelete = () => {
          const updatedBookedRooms = bookedRoom.filter(
            (room) => room.id !== id
          );
          setBookedRoom(updatedBookedRooms);
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
              <div className="booking-date">
                <p>{date}</p>
              </div>
              <div className="booking-cancel">
                <button onClick={handleDelete}>Cancel reserve</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BookingPage;
