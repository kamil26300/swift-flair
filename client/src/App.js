import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { fetchItemByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { RegisterPage, LoginPage } from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import {
  OrdersTablePage,
  ProductFormPage,
  AdminHomePage,
} from "./pages/Admin";
import {
  ForgotPasswordPage,
  ProductDetailPage,
  OrderSuccessPage,
  PageNotFound,
  ProfilePage,
  OrderPage,
  CartPage,
  HomePage,
  Checkout,
  Contact,
  Policy,
  About,
} from "./pages";

const App = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <>
      <Toaster />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route
            path="/checkout"
            element={
              <Protected>
                <Checkout />
              </Protected>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminHomePage />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/product-form"
            element={
              <ProtectedAdmin>
                <ProductFormPage />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/product-form/edit/:id"
            element={
              <ProtectedAdmin>
                <ProductFormPage />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedAdmin>
                <OrdersTablePage />
              </ProtectedAdmin>
            }
          />

          <Route
            path="/cart"
            element={
              <Protected>
                <CartPage />
              </Protected>
            }
          />
          <Route
            path="/order-success/:id"
            element={
              <Protected>
                <OrderSuccessPage />
              </Protected>
            }
          />
          <Route
            path="/orders"
            element={
              <Protected>
                <OrderPage />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
