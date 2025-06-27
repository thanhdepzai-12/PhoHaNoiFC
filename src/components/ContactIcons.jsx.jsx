import React, { useState } from 'react';
import { FaFacebook, FaEnvelope, FaTiktok } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import '../pages/css/Contact.css';
import { usePlayers } from '../Context/useContext';

const ContactIcons = () => {


  const location = useLocation();
const {handleEmailClick, showEmail, setShowEmail} = usePlayers();
  const hiddenRoutes = ['/admin', '/login'];
  if (hiddenRoutes.includes(location.pathname)) return null;



  return (
    <div className="contact-icons-container">
      {/* Facebook Icon */}
      <a
        href="https://www.facebook.com/ngoc.minhh.3158"
        target="_blank"
        rel="noopener noreferrer"
        className="icon facebook"
        aria-label="Facebook"
      >
        <FaFacebook />
      </a>

      {/* Email Icon - Tối ưu đa nền tảng */}
      <button 
      style={{background:"red"}}
  className="icon email "
  onClick={handleEmailClick}
  aria-label="Email"
>
  <FaEnvelope />
  {showEmail && (
    <span className="email-tooltip">
      {navigator.userAgent.match(/iPhone|iPad|iPod|Android/i) 
        ? "Đang mở ứng dụng email..." 
        : "Đang mở Gmail..."
      }
    </span>
  )}
</button>

      {/* TikTok Icon */}
      <a
        href="https://www.tiktok.com/@fc.pho.ha.noi"
        target="_blank"
        rel="noopener noreferrer"
        className="icon tiktok"
        aria-label="TikTok"
      >
        <FaTiktok />
      </a>
    </div>
  );
};

export default ContactIcons;