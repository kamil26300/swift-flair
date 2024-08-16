import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder, fetchAllOrders, updateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  totalOrders: 0,
  status: "idle",
  currentOrder: null
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (item) => {
    const response = await addOrder(item);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders
        state.totalOrders = action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload
      });
  },
});

export const { resetOrder } = orderSlice.actions

export const selectOrders = (state) => state.order.orders;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
