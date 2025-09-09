

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     const res = await fetch('http://localhost:4000/product');
//     const data = await res.json();
//     return data;
//   }
// );

// export const addProduct = createAsyncThunk(
//   'products/addProduct',
//   async (productData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append('id', productData.id);
//       formData.append('name', productData.name);
//       formData.append('description', productData.description);
//       formData.append('price', productData.price);
//       formData.append('stock', productData.stock);
//       formData.append('category', productData.category);
//       if (productData.image) formData.append('image', productData.image);

//       const res = await fetch('http://localhost:4000/product', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || 'שגיאה בהוספת המוצר');
//       }

//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     items: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     deleteProduct: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addProduct.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addProduct.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items.push(action.payload);
//       })
//       .addCase(addProduct.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// //עדכון
// export const updateProduct = createAsyncThunk(
//   'products/updateProduct',
//   async (updatedProduct, { rejectWithValue }) => {
//     try {
//       const res = await fetch(`http://localhost:4000/product/${updatedProduct.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedProduct),
//       });

//       if (!res.ok) {
//         const error = await res.text();
//         throw new Error(error);
//       }

//       const data = await res.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



// export const { deleteProduct } = productsSlice.actions;
// export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// שליפת מוצרים
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:4000/product');
      if (!res.ok) throw new Error('שגיאה בשליפת מוצרים');
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// הוספת מוצר חדש
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in productData) {
        if (productData[key]) {
          formData.append(key, productData[key]);
        }
      }

      const res = await fetch('http://localhost:4000/product', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'שגיאה בהוספת המוצר');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// עדכון מוצר
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (updatedProduct, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:4000/product/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// מחיקת מוצר
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:4000/product/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('שגיאה במחיקת מוצר');

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // שליפה
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // הוספה
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // עדכון
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // מחיקה
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
