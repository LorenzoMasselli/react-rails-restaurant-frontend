// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './ImageSlider.css'
import FoodSticker from './food-sticker.svg';
import beachHouse1 from './sliderImages/beach-house-1.jpeg';
import beachHouse2 from './sliderImages/beach-house-2.jpeg';
import beachHouse3 from './sliderImages/beach-house-3.jpeg';
import beachHouse4 from './sliderImages/beach-house-4.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const ImageSlider = () => {
  const slides = [
    beachHouse1,
    beachHouse2,
    beachHouse3,
    beachHouse4,
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleLeftClick = () => {
    setActiveSlideIndex((prevActiveSlideIndex) => {
      if (prevActiveSlideIndex === 0) {
        return slides.length - 1;
      } else {
        return prevActiveSlideIndex - 1;
      }
    });
  };

  const handleRightClick = () => {
    setActiveSlideIndex((prevActiveSlideIndex) => {
      if (prevActiveSlideIndex === slides.length - 1) {
        return 0;
      } else {
        return prevActiveSlideIndex + 1;
      }
    });
  };

  const activeSlide = slides[activeSlideIndex];

  return (
    <div className='image-div'>
        <div className='left-right-click'>
            <FontAwesomeIcon icon={faArrowLeftLong} size='xl' onClick={handleLeftClick}/>
            <FontAwesomeIcon icon={faArrowRightLong} size='xl' onClick={handleRightClick}/>
        </div>
        <div style={{backgroundImage: `url(${activeSlide})`}} alt="Beach House Slider"  className='image-beach-house'>
          <img src={FoodSticker} alt="" className='about-sticker'/>
        </div>
    </div>
  );
};

export default ImageSlider;