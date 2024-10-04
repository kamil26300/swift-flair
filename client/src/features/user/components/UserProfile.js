import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter } from "../../../components/Functions";
import { FaEdit, FaUser } from "react-icons/fa";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { MdDeleteForever } from "react-icons/md";
import NoData from "../../../components/NoData";
import { useState } from "react";
import AddressModal from "../../../components/AddressModal";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(id - 1, 1);
    setCurrentAddress(null);
    dispatch(updateUserAsync(newUser));
  };

  const handleEdit = (addId) => {
    setCurrentAddress(
      user.addresses.find((address) => address.addId === addId)
    );
    setOpen(true);
  };

  const handleAdd = () => {
    setCurrentAddress(null);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 min-w-[70%]">
      <AddressModal open={open} setOpen={setOpen} address={currentAddress} />
      <div className="text-5xl">Your Profile</div>
      <div className="bg-[#333333] p-6 flex md:flex-row flex-col gap-8 items-center md:items-start">
        <div className="relative ring-2 ring-inset ring-white h-min w-min group">
          <div className="absolute w-full h-full hidden group-hover:flex justify-center items-center backdrop-blur-[2px]">
            <button className=" flex p-1 ring-1 ring-[#3498DB] bg-[#333333] h-min">
              <FaEdit className="text-[#3498DB] mt-1" />
              Edit
            </button>
          </div>
          <FaUser className="h-28 md:h-56 w-28 md:w-56 rounded-full bg-gray-100 p-1 text-[#1a1a1a] m-2" />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-4 justify-center md:justify-start">
            <div className="flex flex-col text-sm sm:text-xl text-right font-semibold whitespace-nowrap">
              <span>Name : </span>
              <span>Email ID : </span>
              <span>Role : </span>
            </div>
            <div className="flex flex-col text-sm sm:text-xl whitespace-nowrap">
              <span>{capitalizeFirstLetter(user.name)}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
            </div>
          </div>
          {/* Addresses */}
          <div className="flex flex-col gap-2">
            <div className="text-xl">Addresses: </div>
            {user.addresses.length > 0 ? (
              <>
                <ul className="divide-y divide-white/50 border border-white/50 p-4">
                  {user.addresses.map((address) => (
                    <li
                      key={address.addId}
                      className="relative pt-3 mb-6 group"
                    >
                      <label
                        htmlFor={address.addId}
                        className="flex justify-between"
                      >
                        <div className="flex flex-col justify-between p-2">
                          <p className="font-bold">{address.fullName}</p>
                          <p className="hidden sm:inline text-sm">
                            {address.streetAddress}
                          </p>
                          <p className="sm:hidden inline text-sm">
                            {address.streetAddress.length > 10
                              ? address.streetAddress.substring(0, 10) + "..."
                              : address.streetAddress}
                          </p>
                          <p className="hidden sm:inline text-sm">
                            {address.email}
                          </p>
                          <p className="sm:hidden inline text-sm">
                            {address.email.length > 11
                              ? address.email.substring(0, 5) +
                                "..." +
                                address.email.substring(
                                  address.email.length - 3,
                                  address.email.length
                                )
                              : address.email}
                          </p>
                        </div>
                        <div className="flex flex-col justify-between p-2">
                          <p className="font-bold w-min">{address.phone}</p>
                          <p className="text-sm ml-auto">
                            <span className="sm:inline hidden">
                              {address.state}
                            </span>{" "}
                            ({address.postalCode})
                          </p>
                        </div>
                      </label>
                      <div className="absolute right-0 top-3 group-hover:flex hidden h-full w-full justify-center items-center backdrop-blur-[2px]">
                        <div className="flex gap-5">
                          <button
                            onClick={() => handleEdit(address.addId)}
                            className="flex p-1 ring-1 ring-[#3498DB] bg-[#333333] h-min gap-1"
                          >
                            <FaEdit className="text-[#3498DB] mt-1" />
                            Edit
                          </button>
                          <button
                            onClick={handleRemove}
                            className="p-1 ring-1 ring-[#E74C3C] bg-[#333333] flex h-min gap-1"
                          >
                            <MdDeleteForever className="text-[#E74C3C] mt-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NoData>No Addresses found !</NoData>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="ring-0 border border-white/50 py-2 px-3 ml-auto flex hover:bg-white/10"
          >
            + Add Address
          </button>
        </div>
      </div>
    </div>
  );
}
