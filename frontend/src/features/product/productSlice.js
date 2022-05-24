import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
};

export const getIndexProducts = createAsyncThunk(
  'product/all',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.productSuccess = false;
      state.productError = false;
      state.productLoading = false;
      state.productMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIndexProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getIndexProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productError = false;
        state.productSuccess = true;
        state.products = action.payload;
      })
      .addCase(getIndexProducts.rejected, (state) => {
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = true;
        state.productMessage = "There is an error: can't load items";
      });
  },
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
