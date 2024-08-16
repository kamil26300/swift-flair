import ProductDetail from "./../features/product/components/ProductDetail";
import MetaData from "./../components/MetaData";
import { useState } from "react";

const ProductDetailPage = () => {
  const [title, setTitle] = useState("Error")

  return (
    <>
      <MetaData title={title || "Error"} />
      <ProductDetail setTitle={setTitle} />
    </>
  );
};

export default ProductDetailPage;
