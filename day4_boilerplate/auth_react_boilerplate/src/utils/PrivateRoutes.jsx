import { Outlet, Navigate } from "react-router-dom";
import { isLogged } from "./auth";

const PrivateRoutes = () => {
  console.log(isLogged());
  return isLogged() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
