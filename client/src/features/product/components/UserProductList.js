import ProductList from "../../common/ProductList";
import {
  fetchProductByQueryAsync,
  selectProductLoading,
  clearProductOnChange,
  selectFilterLoading,
  fetchAllFilterAsync,
  selectAllProducts,
  selectTotalItems,
  selectFilters,
} from "../productSlice";

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
    />
  );
}
