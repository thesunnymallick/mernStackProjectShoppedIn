import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider_0 from '../../assets/slider0.jpg'
import silder_1 from '../../assets/slider1.jpg'
import silder_2 from '../../assets/slider3.jpg'
import silder_3 from '../../assets/slider4.jpg'
import silder_4 from '../../assets/slider5.jpg'
import silder_5 from '../../assets/slider6.jpg'
function SliderItem() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <Slider {...settings} className="slider">
    <div>
     <img src={slider_0} alt="" />
    </div>
    <div>
    <img src={silder_5} alt="" />
    </div>
    <div>
    <img src={silder_4} alt="" />
    </div>
    <div>
    <img src={silder_3} alt="" />
    </div>
    <div>
    <img src={silder_2} alt="" />
    </div>
    <div>
    <img src={silder_1} alt="" />
    </div>
  </Slider>
  )
}

export default SliderItem