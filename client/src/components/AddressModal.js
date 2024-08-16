import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import toast from "react-hot-toast";

const AddressInput = (props) => {
  const { defaultFields, setOpen } = props;
  let newDefaultFields = {};
  let newAddId = null;

  if (defaultFields) {
    let { addId, ...rest } = defaultFields;
    newDefaultFields = rest;
    newAddId = addId;
  }
  const [isDisabled, setDisabled] = useState(true);
  const [fields, setFields] = useState({
    fullName: defaultFields?.fullName || "",
    email: defaultFields?.email || "",
    phone: defaultFields?.phone || null,
    streetAddress: defaultFields?.streetAddress || "",
    city: defaultFields?.city || "",
    state: defaultFields?.state || "",
    postalCode: defaultFields?.postalCode || null,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const inputCSS = (field) =>
    `w-full text-black text-sm py-2 px-3 border-2 border-gray-300 focus:outline-none ${
      !errors[field]
        ? "focus:border-cyan-400"
        : "border-red-600 focus:border-red-600 outline-none"
    }`;
  const errorCSS = "text-red-600 text-sm p-3";

  const validateForm = (value, field) => {
    let error = "";

    switch (field) {
      case "fullName":
        // Validate name (should not contain any numbers)
        if (value.length === 0) {
          error = "Name is mandatory";
        } else {
          error = !/^[A-Za-z\s]+$/.test(value) ? "Name format incorrect" : "";
        }
        break;
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
      case "phone":
        // Validate phone format
        if (value.length === 0) {
          error = "Phone Number is mandatory";
        } else {
          error = !/^\d{10}$/.test(value) ? "Max length = 10 or incorrect" : "";
        }
        break;
      case "streetAddress":
        // Validate street address format
        if (value.length === 0) {
          error = "Street Address is mandatory";
        } else {
          error = !/^[A-Za-z0-9'.\-\s,]+$/.test(value)
            ? "Street Address format incorrect"
            : "";
        }
        break;
      case "city":
        // Validate city format
        if (value.length === 0) {
          error = "City is mandatory";
        } else {
          error = !/^[A-Za-z\s]+$/.test(value) ? "City format incorrect" : "";
        }
        break;

      case "state":
        // Validate state format
        if (value.length === 0) {
          error = "State is mandatory";
        } else {
          error = !/^[A-Za-z\s]+$/.test(value) ? "State format incorrect" : "";
        }
        break;
      case "postalCode":
        // Validate postal code format
        if (value.length === 0) {
          error = "Postal Code is mandatory";
        } else {
          error = !/^\d{6}$/.test(value) ? "Max length = 6 or incorrect" : "";
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
      const isChangedFromDefault = defaultFields
        ? JSON.stringify(fields) !== JSON.stringify(newDefaultFields)
        : true;
      setDisabled(
        !(allFieldsFilled && isErrorFieldEmpty && isChangedFromDefault)
      );
    };
    setDisabledBtn();
  }, [fields, errors, defaultFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateForm(value, name);
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const resetFields = () => {
    const newFields = { ...fields };
    for (const key in newFields) {
      newFields[key] = "";
    }
    setFields(newFields);
    setErrors(newFields);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newAddId =
      (user.addresses[user.addresses.length - 1]?.addId || 0) + 1;
    const currentAddress = {
      ...fields,
      addId: newAddId,
    };
    dispatch(
      updateUserAsync({
        ...user,
        addresses: [...user.addresses, currentAddress],
      })
    );
    resetFields();
    setOpen(false);
    toast.success("Addresses added successfully");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const addressToUpdate = user.addresses.find(
      (address) => address.addId === newAddId
    );

    const updatedAddress = {
      ...addressToUpdate,
      ...fields,
    };

    const updatedAddresses = user.addresses.map((address) =>
      address.addId === newAddId ? updatedAddress : address
    );

    dispatch(
      updateUserAsync({
        ...user,
        addresses: updatedAddresses,
      })
    );

    resetFields();
    toast.success("Address updated successfully");
    setOpen(false);
  };

  return (
    <form onSubmit={defaultFields ? handleUpdate : handleAdd}>
      <div className="border-b border-white pb-8">
        <h2 className="text-lg font-semibold">Address Information</h2>
        <p className="mt-1 text-sm">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="fullName" className="block text-sm font-medium">
              Full name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fullName"
                id="fullName"
                autoComplete="given-name"
                value={fields.fullName}
                onChange={handleChange}
                className={inputCSS("fullName")}
              />
              <div className={errorCSS}>{errors.fullName}</div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={handleChange}
                className={inputCSS("email")}
              />
              <div className={errorCSS}>{errors.email}</div>
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="phone"
                id="phone"
                autoComplete="phone"
                value={fields.phone}
                onChange={handleChange}
                className={
                  inputCSS("phone") +
                  " [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                }
                onFocus={(e) => e.target.addEventListener("wheel", function(e) { e.preventDefault() }, { passive: false })}
              />
              <div className={errorCSS}>{errors.phone}</div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium"
            >
              Street address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                autoComplete="address"
                value={fields.streetAddress}
                onChange={handleChange}
                className={inputCSS("streetAddress")}
              />
              <div className={errorCSS}>{errors.streetAddress}</div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium">
              City
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="region"
                value={fields.city}
                onChange={handleChange}
                className={inputCSS("city")}
              />
              <div className={errorCSS}>{errors.city}</div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="state" className="block text-sm font-medium">
              State
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="state"
                id="state"
                autoComplete="region"
                value={fields.state}
                onChange={handleChange}
                className={inputCSS("state")}
              />
              <div className={errorCSS}>{errors.state}</div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postalCode" className="block text-sm font-medium">
              ZIP code
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="postalCode"
                id="postalCode"
                autoComplete="postal-code"
                value={fields.postalCode}
                onChange={handleChange}
                className={
                  inputCSS("postalCode") +
                  " [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                }
                onFocus={(e) => e.target.addEventListener("wheel", function(e) { e.preventDefault() }, { passive: false })}
              />
              <div className={errorCSS}>{errors.postalCode}</div>
            </div>
          </div>
        </div>
        <div className="flex float-right gap-x-5 mt-12 pb-6">
          <button
            type="reset"
            onClick={resetFields}
            className="text-white h-min my-auto font-bold hover:opacity-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            className="flex justify-center py-2 px-3 w-full bg-[#3498DB] hover:opacity-80 text-white font-semibold focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save Address
          </button>
        </div>
      </div>
    </form>
  );
};

const AddressModal = ({ open, setOpen, address }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      width: "80%",
      height: "80%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1a1a1a",
      color: "#CCCCCC",
    },
    overlay: {
      zIndex: 31,
    },
  };

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      ariaHideApp={false}
      style={customStyles}
    >
      <button onClick={() => setOpen(false)} className="text-3xl flex ml-auto">
        x
      </button>
      <AddressInput setOpen={setOpen} defaultFields={address} />
    </ReactModal>
  );
};

export default AddressModal;
