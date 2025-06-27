import React from 'react'
import melte from '../assets/melte.png'
import lota from '../assets/lota.png'
import '../App.css'
const Sposor = () => {
  return (
    <div className='main-sposor display-flex flex-column justify-content-center align-items-center'>
<div className='d-flex justify-content-center align-items-center' >
      <span style={{color:"white", marginTop:"0.5rem" , fontWeight:"bold"}} >SPOSOR</span>
</div>

        <div className='container d-flex justify-content-center align-items-center'>
            <div className='sponsor-image d-flex justify-content-center align-items-center gap-3'>
              <img src={melte} alt='pho hnoi fc' />
              <img src={lota} alt='pho hnoi fc' />
            </div>
  
        </div>
    </div>
  )
}

export default Sposor