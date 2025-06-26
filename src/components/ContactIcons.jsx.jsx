import React, { useState } from 'react';
import { FaFacebook, FaPhone, FaTiktok } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import '../pages/css/Contact.css'; // Import CSS styles for icons

const ContactIcons = () => {
  const [showPhone, setShowPhone] = useState(false);
  const phoneNumber = '0987654321'; // Thay bằng số thật
  const location = useLocation();

  // Ẩn hiện icons trên một số route nhất định (tuỳ chọn)
  const hiddenRoutes = ['/admin', '/login'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const handlePhoneClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    isMobile 
      ? window.location.href = `tel:${phoneNumber}`
      : setShowPhone(!showPhone);
  };

  return (
    <div className="contact-icons-container">
      {/* Facebook Icon */}
      <a
        href="https://facebook.com/your-page"
        target="_blank"
        rel="noopener noreferrer"
        className="icon facebook"
        aria-label="Facebook"
      >
        <FaFacebook />
      </a>

      {/* Phone Icon */}
      <button 
        className="icon phone"
        onClick={handlePhoneClick}
        aria-label="Phone"
      >
        <FaPhone />
        {showPhone && <span className="phone-tooltip">{phoneNumber}</span>}
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