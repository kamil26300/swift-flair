import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./../features/auth/authSlice";
import { clearCartOfUserAsync } from "../features/cart/cartSlice";
import { resetOrder } from "../features/order/orderSlice";
import { reduceString } from "../components/Functions";

const OrderSuccessPage = () => {
  const param = useParams();
  const dispath = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispath(clearCartOfUserAsync(user.id));
      dispath(resetOrder())
    }
  }, [dispath, user]);

  return (
    <>
      <MetaData title="Order Placed." />
      <div className="flex items-center flex-col">
        <p className="text-[#E74C3C] text-3xl">Order number #{reduceString(param.id, 4)}</p>
        {/* Change */}
        <h2 className="sm:text-2xl text-xl text-center">
          Successfully placed.
        </h2>
        <p className="mt-5 text-center">
          Check your{" "}
          <Link
            className="text-[#3498DB] hover:underline"
            to={"/orders"}
          >
            Orders here
          </Link>{" "}
          <span className=" whitespace-nowrap">
            or go to Account {">"} Orders
          </span>
        </p>
        <Link
          className="border mt-6 border-[#CCCCCC] p-3 hover:underline"
          to={"/"}
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default OrderSuccessPage;
