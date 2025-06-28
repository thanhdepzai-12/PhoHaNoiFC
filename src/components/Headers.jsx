import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import logoFoot from '../assets/logofoot.png';
import { usePlayers } from '../Context/useContext';
import '../pages/css/Header.css';
import GoogleTranslate from '../Context/GoogleTranslate';

const menuItems = [
  { link: "/", label: "Trang chủ" },
  { link: "/player", label: "Cầu thủ" },
  { link: "/contact", label: "Liên hệ" }, // ✅ sửa lại từ /home
  { link: "/admin", label: "Quản Lý" },
];

const Headers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { handleEmailClick } = usePlayers();

  // Cập nhật trạng thái active menu khi route thay đổi
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Khóa scroll khi mở menu mobile
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleClick = (link, event) => {
    event.preventDefault();
    setIsMenuOpen(false);

    // Nếu là contact thì gọi hàm gửi email
    if (link === "/contact") {
      handleEmailClick?.(); // gọi an toàn nếu handleEmailClick có tồn tại
    }

    // Navigate sau cùng để không delay xử lý
    navigate(link);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="header-container">
      <GoogleTranslate />
      <div className="logo" onClick={()=> navigate('/')}>
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

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`} style={{ display: isMenuOpen ? 'block' : '' }}>
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
