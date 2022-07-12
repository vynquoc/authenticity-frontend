import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css" 
import "slick-carousel/slick/slick-theme.css"
import image1 from '../assets/images/carousel_1.jpg'
import image2 from '../assets/images/carousel_2.jpg'
import image3 from '../assets/images/carousel_3.jpg'

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
      }
    return (
        <div className="carousel">
            <Slider {...settings}>
                <div  className="carousel-image">
                    <img src={image1} alt="carousel" />
                </div>
                <div className="carousel-image">
                    <img src={image2} alt="carousel" />
                </div>
                <div className="carousel-image">
                    <img src={image3} alt="carousel" />
                </div>
            </Slider>
        </div>
    )
}

export default Carousel
