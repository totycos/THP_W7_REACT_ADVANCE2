import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return isLogged ? <Outlet /> : <Navigate to="/connection" />;
};

export default PrivateRoutes;
