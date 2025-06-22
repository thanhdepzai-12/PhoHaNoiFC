import React from 'react'
import '../pages/css/Slider.css';
import logoH from '../assets/blackk.png';

import { Carousel } from 'antd';
import Headers from '../components/Headers';
// Assuming you have a CSS file for styling
const Slider = () => {
  return (
    <div className='slider-container'>

        <Carousel  autoplay>
            <div className='slider-item'>
               <img  src={logoH} alt="Đội hình Blue Thunder FC" />
            </div>
            <div className='slider-item'>
               <img src={logoH} alt="Đội hình Blue Thunder FC"  />
            </div>
      </Carousel>
       
        <Headers />
    </div>
  )
}

export default Slider