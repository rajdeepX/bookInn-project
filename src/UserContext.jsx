import axios from "axios";
import { createContext, useEffect, useState } from "react";
import data from "./data";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [ready, setReady] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [bookedRoom, setBookedRoom] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [nameAtt, setNameAtt] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [superhost, setSuperhost] = useState(false);
  const [savedRooms, setSavedRooms] = useState([]);

  const fetchUser = async () => {
    if (!userInfo) {
      const data = await axios.get("/profile");
      console.log(data);
      setUserInfo(data);
      setReady(true);
    }
  };

  useEffect(() => {
    fetchUser();
    let rooms = formatData(data);
    setRooms(rooms);

    let maxprice = Math.max(...rooms.map((item) => item.price));
    setMaxPrice(maxprice);
    setPrice(maxprice);
    setMinPrice(5000);
  }, []);

  // for price input
  const handlePrice = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = e.target.name;

    setPrice(value);
    setNameAtt(name);
  };

  // for search
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  // for superhost
  const handleSuperhost = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = e.target.name;

    setSuperhost(value);
    setNameAtt(name);
  };

  console.log(price);

  const roomFilters = () => {
    let tempRooms = [...rooms];

    // filter by price
    if (price >= 0) {
      tempRooms = tempRooms.filter((room) => room.price <= price);
    }
    // filter by superhost
    if (superhost) {
      tempRooms = tempRooms.filter((room) => room.superhost === true);
    }

    //   filter by country
    if (searchValue !== "") {
      tempRooms = tempRooms.filter((room) =>
        room.address.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setSortedRooms(tempRooms);
    console.log(sortedRooms);
  };

  const formatData = () => {
    let tempItems = data.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((item) => item.fields.file.url);
      let room = { ...item.fields, images, id };

      return room;
    });
    // console.log(tempItems);
    return tempItems;
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        ready,
        rooms,
        sortedRooms,
        setSortedRooms,
        bookedRoom,
        setBookedRoom,
        handlePrice,
        maxPrice,
        setMaxPrice,
        price,
        setPrice,
        nameAtt,
        setNameAtt,
        roomFilters,
        minPrice,
        setMinPrice,
        handleChange,
        searchValue,
        setSearchValue,
        superhost,
        setSuperhost,
        handleSuperhost,
        savedRooms,
        setSavedRooms,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
