import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUserCircle } from "react-icons/fa";
import BASE_URL from "../../utils/config";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/review/top`);
        const result = await res.json();
        if (res.ok) {
          setReviews(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch top reviews:");
      }
    };
    fetchTopReviews();
  }, []);

  const fallbackData = [
    {
      name: "John Doe",
      description:
        "Our trip with Flyvaan Holidays was nothing short of amazing! The attention to detail, friendly guides, and unforgettable experiences made it truly special. Can't wait for the next adventure!",
    },
    {
      name: "Jane Smith",
      description:
        "Flyvaan Holidays exceeded my expectations. From landscapes to  encounters, every moment was a delight. The team's expertise and personalized service made the journey unforgettable.",
    },
    {
      name: "Chris Johnson",
      description:
        "I've traveled with agencies, but Flyvaan Holidays stands out. The seamless planning, knowledgeable, and unique destinations set them apart. An incredible way to explore the world!",
    },
  ];

  const displayData = reviews.length > 0 ? reviews : fallbackData;

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {displayData.map((data, index) => (
        <div className=" py-4 px-6" key={index}>
          <p>{data.reviewText || data.description}</p>
          <div className="flex items-center gap-4 mt-8">
            <div>
              <FaUserCircle className="text-[55px] text-gray-400" />
            </div>
            <div>
              <div>
                <h5 className="mb-0 mt-3">{data.username || data.name}</h5>
                <p className="text-GrayColor">Customer</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
