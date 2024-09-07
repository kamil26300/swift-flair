import MetaData from "../../components/MetaData";
import AdminProductList from "../../features/admin/components/AdminProductList";

const AdminHomePage = () => {
  return (
    <>
      <MetaData title="Admin" />
      <AdminProductList />
    </>
  );
};

export default AdminHomePage;
