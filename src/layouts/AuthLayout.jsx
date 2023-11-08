import { Navigate, Outlet, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

const AuthLayout = () => {
  const { user, logout } = useAuthContext();

  if (user) {
    if (user.email_verified_at === null) {
      return <Navigate to="/verify-email" />;
    } else {
      return (
        <>
          <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
              <a href="https://laraveller.com/" className="flex items-center">
                Laraveller
              </a>
              <div className="hidden w-full md:block md:w-auto">
                <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                  <li>
                    <Link to="/" className="block rounded py-2 pr-4 pl-3 text-white" aria-current="page">
                      Home
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="block rounded py-2 pr-4 pl-3 text-white">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Outlet />
        </>
      );
    }
  } else {
    // User is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
};

export default AuthLayout;
