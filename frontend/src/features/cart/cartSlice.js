import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
  cart: null,
  productsInCart: [],
  cartError: false,
  cartSuccess: false,
  cartLoading: false,
  cartMessage: '',
};

export const getMyCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    const cartMessage =
      (error.response &&
        error.response.data &&
        error.response.data.cartMessage) ||
      error.cartMessage ||
      error.toString();
    return thunkAPI.rejectWithValue(cartMessage);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cartError = false;
      state.cartSuccess = false;
      state.cartLoading = false;
      state.cartMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(getMyCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartSuccess = true;
        state.cart = action.payload.card;
        state.productsInCart = action.payload.products;
      })
      .addCase(getMyCart.rejected, (state) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartSuccess = true;
        state.cartMessage = "There is an error: can't load cart";
      });
  },
});

export const { resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
