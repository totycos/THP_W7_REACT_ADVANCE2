import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../services/authApi";
import Cookies from "js-cookie";
import "./index.scss";
import { useAtom } from "jotai";
import { isLoggedAtom } from "../../atoms/auth";

const LoginForm = () => {
  const { response, error, loginFetch } = authApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);

  const handleLogin = async () => {
    await loginFetch(email, password);
  };

  useEffect(() => {
    console.log(response);
    if (response && response.jwt) {
      Cookies.set("token", response.jwt);
      setIsLogged(true);
      console.log("isLogged after login: ", isLogged);
      navigate("/");
    }
    error && console.log(error);
  }, [response, error]);

  return (
    <div className="loginFormContainer">
      <form className="loginForm">
        <h1>Log in to Y</h1>
        <input
          className="loginForm__email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="loginForm__password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        <p className="loginForm__register">
          You don't have an account ?{" "}
          <Link className="loginForm__registerLink" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
