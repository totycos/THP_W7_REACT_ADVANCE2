import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import "./index.scss";

const Connection = () => {
  return (
    <div className="connectionContainer">
      <div className="connectionLogoContainer">
        <img src={logo} alt="logo" />
      </div>
      <div className="linksContainer">
        <div className="linksContainer__registerContainer">
          <h1>It's happening now</h1>
          <h3>Register.</h3>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>

        <div className="linksContainer__loginContainer">
          <h4>You already have an account ?</h4>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connection;
