import React, {useEffect} from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import {useDispatch, useSelector} from "react-redux";
import {newArrivalSelector} from "../../../features/product/productSlice";
import {getNewArrivals} from "../../../features/product/productReducerService";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const products = useSelector(newArrivalSelector);
  useEffect(() => {
    dispatch(getNewArrivals());
  }, [dispatch]);

  if(!products) {
    return <p>Unable to fetch products</p>
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
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
      </Slider>
    </div>
  );
};

export default NewArrivals;
