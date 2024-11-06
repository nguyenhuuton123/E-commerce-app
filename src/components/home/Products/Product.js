import React, {useEffect} from "react";
import {BsSuitHeartFill} from "react-icons/bs";
import {FaShoppingCart} from "react-icons/fa";
import {MdOutlineLabelImportant} from "react-icons/md";
import Image from "../../designLayouts/Image";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectSuccess} from "../../../features/product/cartSlice";
import {addToCart} from "../../../features/product/productReducerService";
import Swal from "sweetalert2";
import Alert from "@mui/material/Alert";


const Product = (product) => {
  const dispatch = useDispatch();
  const _id = product.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().replace(/\s+/g, '-');
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = product;
  const discounts = product.discounts || [];
  const { discountedPrice, discountAmount, discountType } = calculateDiscountedPrice(parseFloat(product.price), discounts);

  const handleProductDetails = () => {
    const productUrl = idString(product.productName);
    navigate(`/product/${productUrl}`, {
      state: {
        item: productItem,
      },
    });
  };
  const handleAddToCartClick = (productId) => {
    dispatch(addToCart(productId));
    Swal.fire({
      icon: "success",
      title: "Item Added to Cart",
      showConfirmButton: false,
      timer: 1500, // Set the duration for the alert
    });
  };

  return (
      <div className="w-full relative group">
        <div className="max-w-80 max-h-80 h-[300px] relative overflow-y-hidden ">
          <div>
            <Image className="w-full h-full" imgSrc={product.img} />
            {discounts.length > 0 && discountType === 'PERCENT' && (
                <div className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded">
                  {discountAmount}% OFF
                </div>
            )}

          </div>
          <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
            <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
              <li
                  onClick={() => handleAddToCartClick(product._id)}
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                Add to Cart
                <span>
                <FaShoppingCart />
              </span>
              </li>
              <li
                  onClick={handleProductDetails}
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                View Details
                <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
              </li>
              <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                Add to Wish List
                <span>
                <BsSuitHeartFill />
              </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="text-lg text-primeColor font-bold mb-0">
              {product.productName}
            </h2>
            <div className="flex flex-col items-end">

              {discounts.length > 0 && (
                  <p className="text-green-700 line-through">
                    ${product.price}
                  </p>
              )}

              <p className={`${discounts.length > 0 ? 'text-red-500' : 'text-green-700'} text-lg font-bold`}>
                ${discountedPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};
export const calculateDiscountedPrice = (originalPrice, discounts) => {
  if (discounts.length === 0) {
    return {
      discountedPrice: originalPrice.toFixed(2),
      discountAmount: 0,
      discountType: null,
    };
  }
  const discount = discounts[0];
  const discountType = discount.discountType;

  if (discountType === 'PERCENT') {
    const discountedAmount = (originalPrice * discount.discountAmount) / 100;
    const discountedPrice = originalPrice - discountedAmount;
    return {
      discountedPrice: discountedPrice.toFixed(2),
      discountAmount: discount.discountAmount,
      discountType: discountType,
    };
  } else   if(discountType === 'FIXED_AMOUNT') {

    const discountAmount = discount.discountAmount;
    const discountedPrice = originalPrice - discountAmount;
    const percentage = Math.round((discountAmount / originalPrice) * 100);

    return {
      discountedPrice: discountedPrice.toFixed(2),
      discountAmount: percentage,
      discountType: 'PERCENT'
    };
  }

};
export default Product;
