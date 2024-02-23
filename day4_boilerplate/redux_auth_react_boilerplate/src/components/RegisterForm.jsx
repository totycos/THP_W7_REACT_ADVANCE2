import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerFetch } from "../services/authApi";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/authReducer";
import Cookies from "js-cookie";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerFetch(
        data.username,
        data.email,
        data.password
      );
      const responseData = await response.json();

      if (responseData.jwt) {
        Cookies.set("auth_token", responseData.jwt);
        dispatch(login());
        navigate(`/`);
      }
    } catch (error) {
      console.error("Error during register:", error.message);
    }
  };

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("username", {
            required: true,
          })}
          placeholder="Username here"
          autoComplete="current-username"
        />
        {errors.username && errors.username.type === "required" && (
          <p>Username can not be empty</p>
        )}
        {errors.username && errors.username.type === "minLength" && (
          <p>Username should have 3 characters minimum</p>
        )}

        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Email here"
          autoComplete="current-email"
        />
        {errors.email && errors.email.type === "required" && (
          <p>Email can not be empty</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>{errors.email.message}</p>
        )}

        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          placeholder="Password here"
          autoComplete="current-password"
        />
        {errors.password && errors.password.type === "required" && (
          <p>Password can not be empty</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Password should have 6 characters minimum</p>
        )}

        <input type="submit" />
      </form>
    </div>
  );
};

export default RegisterForm;
