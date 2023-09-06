import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import RoomPage from "./pages/RoomPage";
import AccountPage from "./pages/AccountPage";
import SavedRooms from "./pages/SavedRooms";
import BookingPage from "./pages/BookingPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/room/:slug" element={<RoomPage />} />
          <Route path="/account" element={<AccountPage />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="bookings" element={<BookingPage />} />
            <Route path="saved" element={<SavedRooms />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
