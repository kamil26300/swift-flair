import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCartAsync,
  selectCartItems,
  updateItemAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { discountedPrice, formatPriceInINR } from "../../components/Functions";
import NoData from "../../components/NoData";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

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

  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCartAsync(id));
  };

  const handleQuantityChange = (e, item) => {
    dispatch(updateItemAsync({ id: item.id, quantity: +e.target.value }));
  };

  return (
    <div>
      {totalItems > 0 ? (
        <>
          <h1>Cart</h1>
          <div className="block lg:grid gap-12 grid-cols-7">
            {/* Cart */}
            <div className="col-span-4 xl:col-span-5 pb-12">
              <ul>
                {cartItems.map((item) => {
                  return (
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
                          <div className="flex justify-between text-base font-medium">
                            <h5>
                              <h1 className="text-xl md:text-2xl">
                                {item.product.title}
                              </h1>
                            </h5>
                            <div className="flex flex-col gap-2">
                              <p className="whitespace-nowrap text-base font-bold line-through text-gray-400">
                                {formatPriceInINR(
                                  item.product.price * item.quantity
                                )}
                              </p>
                              <p className="whitespace-nowrap text-base font-bold text-gray-200">
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
                            Qty
                            <select
                              defaultValue={item.quantity}
                              className="bg-inherit"
                              onChange={(e) => handleQuantityChange(e, item)}
                            >
                              {Array.from(
                                { length: Math.min(5, item?.product?.stock) },
                                (_, i) => i + 1
                              ).map((quantity) => (
                                <option
                                  className="bg-black text-white"
                                  key={quantity}
                                  value={quantity}
                                >
                                  {quantity}
                                </option>
                              ))}
                            </select>
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={(e) => handleRemove(e, item.id)}
                              className="font-medium text-[#E74C3C] hover:opacity-80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {/* Subtotal */}
            <div className="flex col-span-3 xl:col-span-2 flex-col gap-6 bg-[#333333] p-6 h-min">
              <div className="flex gap-9 justify-between">
                <p className="min-w-[max-content]">
                  Subtotal ({totalItems} item
                  {totalItems > 1 ? "s" : ""}
                  ):{" "}
                </p>
                <p className="min-w-[max-content]">
                  {formatPriceInINR(totalCost)}
                </p>
              </div>
              <Link
                to="/checkout"
                className="flex justify-center border bg-[#3498DB] text-white py-3 font-bold hover:opacity-80"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      ) : (
        <NoData color={"white"}>Empty Cart</NoData>
      )}
    </div>
  );
}
