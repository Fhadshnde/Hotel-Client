import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/api/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register" >
      <div className="rContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
