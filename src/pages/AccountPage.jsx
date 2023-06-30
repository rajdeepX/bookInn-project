import { useContext, useState } from "react";
import UserContext from "../UserContext";
import { NavLink, Outlet, useParams } from "react-router-dom";
import "./AccountPage.css";
import axios from "axios";

const AccountPage = () => {
  const { subpage } = useParams();
  // console.log(subpage);

  const { userInfo } = useContext(UserContext);
  // console.log(userInfo);

  const logout = async () => {
    await axios.post("/logout");
  };

  return (
    <>
      <div className="account-container">
        <nav className="account-nav">
          <NavLink to={"/account/profile"} activeclassname="active">
            <p>My Profile</p>
          </NavLink>
          <NavLink to={"/account/bookings"} activeclassname="active">
            <p>My Bookings</p>
          </NavLink>
          <NavLink to={"/account/saved"} activeclassname="active">
            <p>My Saved Rooms</p>
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </>
  );
};

export default AccountPage;
