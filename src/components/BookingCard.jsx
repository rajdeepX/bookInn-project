import React from "react";

const BookingCard = () => {
  return (
    <div className="booking-container">
      <div className="booking-img-container"></div>
      <div className="booking-info">
        <div className="booking-location">
          <p>Location, Place</p>
        </div>
        <div className="booking-date">
          <p>Booking date</p>
        </div>
        <div className="booking-cancel">
          <button>Cancel Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
