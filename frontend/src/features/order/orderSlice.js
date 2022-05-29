import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
  orders: [],
  adresses: [],
  orderSuccess: false,
  orderError: false,
  orderLoading: false,
  orderMessage: '',
};

export const getIndexOrders = createAsyncThunk(
  'order/all',
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllorders();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewOrders = createAsyncThunk(
  'order/create',
  async (formDataOrder, thunkAPI) => {
    try {
      return await orderService.createOrder(formDataOrder);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orderSuccess = false;
      state.orderError = false;
      state.orderLoading = false;
      state.orderMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIndexOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getIndexOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = false;
        state.orderSuccess = true;
        state.orders = action.payload.orders;
        state.adresses = action.payload.adresses;
      })
      .addCase(getIndexOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderSuccess = true;
        state.orderMessage = action.payload;
      })
      .addCase(createNewOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(createNewOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = false;
        state.orderSuccess = true;
        state.orders.push(action.payload);
      })
      .addCase(createNewOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderSuccess = true;
        state.orderMessage = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;

export default orderSlice.reducer;
