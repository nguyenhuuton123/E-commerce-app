import React, {useEffect} from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  spfOne,
  spfTwo,
  spfThree,
  spfFour,
} from "../../../assets/images/index";
import {useDispatch, useSelector} from "react-redux";
import {bestSellerSelector} from "../../../features/product/productSlice";
import {getBestSellers} from "../../../features/product/productReducerService";

const SpecialOffers = () => {
  const dispatch = useDispatch();
  const products = useSelector(bestSellerSelector);
  useEffect(() => {
    dispatch(getBestSellers());
  }, [dispatch]);

  if(!products) {
    return <p>Unable to fetch products</p>
  }

  return (
      <div className="w-full pb-20">
        <Heading heading="Special Offers" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.content.map((item) => (
              <div key={item.id} className="w-full ">
                <Product
                    _id={item.id}
                    img={item.imageUrls.length > 0 ? item.imageUrls[0] : 'default-image.jpg'}
                    productName={item.productName}
                    price={item.price}
                    discounts={item.discounts}
                />
              </div>
          ))}
        </div>
      </div>
  );
};

export default SpecialOffers;
