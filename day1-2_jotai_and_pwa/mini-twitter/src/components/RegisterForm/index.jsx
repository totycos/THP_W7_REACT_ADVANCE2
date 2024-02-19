import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../services/authApi";
import Cookies from "js-cookie";
import { useAtom } from "jotai";
import { isLoggedAtom } from "../../atoms/auth";
import "./index.scss";

const RegisterForm = () => {
  const { response, error, registerFetch } = authApi();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);

  const handleRegister = async () => {
    await registerFetch(username, email, password);
  };

  useEffect(() => {
    if (response && response.jwt) {
      Cookies.set("token", response.jwt);
      setIsLogged(true);
      console.log("isLogged after register: ", isLogged);
      navigate("/");
    }
    error && console.log(error);
  }, [response, error]);

  return (
    <div className="registerFormContainer">
      <form className="registerForm">
        <h1>Create your account</h1>
        <input
          className="registerForm__username"
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="registerForm__email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="registerForm__password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleRegister}>
          Register
        </button>

        <p className="registerForm__login">
          You already have an account ?{" "}
          <Link className="registerForm__loginLink" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
