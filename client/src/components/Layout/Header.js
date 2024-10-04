import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MdClose, MdMenu, MdNotifications } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsCart  } from "react-icons/bs";
import logo from "../images/logo.svg";
import { selectLoggedInUser, signOutUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectCartItems } from "../../features/cart/cartSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", to: "/", current: IsCurrentPath("/"), admin: false },
    {
      name: "Admin",
      to: "/admin",
      current: IsCurrentPath("/admin"),
      admin: true,
    },
    {
      name: "Orders",
      to: "/admin/orders",
      current: IsCurrentPath("/admin/orders"),
      admin: true,
    },
  ];

  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate("/login");
    toast.success("Sign Out successful!");
  };

  const profileOptions = [
    { name: "Your Profile", onClick: () => navigate("/profile") },
    { name: "Your Orders", onClick: () => navigate("/orders") },
    { name: "Sign Out", onClick: handleSignOut },
  ];

  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUser);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function IsCurrentPath(to) {
    const location = useLocation();
    return location.pathname === to;
  }

  return (
    <Disclosure as="nav" className="bg-[#333333] fixed w-full z-30">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <MdClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MdMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center">
                <div className="flex flex-shrink-0 items-center gap-1">
                  <Link to="/">
                    <img className="h-10 w-auto" src={logo} alt="Swift Flair" />
                  </Link>
                  <div className="sf hidden sm:flex text-white select-none gap-1 px-3 py-2 font-extrabold">
                    <div className="text-[#3498DB]">Swift</div>
                    <div className="text-[#E74C3C]">Flair</div>
                  </div>
                </div>
                <div className="my-auto hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item, id) => (
                      <div key={id} >
                        {((item.admin === true && user?.role === "admin") ||
                          item.admin === false) && (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current
                                ? "bg-[#1A1A1A] text-white"
                                : "text-gray-300 hover:bg-gray-600 hover:text-white",
                              "px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {user ? (
                <div className="sm:gap-2 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <MdNotifications className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="relative rounded-full p-1 text-gray-400 hover:text-white "
                    onClick={() => navigate("/cart")}
                  >
                    <div className="flex h-10 w-10">
                      <BsCart
                        className="h-full w-6 ml-2"
                        aria-hidden="true"
                      />
                      <span className="absolute bg-[#E74C3C] text-white text-sm top-1 right-1 rounded-full w-5 h-5">
                        {totalItems}
                      </span>
                    </div>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="relative flex rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <FaUser className="h-8 w-8 rounded-full" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-30 mt-2 w-40 origin-top-right bg-[#333333] shadow-2xl focus:outline-none">
                        <div className="py-1">
                          {profileOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <button
                                  onClick={() => option.onClick()}
                                  className={classNames(
                                    active
                                      ? "bg-white text-[#333333]"
                                      : "text-white",
                                    "block px-4 py-2 text-sm w-full"
                                  )}
                                >
                                  {option.name}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/login"
                    className="bg-transparent border border-white text-white hover:underline font-bold py-2 px-4 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#3498DB] hover:opacity-80 text-white font-bold py-2 px-4"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as="a"
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-[#1A1A1A] text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white",
                    "block px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
