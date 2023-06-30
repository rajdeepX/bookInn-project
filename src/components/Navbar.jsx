import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";
import Searchbar from "./Searchbar";
import "./Navbar.css";
import { HiPaperAirplane } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { BiSolidUserCircle } from "react-icons/bi";
import { HiMagnifyingGlassCircle } from "react-icons/hi2";

const Navbar = () => {
  const { searchValue, handleChange, roomFilters } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  const handleToggleSearch = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    roomFilters();
  }, [searchValue]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to={"/"}>
          <div className="logo-container">
            <HiPaperAirplane />
            <div className="logo-text">
              <h1>bookInn</h1>
            </div>
          </div>
        </Link>
        <Searchbar />
        <div
          // className="user-container"
          className="user-container"
        >
          <div className="user-info">
            <div className="user-menu">
              <Link to={"/account/profile"} className="test-user">
                <p style={{ paddingLeft: "8px", fontSize: "0.85rem" }}>Test</p>
              </Link>
              <div className="user-btn">
                <Link to={"/login"}>
                  <BiSolidUserCircle />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="user">
          <div className="user-search">
            <input
              type="search"
              name="search"
              placeholder="Search..."
              className={isClicked ? "mini-search show-search" : "mini-search"}
              onChange={handleChange}
            />

            <button onClick={handleToggleSearch}>
              <HiMagnifyingGlassCircle className="user-icon" />
            </button>
          </div>
          <button onClick={handleToggle}>
            <BiSolidUserCircle className="user-icon" />
          </button>
        </div>
      </div>
      <div className="user-links">
        <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
          <li>
            <Link to={"/account/profile"}>My Account</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
