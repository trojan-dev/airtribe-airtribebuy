import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateItemInCart(state, action) {
            const index = state.cartItems.findIndex(item => item.product.id === action.payload.product.id);
            if (index !== -1) {
                state.cartItems[index] = action.payload;
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { addItemToCart, updateItemInCart } = cartSlice.actions

export default cartSlice.reducer