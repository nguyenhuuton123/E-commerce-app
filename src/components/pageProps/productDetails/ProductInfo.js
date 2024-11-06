import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../../../features/product/productReducerService";
import {FaRegStar, FaStar} from "react-icons/fa";
import {calculateDiscountedPrice} from "../../home/Products/Product";
import Swal from "sweetalert2";

const ProductInfo = ({productInfo}) => {
    const dispatch = useDispatch();
    const discounts = productInfo.discounts || [];
    const {
        discountedPrice,
        discountAmount,
        discountType
    } = calculateDiscountedPrice(parseFloat(productInfo.price), discounts);
    const renderSpecifications = () => {
        if (productInfo && productInfo.specifications) {
            if (typeof productInfo.specifications === "string") {
                const specsArray = productInfo.specifications.split(", ");
                return specsArray.map((spec, index) => (
                    <li key={index} className="text-base text-gray-600">
                        {spec}
                    </li>
                ));
            } else if (Array.isArray(productInfo.specifications)) {
                return productInfo.specifications.map((spec, index) => (
                    <li key={index} className="text-base text-gray-600">
                        {spec.specKey}: {spec.specValue}
                    </li>
                ));
            }
            return <li>No specifications available.</li>;
        }
    };

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        if (rating === 0 && comment.trim() === '') {
            return;
        }

        setRating(0);
        setComment('');
    };
    const handleAddToCartClick = (productId) => {
        dispatch(addToCart(productId));
        Swal.fire({
            icon: "success",
            title: "Item Added to Cart",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
            <div className="product-price">
                {discounts.length > 0 && (
                    <p className="text-xl font-semibold line-through ">
                        ${productInfo.price}
                    </p>
                )}
                {discounts.length > 0 && discountType === 'PERCENT' && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded">
                        {discountAmount}% OFF
                    </div>
                )}

                <p className={`${discounts.length > 0 ? 'text-xl  font-semi-bold text-red-500' : 'text-green-700'} text-lg font-bold`}>
                    ${discountedPrice}
                </p>


            </div>
            <p className="text-base text-gray-600">{productInfo.description}</p>
            <p className="text-sm">Be the first to leave a review.</p>
            <button
                onClick={() => handleAddToCartClick(productInfo.id)}
                className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
            >
                Add to Cart
            </button>
            <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:
            {productInfo.categoryName}
        </span>
            </p>
            <div>
                <p className="font-medium text-lg">Specs:</p>
                <ul className="list-disc list-inside">{renderSpecifications()}</ul>
            </div>
            <div className="w-100 mx-auto mt-8 p-8 bg-white shadow-md rounded">
                <h2 className="text-xl font-semibold mb-4">Product Rating and Comment</h2>
                <div className="flex items-center mb-4">
                    <label className="mr-4">Rating:</label>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            className={`p-2 rounded-full`}
                            onClick={() => handleRatingChange(value)}
                        >
                            {value <= rating ? <FaStar/> : <FaRegStar/>}
                        </button>
                    ))}
                </div>
                <div className="mb-4">
                    <label>Comment:</label>
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </div>
                <button
                    className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
