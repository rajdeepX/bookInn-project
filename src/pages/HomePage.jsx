import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../UserContext";
import Card from "../components/Card";
import FilterRoom from "../components/FilterRoom";

const HomePage = () => {
  const { userInfo } = useContext(UserContext);
  console.log(userInfo);

  return (
    <>
      <Navbar />
      <FilterRoom />
      <div className="card-container">
        <Card />
      </div>
    </>
  );
};

export default HomePage;
