import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import reactLogo from "../assets/react.svg";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    navigate(`/`);
  };

  return (
    <div>
      <Link to={"/"}>
        <img src={reactLogo} alt="logo" />
      </Link>
      <Link to={"/"}>Home</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
      <a onClick={handleLogout}>Logout</a>
    </div>
  );
};

export default Navbar;
