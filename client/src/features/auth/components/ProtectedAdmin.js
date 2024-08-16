import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Login First");
      navigate("/login", { replace: true });
    } else if (user && user.role !== "admin") {
      toast.error("Not an Admin");
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  if (!user || (user && user.role !== "admin")) {
    return null;
  }

  return children;
};

export default ProtectedAdmin;
