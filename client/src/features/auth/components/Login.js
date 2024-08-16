import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  checkUserAsync,
  selectLogInError,
  selectLoggedInUser,
} from "../authSlice";

const Login = () => {
  const user = useSelector(selectLoggedInUser);
  const submitError = useSelector(selectLogInError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRotated, setIsRotated] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const inputCSS = (field) =>
    `w-full text-black text-sm py-2 px-3 border-2 border-gray-300 focus:outline-none ${
      !errors[field]
        ? "focus:border-cyan-400"
        : "border-red-600 focus:border-red-600 outline-none"
    }`;
  const labelCSS = "block text-[#CCCCCC] text-sm font-medium mb-1";
  const errorCSS = "text-red-600 text-sm pt-3";

  const validateForm = (value, field) => {
    let error = "";

    switch (field) {
      case "email":
        // Validate email format
        if (value.length === 0) {
          error = "Email is mandatory";
        } else {
          error = !/^\S+@\S+\.\S+$/.test(value)
            ? "Email should be in the correct format"
            : "";
        }
        break;
      case "password":
        // Validate password format (8-15 characters, 1 upper, 1 lower, 1 number)
        if (value.length === 0) {
          error = "Password is mandatory";
        }
        break;
      default:
        break;
    }
    // Update the errors state
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  useEffect(() => {
    const setDisabledBtn = () => {
      const allFieldsFilled = Object.values(fields).every(
        (value) => value !== ""
      );
      const isErrorFieldEmpty = Object.values(errors).every(
        (value) => value === ""
      );
      setDisabled(!(allFieldsFilled && isErrorFieldEmpty));
    };
    setDisabledBtn();
  }, [fields, errors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateForm(value, name);
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(checkUserAsync(fields));
  };

  useEffect(() => {
    if (submitError) {
      toast.error(submitError.message || "Something went wrong !");
    } else if (user) {
      navigate("/");
      toast.success("Login Successful");
    }
  }, [user, submitError, navigate]);

  const resetFields = () => {
    setIsRotated(true);
    setTimeout(() => {
      setIsRotated(false);
    }, 500);
    const newFields = { ...fields };
    for (const key in newFields) {
      newFields[key] = "";
    }
    setFields(newFields);
    setErrors(newFields);
  };

  return (
    <div className="bg-[#333333] p-8 w-96">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-white mb-4">Login</h2>
        <button
          type="button"
          onClick={resetFields}
          className="h-min relative rounded-full p-1 text-gray-400 hover:text-white rotate-0"
        >
          <BiReset
            className={`h-6 w-6 ${
              isRotated ? "rotate-[-360deg] duration-500" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className={labelCSS} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            className={inputCSS("email")}
            required
          />
          <div className={errorCSS}>{errors.email}</div>
        </div>

        <div className="">
          <label className={labelCSS} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={handleChange}
            className={inputCSS("password")}
            required
          />
          <div className={errorCSS}>{errors.password}</div>
        </div>
        <div className="w-full mb-5">
          <Link
            to="/forgot-password"
            className="text-[#3498DB] w-min whitespace-nowrap flex ml-auto text-sm"
          >
            Forgot Password ?
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <button
            disabled={isDisabled}
            className="w-full bg-[#3498DB] hover:opacity-80 text-white font-semibold py-2 px-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            Login
          </button>
          <Link
            to="/register"
            className="w-full bg-transparent text-center border-2 border-white text-white hover:underline font-bold py-2 px-4 transition duration-300"
          >
            Don't have an Acccount ?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
