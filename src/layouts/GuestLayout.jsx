import { Navigate, Outlet, Route } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const GuestLayout = () => {
  const { user } = useAuthContext();

  if (user && user.email_verified_at === null) {
    return <Navigate to="/verify-email"/>;
  } else if (!user) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default GuestLayout;
