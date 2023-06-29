import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const fetchData = async () => {
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      // console.log(response);
      setRedirect(true);
      setUserInfo(response);
    } catch (error) {
      alert("Wrong Credentials!");
    }
  };

  const login = (e) => {
    e.preventDefault();
    fetchData();
  };

  if (redirect === true) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="form">
        <h2>Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            name="email"
            className="input-email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="input-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
          <p className="route">
            Don&apos;t have an account yet?{" "}
            <Link to={"/register"}>Register now!</Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
