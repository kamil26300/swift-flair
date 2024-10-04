import ProductList from "../../common/ProductList";
import {
  fetchProductByQueryAsync,
  clearProductOnChange,
  selectProductLoading,
  selectFilterLoading,
  fetchAllFilterAsync,
  selectAllProducts,
  selectTotalItems,
  selectFilters,
} from "../../product/productSlice";

export default function UserProductList() {
  return (
    <ProductList
      fetchProductByQueryAsync={fetchProductByQueryAsync}
      selectProductLoading={selectProductLoading}
      clearProductOnChange={clearProductOnChange}
      selectFilterLoading={selectFilterLoading}
      fetchAllFilterAsync={fetchAllFilterAsync}
      selectAllProducts={selectAllProducts}
      selectTotalItems={selectTotalItems}
      selectFilters={selectFilters}
      admin={true}
    />
  );
}
