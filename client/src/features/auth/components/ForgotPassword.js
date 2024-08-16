import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isDisabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const inputCSS = `w-full text-black text-sm py-2 px-3 border-2 border-gray-300 focus:outline-none ${
    !emailError
      ? "focus:border-cyan-400"
      : "border-red-600 focus:border-red-600 outline-none"
  }`;
  const labelCSS = "block text-[#CCCCCC] text-sm font-medium mb-1";
  const errorCSS = "text-red-600 text-sm pt-3";

  const validateEmail = (value) => {
    let error = "";

    if (value.length === 0) {
      error = "Email is mandatory";
    } else {
      error = !/^\S+@\S+\.\S+$/.test(value)
        ? "Email should be in the correct format"
        : "";
    }
    setEmailError(error);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  useEffect(() => {
    setDisabled(!(email && !emailError));
  }, [email, emailError]);

  const handleSubmit = async (e) => {};

  return (
    <div className="bg-[#333333] p-8 w-96">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-white mb-4">Forgot Password</h2>
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
            value={email}
            onChange={(e) => handleChange(e)}
            className={inputCSS}
            required
          />
          <div className={errorCSS}>{emailError}</div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            disabled={isDisabled}
            className="w-full bg-[#3498DB] hover:opacity-80 text-white font-semibold py-2 px-4 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send Email
          </button>
          <Link
            to="/login"
            className="w-full bg-transparent text-center border-2 border-white text-white hover:underline font-bold py-2 px-4 transition duration-300"
          >
            Go back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
