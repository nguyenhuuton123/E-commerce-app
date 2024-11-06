import axios from "axios";
import {stringify} from "postcss";

const CART_MANAGEMENT_API = "http://localhost:8080/api/carts";

export const addToCartAPI = async (productId) => {
    const token = localStorage.getItem("accessToken");
    let response = null;
    try {
        response = await axios.post(
            `${CART_MANAGEMENT_API}/add/${productId}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
    return response.data;
}

export const getCartAPI = async () => {
    const token = localStorage.getItem("accessToken");
    let response = null;
    try {
        response = await axios.get(
            `${CART_MANAGEMENT_API}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
    return response.data;
}


export const updateCartAPI = async (cartDTO) => {
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.put(
            `${CART_MANAGEMENT_API}/update`,
            cartDTO,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("error:", error);
        throw error;
    }
};
export const processOrderAPI = async (orderDTO) => {
    console.log(orderDTO)
    const token = localStorage.getItem("accessToken");
    try {
        const response = await axios.post(
            `${CART_MANAGEMENT_API}/proceed`,
            orderDTO,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error:", error.message);
        if (error.response) {
            console.error("Server Response Data:", error.response.data);
            console.error("Server Response Status:", error.response.status);
            console.error("Server Response Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received from the server");
        } else {
            console.error("Request setup error:", error.message);
        }
        throw error;
    }
};
