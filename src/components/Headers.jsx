import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import hamburger and close icons
import logoFoot from '../assets/logofoot.png';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/css/Header.css';

const menuItems = [
  { link: "/", label: "Trang chủ" },
  { link: "/introduce", label: "Giới thiệu" },
  { link: "/player", label: "Cầu thủ" },
  { link: "/contact", label: "Liên hệ" },
  { link: "/admin", label: "Quản Lý" },
];

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleClick = (link, event) => {
    event.preventDefault();
    setActive(link);
    navigate(link);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header-container">
      <div className="logo ">
        <img src={logoFoot} alt="FC Pho Sai Gon Logo" />
        <div className="logo-text">
          <h1>PHO HA NOI FC</h1>
          <p>Mạnh mẽ - Đoàn kết - Chiến thắng</p>
        </div>
      </div>
      
      {/* Hamburger Icon using React Icons */}
      <div className="hamburger" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes className="menu-icon" />
        ) : (
          <FaBars className="menu-icon" />
        )}
      </div>
      
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className={active === item.link ? "active" : ""}
                onClick={(e) => handleClick(item.link, e)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Headers;