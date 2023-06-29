import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import { PiMedalFill } from "react-icons/pi";
// import data from "../roomData"

const Card = () => {
  const { sortedRooms } = useContext(UserContext);
  // console.log(rooms);

  if (sortedRooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately no rooms matched your search parameters</h3>
      </div>
    );
  }

  return (
    <>
      {sortedRooms.map((room) => {
        const {
          images,
          name,
          city,
          country,
          rating,
          profession,
          price,
          id,
          slug,
          superhost,
        } = room;

        return (
          <div className="card" key={id}>
            <div className="image-container">
              <Link to={`/room/${slug}`}>
                <img className="card-img" src={images[0]} />
              </Link>
            </div>
            <div className="info-container">
              <div className="location-container">
                <div className="location">
                  {city}, {country}
                  {superhost ? (
                    <div className="superhost">
                      <PiMedalFill />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="rating">
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
                  <p>{rating}</p>
                </div>
              </div>
              <div className="host-info">
                <p>
                  Stay with {name}
                  <hr className="dot" />
                  {profession}
                </p>
              </div>
              <div className="price-container">
                <p>
                  <span>Rs. {price}</span> night
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
