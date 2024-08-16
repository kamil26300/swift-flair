import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  clearCartOfUser,
  fetchItemByUserId,
  removeFromCart,
  updateItem,
} from "./cartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  "cart/fetchItemByUserId",
  async (userId) => {
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    const response = await removeFromCart(id);
    return response.data;
  }
);

export const clearCartOfUserAsync = createAsyncThunk(
  "cart/clearCartOfUser",
  async (userId) => {
    const response = await clearCartOfUser(userId);
    return response.status;
  }
);

export const updateItemAsync = createAsyncThunk(
  "cart/updateItem",
  async (update) => {
    const response = await updateItem(update);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cartItems.splice(index, 1);
      })
      .addCase(clearCartOfUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clearCartOfUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = [];
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cartItems[index] = action.payload;
      });
  },
});

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
