import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login/step1" replace />;
};

export default PrivateRoute;