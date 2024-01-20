import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ImageSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <StyledCarousel {...settings}>
      <Wrap>
        <img src="/images/slider-badging.jpg" alt="Slider 1" />
      </Wrap>
      <Wrap>
        <img src="/images/slider-badag.jpg" alt="Slider 2" />
      </Wrap>
      <Wrap>
        <img src="/images/slider-scale.jpg" alt="Slider 3" />
      </Wrap>
      <Wrap>
        <img src="/images/slider-scales.jpg" alt="Slider 4" />
      </Wrap>
    </StyledCarousel>
  );
}

const Wrap = styled.div`
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border: 4px solid transparent;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration: 300ms;
    object-fit: cover; /* Maintain aspect ratio without stretching */

    &:hover {
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }

  @media (max-width: 426px) {
    img {
      height: 200px; /* Adjust the height to your preference */
    }
  }
`;

const StyledCarousel = styled(Slider)`
  margin-top: 20px;

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
  }

  @media (max-width: 425px) {
    .slick-dots {
      display:none !important;
    }

    .slick-prev:before,
    .slick-next:before {
      font-size: 25px;
      color:#878787;
    }

    .slick-next{
      position:absolute;
      right:-6px;
    }
    .slick-prev{
      position:absolute;
      left:-10px;
    }

    
  }
`;

export default ImageSlider;
