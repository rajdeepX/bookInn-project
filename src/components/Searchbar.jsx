import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

const Searchbar = () => {
  const { searchValue, handleChange, roomFilters } = useContext(UserContext);

  useEffect(() => {
    roomFilters();
  }, [searchValue]);

  return (
    <>
      <div className="search-container">
        <input
          type="search"
          name="search"
          placeholder="Searh your stay..."
          onChange={handleChange}
        />
        <HiMagnifyingGlassCircle />
      </div>
    </>
  );
};

export default Searchbar;
