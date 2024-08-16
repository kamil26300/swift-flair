import { discountedPrice, formatPriceInINR } from "../components/Functions";
import { selectCartItems } from "../features/cart/cartSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../components/AddressModal";
import { useNavigate } from "react-router-dom";
import MetaData from "../components/MetaData";
import { useEffect, useState } from "react";
import NoData from "../components/NoData";
import toast from "react-hot-toast";
import {
  selectCurrentOrder,
  addOrderAsync,
} from "../features/order/orderSlice";

const payments = [
  {
    id: "upi",
    label: "UPI",
  },
  {
    id: "card",
    label: "Credit/Debit Card",
  },
];

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [open, setOpen] = useState(false);

  const currentOrder = useSelector(selectCurrentOrder);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (sum, item) =>
      sum +
      Math.floor(
        item.product.price *
          (1 - item.product.discountPercentage / 100) *
          item.quantity
      ),
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleOrder = (e) => {
    e.preventDefault();
    var date = new Date(),
      formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    if (selectedAddress) {
      const order = {
        cartItems,
        totalCost,
        totalItems,
        userId: user.id,
        selectedPayment,
        selectedAddress,
        date: formattedDate,
        status: "Pending",
      };
      dispatch(addOrderAsync(order));
    } else {
      toast.error("Select an address first");
    }
  };

  useEffect(() => {
    if (currentOrder) {
      toast.success("Order placed successfully");
      navigate("/order-success/" + currentOrder.id);
    }
  }, [currentOrder, navigate]);

  useEffect(() => {
    if (totalItems <= 0) {
      toast.error("Empty Cart");
      navigate("/");
    }
  }, [totalItems, navigate]);

  return (
    <>
      <MetaData
        title={`Checkout - ${totalItems} item${totalItems > 1 ? "s" : ""}`}
      />
      <div className="block lg:grid gap-7 grid-cols-8 xl:grid-cols-10">
        <div className="flex flex-col gap-12 border-b border-white pb-12 col-span-4 xl:col-span-6">
          <AddressModal open={open} setOpen={setOpen} />
          {/* Addresses */}
          <div>
            <h2 className="text-lg font-semibold">Addresses</h2>
            {user.addresses.length > 0 ? (
              <>
                <p className="mt-1 mb-3 text-sm">
                  Choose from existing addresses.
                </p>
                <ul className="divide-y divide-white/50 border border-white/50 p-4">
                  {user.addresses.map((address) => (
                    <li key={address.addId} className="relative pt-3 mb-6">
                      <label
                        htmlFor={address.addId}
                        className="cursor-pointer flex justify-between"
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address}
                          onChange={() => setSelectedAddress(address)}
                          id={address.addId}
                          className="cursor-pointer absolute w-full h-full bg-transparent border-none rounded-none checked:text-white/10 checked:bg-none focus:ring-0 hover:bg-white/10"
                        />
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
                          <p className="font-bold">{address.phone}</p>
                          <p className="text-sm ml-auto">
                            <span className="sm:inline hidden">
                              {address.state}
                            </span>{" "}
                            ({address.postalCode})
                          </p>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NoData>No Addresses found !</NoData>
            )}
            <button
              onClick={() => setOpen(true)}
              className="ring-0 border border-white/50 mt-2 py-2 px-3 ml-auto flex hover:bg-white/10"
            >
              + Add Address
            </button>
          </div>

          {/* Payment */}
          <div>
            <fieldset>
              <legend className="text-lg font-semibold">
                Payment Methodods
              </legend>
              <p className="mt-1 mb-3 text-sm">Choose One</p>
              <div className="flex flex-col gap-6">
                {payments.map((method) => (
                  <div className="flex items-center gap-x-3">
                    <input
                      name="payment"
                      id={method.id}
                      value={method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      checked={selectedPayment === method.id}
                      type="radio"
                      className="hover:cursor-pointer checked:bg-none rounded-none h-4 w-4 checked:border-white text-[#3498DB] focus:ring-[#3498DB]"
                    />
                    <label
                      htmlFor={method.id}
                      className="hover:cursor-pointer block text-sm font-medium"
                    >
                      {method.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
        {/* Cart */}
        <div className="mt-12 lg:mt-0 col-span-4">
          <div className="sm:bg-[#333333] sm:p-6">
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.product.id}
                  className="border-b border-white/50 flex py-6"
                >
                  <div className="w-32">
                    <img
                      className="h-full w-full object-cover"
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />
                  </div>

                  <div className="ml-4 flex flex-col justify-between w-full gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 justify-between text-base font-medium">
                        <h5>
                          <h1 className="text-xl md:text-2xl">
                            {item.product.title}
                          </h1>
                        </h5>
                        <div className="flex flex-col gap-2">
                          <p className=" whitespace-nowrap text-base font-bold line-through text-gray-400">
                            {formatPriceInINR(
                              item.product.price * item.quantity
                            )}
                          </p>
                          <p className=" whitespace-nowrap text-base font-bold text-gray-200">
                            {discountedPrice(
                              item.product.price * item.quantity,
                              item.product.discountPercentage
                            )}
                          </p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm">{item.product.brand}</p>
                    </div>
                    <div className="flex items-end justify-between text-sm">
                      <p className="flex items-center gap-3">
                        <span>Qty</span>
                        <span>{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex gap-9 mt-5 justify-between">
              <p className="whitespace-nowrap">
                Subtotal ({totalItems} item
                {totalItems > 1 ? "s" : ""}
                ):{" "}
              </p>
              <p className="whitespace-nowrap">{formatPriceInINR(totalCost)}</p>
            </div>
            <button
              onClick={handleOrder}
              className="w-full flex justify-center mt-5 border bg-[#3498DB] text-white py-3 font-bold hover:opacity-80"
            >
              Pay and Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
