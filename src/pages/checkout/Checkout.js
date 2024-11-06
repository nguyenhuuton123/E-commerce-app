import React from "react";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import ItemCard from "../Cart/ItemCard";
import OrderItem from "./OrderItem";
import CheckoutForm from "./CheckoutForm";

const Checkout = ({cartData}) => {
    const location = useLocation();
    const { state } = location;
    if (!state || !state.cartItems) {
        return <div>No cart data available</div>;
    }

    return (
        <div>
            <div>
                <h2>Checkout Form</h2>
                <CheckoutForm cart={state} />
            </div>
        </div>
    );
};

export default Checkout;
