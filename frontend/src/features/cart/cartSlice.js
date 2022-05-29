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

export const addInCart = createAsyncThunk(
  'cart/prodAdd',
  async (linkObj, thunkAPI) => {
    try {
      return await cartService.addProduct(linkObj);
    } catch (error) {
      const cartMessage =
        (error.response &&
          error.response.data &&
          error.response.data.cartMessage) ||
        error.cartMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(cartMessage);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/prodDelete',
  async (linkID, thunkAPI) => {
    try {
      return await cartService.removeProduct(linkID);
    } catch (error) {
      const cartMessage =
        (error.response &&
          error.response.data &&
          error.response.data.cartMessage) ||
        error.cartMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(cartMessage);
    }
  }
);

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
    validateCart: (state) => {
      state.productsInCart = [];
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
        state.cart = action.payload.cart;
        state.productsInCart = action.payload.products;
      })
      .addCase(getMyCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartSuccess = true;
        state.cartMessage = action.payload;
      })
      .addCase(addInCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(addInCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartSuccess = true;
        state.cartMessage = `You have succefully add "${action.payload.title}" to your cart`;
        state.productsInCart.push(action.payload.link);
      })
      .addCase(addInCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartSuccess = false;
        state.cartMessage = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartSuccess = true;
        state.cartMessage = `You have remove "${action.payload.title}" to your cart`;
        state.productsInCart = state.productsInCart.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartSuccess = false;
        state.cartMessage = action.payload;
      });
  },
});

export const { validateCart, resetCartState } = cartSlice.actions;

export default cartSlice.reducer;
