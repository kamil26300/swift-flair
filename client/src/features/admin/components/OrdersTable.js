import OrdersAccordion from "../../../components/OrdersAccordion";
import { ORDERS_PER_PAGE } from "./../../../components/constants";
import "react-accessible-accordion/dist/fancy-example.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllOrdersAsync,
  selectTotalOrders,
  selectOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../../components/Pagination";
import ReactModal from "react-modal";
import toast from "react-hot-toast";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(-1);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);

  const handleShow = (order) => {
    console.log("Handle Show" + order.id);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync(`_page=${page}&_limit=${ORDERS_PER_PAGE}`));
  }, [page, dispatch]);

  return (
    <div className="lg:w-5/6 w-full">
      <OrdersAccordion
        orders={orders}
        buttons={(order) => (
          <div className="flex sm:flex-col flex-row justify-around gap-4">
            <button
              onClick={(e) => handleShow(order)}
              className="text-[#E74C3C] w-full border border-[#E74C3C] py-2 px-4"
            >
              View
            </button>
            <button
              onClick={(e) => handleEdit(order)}
              className="text-[#3498DB] w-full border border-[#3498DB] py-2 px-4"
            >
              Edit
            </button>
          </div>
        )}
      />
      <Pagination
        totalItems={totalOrders}
        selectedPage={page}
        handlePage={setPage}
        ITEMS_PER_PAGE={ORDERS_PER_PAGE}
      />
      <EditModal open={open} setOpen={setOpen} order={selectedOrder} />
    </div>
  );
};

const EditModal = ({ open, setOpen, order }) => {
  const dispatch = useDispatch();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1a1a1a",
      color: "#CCCCCC",
    },
    overlay: {
      zIndex: 31,
    },
  };

  const statusArr = [
    "Pending",
    "Confirmed",
    "Dispatched",
    "Delivered",
    "Cancelled",
  ];
  
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (order) {
      setNewStatus(order.status);
    }
  }, [order]);

  const handleUpdate = (e) => {
    e.preventDefault()
    const updatedOrder = {...order, status: newStatus}
    try {
      dispatch(updateOrderAsync(updatedOrder))
      toast.success("Status changed!")
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error);
    }
    setOpen(false)
  }

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      ariaHideApp={false}
      style={customStyles}
    >
      <button
        onClick={() => setOpen(false)}
        className="text-3xl flex ml-auto mb-3"
      >
        x
      </button>
      <div className="flex flex-col gap-6">
        <select
          name="status"
          id="status"
          autoComplete="status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className={
            "w-full text-black text-sm py-2 px-3 border-2 border-gray-300 focus:outline-none focus:border-cyan-400"
          }
        >
          {statusArr.map((subItem) => (
            <option key={subItem} value={subItem}>
              {subItem}
            </option>
          ))}
        </select>
        <button onClick={handleUpdate} className="flex justify-center whitespace-nowrap py-2 px-3 w-min bg-[#3498DB] hover:opacity-80 text-white font-semibold focus:outline-none">
          Save details
        </button>
      </div>
    </ReactModal>
  );
};

export default OrdersTable;
