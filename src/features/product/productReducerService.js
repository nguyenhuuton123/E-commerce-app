import {
    createProduct,
    deleteProduct,
    findProduct,
    findProductByName,
    findProducts,
    findProductsByCategory,
    getBestSellerAPI,
    getNewArrivalAPI,
    searchProductsAPI,
    updateProduct,
} from "../../api/productAPI";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {addToCartAPI, getCartAPI, processOrderAPI, updateCartAPI} from "../../api/cartAPI";

export const getProducts = createAsyncThunk("product/list", async ({page, size}) => {
    const response = await findProducts(page, size);
    return response.data;
});

export const getProductByName = createAsyncThunk("product/detail", async (productName) => {
    const response = await findProductByName(productName);
    return response.data;
});

export const getProduct = createAsyncThunk("product/detail", async (productId) => {
    const response = await findProduct(productId);
    return response.data;
});

export const addProduct = createAsyncThunk("product/create", async (product) => {
    const response = await createProduct(product);
    return response.data;
});

export const editProduct = createAsyncThunk("product/edit", async (product) => {
    const response = await updateProduct(product);
    return response.data;
});

export const removeProduct = createAsyncThunk("product/remove", async (productId) => {
    const response = await deleteProduct(productId);
    return response.data;
});

export const getProductsByCategory = createAsyncThunk("category", async ({categoryName,page,size}) => {
    const response = await findProductsByCategory(categoryName,page, size);
    return response.data;
});
export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await searchProductsAPI(searchTerm);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getBestSellers = createAsyncThunk(
    'products/bestSeller',
    async () => {
        try {
            const response = await getBestSellerAPI();
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }
);
export const getNewArrivals = createAsyncThunk(
    'products/newArrivals',
    async () => {
        try {
            const response = await getNewArrivalAPI();
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }
);

export const addToCart = createAsyncThunk("carts/add", async (productId) => {
    const response = await addToCartAPI(productId);
    return response.data;
});
export const getCart = createAsyncThunk("carts", async () => {
    return await getCartAPI();
});

export const updateCart = createAsyncThunk("carts/update", async (cartDTO) => {
    return await updateCartAPI(cartDTO);
});
export const submitOrder = createAsyncThunk("order/submit", async (orderDTO) => {
    return await processOrderAPI(orderDTO);
});
