import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetail: {
      password: '',
    },
  },
  reducers: {
    setUserDetail: (state, action) => {
      const { password, ...otherUserDetails } = action.payload;
      state.userDetail = { ...otherUserDetails, password };
    },
  },
});


const initialState = {
  userInfo: [],
  products: [],
};

export const zgearSlice = createSlice({
  name: "zgear",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const { setUserDetail } = userSlice.actions;
export const selectUserDetail = (state) => state.user.userDetail;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
} = zgearSlice.actions;
export default userSlice.reducer;

