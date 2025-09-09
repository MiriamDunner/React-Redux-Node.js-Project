// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/user/userSlice';
// import productsReducer from '../features/products/productsSlice';
// import cartReducer from '../features/cart/cartSlice';
// import ordersReducer from '../features/orders/ordersSlice';
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     products: productsReducer,
//     cart: cartReducer,
//     orders: ordersReducer,
//   },
// });


// // קריאת נתונים מהשרת
// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const res = await fetch("http://localhost:4000/product");
//     const data = await res.json();
//     return data;
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default productsSlice.reducer;
// src/app/store.js



import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
