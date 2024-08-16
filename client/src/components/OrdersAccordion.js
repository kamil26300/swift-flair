import { discountedPrice, formatPriceInINR } from "./Functions";
import { Link } from "react-router-dom";
import NoData from "./NoData";
import {
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItem,
  Accordion,
} from "react-accessible-accordion";

const OrdersAccordion = ({ orders, buttons }) => {
  const statusColour = {
    Pending: "bg-yellow-200 text-yellow-500",
    Confirmed: "bg-blue-200 text-blue-500",
    Dispatched: "bg-purple-200 text-purple-500",
    Delivered: "bg-green-200 text-green-500",
    Cancelled: "bg-red-200 text-red-500",
  };

  return (
    <div className="flex flex-col my-6">
      <span className="text-3xl font-bold mb-3">Orders</span>
      {orders.length !== 0 ? (
        <Accordion allowZeroExpanded className="">
          {orders
            .slice(0)
            .reverse()
            .map((order) => {
              const address = order.selectedAddress;
              return (
                <AccordionItem>
                  <AccordionItemHeading className="flex bg-[#333333]">
                    <AccordionItemButton className="bg-transparent px-4 py-6 w-full flex gap-6">
                      <div className="w-full items-center justify-start flex text-base font-bold">
                        #{order.id}
                      </div>
                      <div className="w-full items-center justify-center hidden sm:flex">
                        {order.date}
                      </div>
                      <div className="w-full items-center justify-center flex">
                        <div
                          className={`px-3 py-1 ${statusColour[order.status]}`}
                        >
                          {order.status}
                        </div>
                      </div>
                      <div className="w-full items-center justify-end flex whitespace-nowrap">
                        {formatPriceInINR(order.totalCost)} ({order.totalItems})
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel className="px-3 py-4 border">
                    <div className="flex flex-col sm:flex-row justify-between gap-12">
                      <div className="flex justify-between flex-col gap-3">
                        {order.cartItems.map((item) => (
                          <div className="flex gap-2">
                            <img
                              className="h-12 w-12"
                              src={item.thumbnail}
                              alt="img"
                            />
                            <p>
                              <Link
                                className="hover:underline"
                                to={"/product-detail/" + item.productId}
                              >
                                <span className="sm:inline hidden">
                                  {item.title}
                                </span>
                                <span className="inline sm:hidden">
                                  {item.title.length > 13
                                    ? item.title.substring(0, 10) + "..."
                                    : item.title}
                                </span>
                              </Link>{" "}
                              -{" "}
                              {discountedPrice(
                                item.price,
                                item.discountPercentage
                              )}{" "}
                              ({item.quantity})
                            </p>
                          </div>
                        ))}
                        <span className="text-xl">
                          Paid via: {order.selectedPayment}
                        </span>
                        <span className="sm:hidden flex text-xl">
                          Ordered on: {order.date}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xl font-bold">Address: </span>
                        <div className="flex flex-col">
                          <span>
                            {address.fullName}{" "}
                            <span className="lg:inline sm:hidden inline">
                              ({address.email})
                            </span>
                            <span className="sm:inline hidden lg:hidden">
                              ({address.email.substring(0, 5) + "..."})
                            </span>
                          </span>

                          <span>{address.phone}</span>
                          <span>{address.streetAddress}</span>
                          <span>
                            {address.city}, {address.state} (
                            {address.postalCode})
                          </span>
                        </div>
                      </div>

                      {buttons(order)}
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
        </Accordion>
      ) : (
        <NoData>No Orders Found</NoData>
      )}
    </div>
  );
};

export default OrdersAccordion;
