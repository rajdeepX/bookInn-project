import React, { useContext, useEffect } from "react";
import UserContext from "../UserContext";
import "./FilterRoom.css";

const FilterRoom = () => {
  const {
    sortedRooms,
    setSortedRooms,
    rooms,
    address,
    roomFilters,
    handlePrice,
    maxPrice,
    price,
    minPrice,
    handleSuperhost,
    superhost,
  } = useContext(UserContext);

  useEffect(() => {
    roomFilters();
  }, [price, superhost]);

  return (
    <>
      <div className="filter-container">
        {/* price */}
        <div className="filter-group price">
          <label htmlFor="price">Room price: Rs. {price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handlePrice}
            className="form-control"
          />
        </div>
        {/* end of price */}

        {/* superhost */}
        <div className="filter-group superhost">
          <input
            type="checkbox"
            name="superhost"
            id="superhost"
            checked={superhost}
            onChange={handleSuperhost}
          />
          <label htmlFor="breakfast">Superhost</label>
        </div>
        {/* end of superhost */}
      </div>
    </>
  );
};

export default FilterRoom;
