import OrdersAccordion from "../../../components/OrdersAccordion";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
  selectUserInfo,
  selectUserStatus,
} from "../userSlice";
import Skeleton from "../../../components/loading/Skeleton";

const UserOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserStatus);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  const handleReview = (order) => {
    console.log("Handle Review" + order.id);
  };

  const handleReturn = (order) => {
    console.log("Handle Return" + order.id);
  };

  return (
    <div className="lg:w-5/6 w-full">
      {status === "loading" ? (
        <Skeleton count={1} />
      ) : (
        <OrdersAccordion
          orders={orders}
          buttons={(order) => (
            <div className="flex sm:flex-col flex-row justify-around gap-4">
              <button
                onClick={(e) => handleReview(order)}
                className="text-[#E74C3C] w-full border border-[#E74C3C] py-2 px-4"
              >
                Review
              </button>
              <button
                onClick={(e) => handleReturn(order)}
                className="text-[#3498DB] w-full border border-[#3498DB] py-2 px-4"
              >
                Return
              </button>
            </div>
          )}
        />
      )}
      {/* <Pagination
        totalItems={totalOrders}
        selectedPage={page}
        handlePage={setPage}
        /> */}
    </div>
  );
};

export default UserOrder;
