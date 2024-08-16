import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Login First");
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  return children;
};

export default Protected;
