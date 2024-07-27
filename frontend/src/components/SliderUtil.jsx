import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderUtil.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({
  data,
  slidesToShow = 2,
  autoplay = false,
  autoplaySpeed = 3000,
}) => {
  const isSingleItem = data?.length === 1;

  const settings = {
    dots: true,
    infinite: !isSingleItem,
    speed: 500,
    slidesToShow: isSingleItem ? 1 : slidesToShow,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: autoplaySpeed,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: isSingleItem ? 1 : 3,
          slidesToScroll: 1,
          infinite: !isSingleItem,
          dots: true,
          autoplay: autoplay,
          autoplaySpeed: autoplaySpeed,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: isSingleItem ? 1 : 2,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: autoplay,
          autoplaySpeed: autoplaySpeed,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: autoplay,
          autoplaySpeed: autoplaySpeed,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {data?.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
};

export default SliderUtil;
