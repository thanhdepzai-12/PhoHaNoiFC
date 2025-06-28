import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logoFoot from '../assets/logofoot.png';
import { useNavigate, useLocation } from 'react-router-dom';
import '../pages/css/Header.css';
import { usePlayers } from '../Context/useContext';

const menuItems = [
  { link: "/", label: "Trang chủ" },
  { link: "/player", label: "Cầu thủ" },
  { link: "/contact", label: "Liên hệ" },
  { link: "/admin", label: "Quản Lý" },
];

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleEmailClick } = usePlayers();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleClick = (link, event) => {
    event.preventDefault();
    setIsMenuOpen(false);
    
    if (link === "/contact") {
      handleEmailClick();
    }
    navigate(link);
    setActive(link);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img src={logoFoot} alt="FC Pho Sai Gon Logo" />
        <div className="logo-text">
          <h1>PHO HA NOI FC</h1>
          <p>Mạnh mẽ - Đoàn kết - Chiến thắng</p>
        </div>
      </div>
      
      <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
        {isMenuOpen ? <FaTimes className="menu-icon" /> : <FaBars className="menu-icon" />}
      </button>
      
      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
      
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} style={{ display: isMenuOpen ? 'block' : 'none' }}>
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