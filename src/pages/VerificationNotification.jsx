import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuthContext from "../context/AuthContext";

const VerificationNotification = () => {
  const [notificationSent, setNotificationSent] = useState("");
  const { user, logout, csrf } = useAuthContext();
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleResendVerification = async () => {
    try {
      await csrf();
      setErrors("");

      await axios.post('/email/verification-notification');
      setNotificationSent(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = async () => {
    if (user) {
      try {
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      // Handle the case where the user is not authenticated
      // You can provide a message or redirect to the login page
      console.error("User is not authenticated.");
      // Handle accordingly, e.g., redirect to login page
      navigate("/login");
    }
  };
  
  return (
    <div>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </div>

      {notificationSent && (
        <div>
          Email Have been resend, please check email
        </div>
        )
      }

      <div className="mt-4 flex items-center justify-between">
        <button onClick={handleResendVerification} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Resend Verification Email
        </button>

        <button onClick={handleLogout} className="block rounded py-2 pr-4 pl-3 text-black">
          Logout
        </button>
      </div>
    </div>
  );
};

export default VerificationNotification;
