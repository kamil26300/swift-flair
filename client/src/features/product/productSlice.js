import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProduct,
  fetchProductByQuery,
  fetchProductById,
  fetchAllFilter,
  createNewProduct,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  totalItems: 0,
  loadingProduct: false,
  selectedProduct: null,
  loadingFilter: false,
  filters: [],
};

export const fetchAllProductAsync = createAsyncThunk(
  "product/fetchAllProduct",
  async () => {
    const response = await fetchAllProduct();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchProductByQueryAsync = createAsyncThunk(
  "product/fetchProductByQuery",
  async (query) => {
    const response = await fetchProductByQuery(query);
    return response.data;
  }
);
export const fetchAllFilterAsync = createAsyncThunk(
  "product/fetchAllFilter",
  async () => {
    const response = await fetchAllFilter();
    return response.data;
  }
);

export const createNewProductAsync = createAsyncThunk(
  "product/createNewProduct",
  async (product) => {
    const response = await createNewProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const clearProductOnChange = () => (dispatch) => {
  dispatch({ type: "product/clearProduct" });
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.products = action.payload;
      })
      .addCase(fetchAllFilterAsync.pending, (state) => {
        state.loadingFilter = true;
      })
      .addCase(fetchAllFilterAsync.fulfilled, (state, action) => {
        state.loadingFilter = false;
        state.filters = action.payload;
      })
      .addCase(fetchProductByQueryAsync.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(fetchProductByQueryAsync.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.selectedProduct = action.payload;
      })
      .addCase(createNewProductAsync.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(createNewProductAsync.fulfilled, (state, action) => {
        state.loadingProduct = false;
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.loadingProduct = true;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loadingProduct = false;
        const index = state.products.findIndex(product => product.id === action.payload.id)
        state.products[index] = action.payload
      });
  },
});

export const { clearProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectFilters = (state) => state.product.filters;
export const selectProductLoading = (state) => state.product.loadingProduct;
export const selectFilterLoading = (state) => state.product.loadingFilter;

export default productSlice.reducer;
