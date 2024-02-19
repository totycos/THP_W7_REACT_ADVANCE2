import { Outlet, Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLoggedAtom } from "../../atoms/auth";

const PrivateRoutes = () => {
  const [isLogged, setIsLogged] = useAtom(isLoggedAtom);

  return isLogged ? <Outlet /> : <Navigate to="/connection" />;
};

export default PrivateRoutes;
