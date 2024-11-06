import {createSelector, createSlice} from '@reduxjs/toolkit';
import {addToCart, getCart, updateCart} from "./productReducerService";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        id: 0,
        items: [],
        item: null,
        loading: false,
        error: null,
        success: false,
        total: 0,
    },
    reducers: {
        increaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity--;
                if (item.quantity < 1) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
        },
        deleteItem: (state, action) => {
            const itemId = action.payload.id;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        resetCart(state) {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.items = action.payload.cartItems;
                state.total = action.payload.totalPrice;
                state.error = null;
                state.id = action.payload.id;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.item = action.payload;
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            })
            .addCase(updateCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.items = action.payload.cartItems;
                state.total = action.payload.totalPrice;
                state.error = null;
            })
            .addCase(updateCart.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
});

export const selectCartItems = state => state.cart.items;
export const selectSuccess = state => state.cart.success;
export const selectId = state => state.cart.id;
export const selectTotal = state => state.cart.total;
export const selectCartData = createSelector(
    [selectCartItems, selectId, selectTotal],
    (items, id, total) => ({
        id: id,
        cartItems: items,
        totalPrice: total,
    })
);

export const {increaseQuantity, decreaseQuantity, deleteItem, resetCart} = cartSlice.actions;

export default cartSlice.reducer;
