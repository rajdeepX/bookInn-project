import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, Navigate, useParams } from "react-router-dom";
import UserContext from "../UserContext";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays/index";
import { PiMedalFill } from "react-icons/pi";
import "./RoomPage.css";

const RoomPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { rooms, setBookedRoom, bookedRoom, setSavedRooms, savedRooms } =
    useContext(UserContext);

  const { slug } = useParams();
  console.log(slug);

  const getRoom = (slug) => {
    let tempRooms = [...rooms];
    const room = tempRooms.find((room) => {
      return room.slug === slug;
    });
    return room;
  };

  console.log();

  const roomList = getRoom(slug);

  console.log(roomList);

  if (!roomList) {
    return (
      <div className="error">
        <h3>No such room could be found...</h3>
        <Link to={"/"} className="btn-primary">
          Back to home
        </Link>
      </div>
    );
  }

  const { rating, address, images, description, extras, price, id, superhost } =
    roomList;

  const [mainImg, ...restImg] = images;

  // for calender date

  const date = new Date();
  const formatDate = date.toISOString().split("T", 1)[0];

  const [minDate, setMinDate] = useState(formatDate);

  const checkInDate = new Date(checkIn);

  const checkOutDate = new Date(checkOut);
  let numberOfDays = 0;
  if (checkInDate && checkOutDate) {
    numberOfDays = differenceInCalendarDays(checkOutDate, checkInDate);
  }

  const handleReserve = () => {
    let room = [...rooms];
    room = room.find((item) => item.id === id);

    if (room) {
      room.date = checkIn;
      setBookedRoom([...bookedRoom, room]);
    }

    setRedirect(true);
  };

  const handleSave = () => {
    let room = [...rooms];
    room = room.find((item) => item.id === id);
    setSavedRooms([...savedRooms, room]);
  };

  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  return (
    <div>
      <Navbar />
      <div className="room-detail-container">
        <div className="header">
          <h2>Double room in lovely apartment</h2>
          <div className="brief">
            <div className="location">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                {rating} <hr className="dot" /> <a>5 reviews</a>{" "}
                <hr className="dot" />
                {superhost ? (
                  <div className="superhost-room">
                    <PiMedalFill /> <span>Superhost</span>
                  </div>
                ) : (
                  ""
                )}
                <hr className="dot" />
                <a>{address}</a>
              </p>
            </div>
            <div className="social-tab">
              <div className="share">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <a>Share</a>
              </div>
              <Link onClick={handleSave}>
                <div className="save">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  <a>Save</a>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="img-ctn">
          <img className="lg-col-2 lg-row-2" src={mainImg} alt="room" />
          {restImg.map((img, index) => {
            return <img className="img2" src={img} key={index} />;
          })}
        </div>

        <div className="room-info">
          <div className="about-room">
            <h3>About this place</h3>
            <p>{description}</p>
            <hr />
            <h3>What this place offers</h3>
            <div className="features">
              {extras.map((item, index) => {
                return (
                  <p key={index}>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="feature-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="room-price">
            <div className="price-rating">
              <p className="price">Rs. {price} night</p>
              <div className="rating-review">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 rating-star"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="room-rating">
                  {rating} <hr className="price-dot" /> 22 reviews
                </p>
              </div>
            </div>
            <div className="book-room">
              <div className="date">
                <input
                  type="date"
                  name="checkInDate"
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={minDate}
                />

                <input
                  type="date"
                  name="checkOutDate"
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn}
                />
              </div>
              <div className="guests">
                <p>No. of guests</p>
                <input type="number" max="2" min="1" defaultValue="1" />
              </div>
              {numberOfDays > 0 && !isNaN(numberOfDays) ? (
                <div>
                  <div className="per-night">
                    <p>
                      Rs. {price} &times; {numberOfDays}{" "}
                      {numberOfDays > 1 ? "nights" : "night"}
                    </p>
                    <p>Rs. {price * numberOfDays}</p>
                  </div>
                  <div className="service-fee">
                    <p>BookInn service fee</p>
                    <p>Rs. 900</p>
                  </div>
                  <hr />
                  <div className="total">
                    <p>Total before taxes</p>
                    <p>Rs. {price * numberOfDays + 900}</p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <button
                disabled={numberOfDays <= 0 || isNaN(numberOfDays)}
                onClick={handleReserve}
              >
                Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1></h1>
    </div>
  );
};

export default RoomPage;
