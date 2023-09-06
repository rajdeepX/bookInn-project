import { NavLink, Outlet } from "react-router-dom";
import "./AccountPage.css";

const AccountPage = () => {
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
