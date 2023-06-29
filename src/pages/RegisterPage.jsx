import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    try {
      await axios.post("/register", {
        username,
        email,
        password,
      });

      alert("Registration Successful!");
    } catch (error) {
      alert("Registration Failed :(");
    }
    // const data = await response.json();
    // console.log(data);
  };

  const register = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <Navbar />
      <div className="form">
        <h2>Register</h2>
        <form onSubmit={register}>
          <input
            type="text"
            name="username"
            className="input-name"
            placeholder="Name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="email"
            name="email"
            className="input-email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            name="password"
            className="input-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button>Register</button>
          <p className="route">
            Already a member? <Link to={"/login"}>Login</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
