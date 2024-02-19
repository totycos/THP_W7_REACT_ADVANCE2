import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { isLoggedAtom } from "../../atoms/auth";
import profile from "../../assets/profile.svg";
import logo from "../../assets/logo.svg";
import home from "../../assets/home.svg";
import logout from "../../assets/logout.svg";
import "./index.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);

  const handleLogout = () => {
    if (isLogged) {
      Cookies.remove("token");
      setIsLogged(false);
      console.log("isLogged after logout: ", isLogged);
      navigate(`/`);
    }
  };

  return (
    isLogged && (
      <div className="navbar">
        <Link to="/">
          <img className="navbar__logo" src={logo} alt="logo" />
        </Link>
        <Link to="/">
          <img className="navbar__home" src={home} alt="home" />
        </Link>
        <Link to="/profile">
          <img className="navbar__profile" src={profile} alt="profile" />
        </Link>
        <div onClick={handleLogout}>
          <img className="navbar__logout" src={logout} alt="" />
        </div>
      </div>
    )
  );
};

export default Navbar;
